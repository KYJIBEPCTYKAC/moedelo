(function (window, undefined) {
    $(".userbutton").button();

    var dialog, form,
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        name = $("#name"),
        email = $("#email"),
        salary = $("#salary"),
        allFields = $([]).add(name).add(email).add(salary),
        tips = $(".validateTips"),
        userList, curItem, curEl, edtObj, notClearFlags;
    
    function onError(xhr, msg, status) {
        curItem = undefined;
        curEl = undefined;
        edtObj = undefined;

        showMessage(msg, true);
    }

    function loadList() {
        execQuery(urlGetList, { usersID: 0 }, loadListComplete, onError);
    }


    function loadListComplete(data) {
        userList = data;
        $(".trow").remove();

        for (var i = 0, item; i < userList.length, item = userList[i]; i++) {
            appendRow(item, i)
        }

    }

    function updateTips(t) {
        tips.text(t).addClass("ui-state-highlight");
        setTimeout(function () {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }

    function checkLength(o, n, min, max) {
        if (o.val().length > max || o.val().length < min) {
            o.addClass("ui-state-error");
            updateTips("Длина поля должна быть между " +
              min + " и " + max + ".");
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp(o, regexp, n) {
        if (!(regexp.test(o.val()))) {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }
    }



    function editRow(evt) {
        if (curEl)
            return;
        curEl = $(evt.currentTarget).parent();
        curItem = curEl.attr("itemindex");
        var tmpObj = userList[curItem];
        name.val(tmpObj.cName);
        email.val(tmpObj.cEmail);
        salary.val(tmpObj.ySalary);
        dialog.dialog("open");
    }

    function deleteRow(evt) {
        if (curEl)
            return;

        $("#dialog-confirm").dialog({
            resizable: false,
            height: 220,
            width: 400,
            modal: true,
            buttons: {
                "Удалить": function () {
                    curEl = $(evt.currentTarget).parent().parent();
                    curItem = curEl.attr("itemindex");
                    execQuery(urlDeleteItem, { usersID: userList[curItem].usersID }, onDeleteComplete, onError);
                    $(this).dialog("close");

                },
                "Отмена": function () {
                    curItem = undefined;
                    curEl = undefined;
                    edtObj = undefined;

                    $(this).dialog("close");
                }
            }
        });

    }

    function onDeleteComplete(data) {
        if (data.error) {
            showMessage(data.msg, true);
            curItem = undefined;
            curEl = undefined;
            return;
        }
        userList.splice(curItem, 1);
        curEl.remove();
        for (var i = curItem; i < userList.length; i++) {
            userList[i].rowEl.attr("itemindex", i);
        }
        curItem = undefined;
        curEl = undefined;

    }

    function appendRow(pObj, pIndex) {
        $("#users tbody").append('<tr class="trow newrow" itemindex="' + pIndex + '">' +
          '<td cellname="name" class="ecell">' + pObj.cName + "</td>" +
          '<td cellname="email" class="ecell">' + pObj.cEmail + "</td>" +
          '<td cellname="salary" class="ecell">' + pObj.ySalary + "</td>" +
          '<td><button class="userbutton deletebutton newbutton">Удалить</button>' +
        "</tr>");
        pObj.rowEl = $(".newrow").removeClass("newrow");
        pObj.rowEl.children(".ecell").on("click", editRow);

        $(".newbutton").button({ icons: { primary: "ui-icon-closethick" } }).on("click", deleteRow).removeClass("newbutton");
    }

    function updateRow(pObj) {
        pObj.rowEl.children('[cellname="name"]').text(pObj.cName);
        pObj.rowEl.children('[cellname="email"]').text(pObj.cEmail);
        pObj.rowEl.children('[cellname="salary"]').text(pObj.ySalary);
    }

    function saveUser() {
        var valid = true;
        allFields.removeClass("ui-state-error");

        valid = valid && checkLength(name, "username", 3, 80);
        valid = valid && checkLength(email, "email", 6, 100);
        valid = valid && checkLength(salary, "salary", 5, 16);

        valid = valid && checkRegexp(name, /[а-я_\s]+$/i, "Имя может содержать только русские буквы и пробелы!");
        valid = valid && checkRegexp(email, emailRegex, "Проверьте корректность e-mail. Пример: sovsem@emaila.net");
        valid = valid && checkRegexp(salary, /^([0-9])+$/, "В поле «зарплата» могут быть только цифры!");

        if (!valid)
            return;
        edtObj = {
            cName: name.val(),
            cEmail: email.val(),
            ySalary: salary.val()
        };

        if (curItem == undefined) {
            edtObj.usersID = -1;
        }
        else {
            edtObj.usersID = userList[curItem].usersID;
        }
        execQuery(urlUpdateOrInsertItem, edtObj, onUpdateOrInsertComplete, onError);

        dialog.dialog("close");
        return valid;
    }

    function onUpdateOrInsertComplete(data) {
        if (data.error) {
            showMessage(data.msg, true);
            curItem = undefined;
            curEl = undefined;
            return;
        }
        if (curItem == undefined) {
            edtObj.usersID = data.usersID;
            userList.push(edtObj);
            appendRow(edtObj, userList.length - 1);
        }
        else {
            userList[curItem].cName = edtObj.cName;
            userList[curItem].cEmail = edtObj.cEmail;
            userList[curItem].ySalary = edtObj.ySalary;
            updateRow(userList[curItem]);
        }
        curItem = undefined;
        curEl = undefined;
        edtObj = undefined;
    }

    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 350,
        resizable: false,
        width: 600,
        modal: true,
        buttons: {
            "Сохранить": function () {
                notClearFlags = true;
                saveUser();
            },
            "Отмена": function () {
                dialog.dialog("close");
            }
        },
        close: function () {
            if (!notClearFlags) {
                curItem = undefined;
                curEl = undefined;
            }
            notClearFlags = false;
            form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });


    form = dialog.find("form").on("submit", function (event) {
        event.preventDefault();
        saveUser();
    });

    $("#create-user").button().on("click", function () {
        if (curEl)
            return;
        curEl = undefined;
        curItem = undefined;
        dialog.dialog("open");
    });

    $("#refresh-user").button().on("click", function () {
        if (curEl)
            return;
        loadList();
    });

    loadList();
})(window);
