(function (window, undefined) {
    $(".userbutton").button();

    var dialog, form, selectedRow,
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        name = $("#name"),
        email = $("#email"),
        salary = $("#salary"),
        allFields = $([]).add(name).add(email).add(salary),
        tips = $(".validateTips"),
        userList = [
            {
                name: "Грачёв Сергей Владимирович",
                email: "m@mail.ru",
                salary: 300000,
                ID: 1
            },
            {
                name: "Оносов Олег Олегович",
                email: "t@mail.ru",
                salary: 200000,
                ID: 2
            },
            {
                name: "Тында Васисуалий Виссарионович",
                email: "s@mail.ru",
                salary: 100000,
                ID: 3
            },

];

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

        function loadListComplete(data) {
            $(".trow").remove();

            for (var i = 0, item; i < userList.length, item = userList[i]; i++) {
                appendRow(item.name, item.email, item.salary, i)
            }
            $(".ecell").on("click", editRow);

        }

        function editRow(evt) {
            selectedRow = $(evt.currentTarget).parent().attr("itemindex");
            var tmpObj = userList[selectedRow];
            name.val(tmpObj.name);
            email.val(tmpObj.email);
            salary.val(tmpObj.salary);
            dialog.dialog("open");
        }

        function deleteRow(evt) {
            $("#dialog-confirm").dialog({
                resizable: false,
                height: 220,
                width: 400,
                modal: true,
                buttons: {
                    "Удалить": function () {
                        var tmp = $(evt.currentTarget).parent().parent().attr("itemindex");
                        userList.splice(tmp, 1)
                        loadListComplete();
                        $(this).dialog("close");
                    },
                    "Отмена": function () {
                        $(this).dialog("close");
                    }
                }
            });

        }

        function appendRow(pName, pEmail, pSalary, pIndex) {
            $("#users tbody").append('<tr class="trow" itemindex="'+pIndex+'">' +
              '<td cellname="name" class="ecell">' + pName + "</td>" +
              '<td cellname="email" class="ecell">' + pEmail + "</td>" +
              '<td cellname="salary" class="ecell">' + pSalary + "</td>" +
              '<td><button class="userbutton deletebutton newbutton">' + msgDelete + '</button>' +
            "</tr>");
            $(".newbutton").button({ icons: { primary: "ui-icon-closethick" } }).on("click", deleteRow).removeClass("newbutton");
        }
        function saveUser() {
            var valid = true;
            allFields.removeClass("ui-state-error");

            valid = valid && checkLength(name, "username", 3, 80);
            valid = valid && checkLength(email, "email", 6, 80);
            valid = valid && checkLength(salary, "salary", 5, 16);

            valid = valid && checkRegexp(name, /[а-я_\s]+$/i, "Имя может содержать только русские буквы и пробелы!");
            valid = valid && checkRegexp(email, emailRegex, "Проверьте корректность e-mail. Пример: sovsem@emaila.net");
            valid = valid && checkRegexp(salary, /^([0-9])+$/, "В поле «зарплата» могут быть только цифры!");

            if (!valid)
                return;
            if (selectedRow == undefined) {
                var tmpObj = {
                    name: name.val(),
                    email: email.val(),
                    salary: salary.val(),
                    ID: userList.length + 1
                };
                userList.push(tmpObj);
            }
            else {
                var tmpObj = userList[selectedRow];
                tmpObj.name = name.val();
                tmpObj.email = email.val();
                tmpObj.salary = salary.val();


            }
            loadListComplete();
            dialog.dialog("close");
            return valid;
        }

        dialog = $("#dialog-form").dialog({
            autoOpen: false,
            height: 350,
            resizable: false,
            width: 600,
            modal: true,
            buttons: {
                "Сохранить": saveUser,
                "Отмена": function () {
                    dialog.dialog("close");
                }
            },
            close: function () {
                form[0].reset();
                allFields.removeClass("ui-state-error");
            }
        });
        
 
        form = dialog.find("form").on("submit", function (event) {
            event.preventDefault();
            saveUser();
        });

        $("#create-user").button().on("click", function () {
            selectedRow = undefined;
            dialog.dialog("open");
        });

        $("#refresh-user").button().on("click", function () {
            loadListComplete();
        });
        //salary.spinner({ max: 1000000000, min: 10000 });
        loadListComplete();
})(window);
