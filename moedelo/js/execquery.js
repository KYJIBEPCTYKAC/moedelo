function execQuery(url, params, success_func, error_func) {
    function stopLoader() {
        $("#msgWindow").addClass("hide_win");
    }

    showMessage("Пожалуйста, подождите...");

    $.ajax({
        url: url,
        type: 'GET',
        timeout: 60000,
        data: params,
        dataType: 'json',
        success: success_func,
        error: error_func,
        complete: stopLoader
    });
}
function showMessage(msg, autohide) {

    $("#msgWindow").removeClass("hide_win").html(msg);

    if (autohide)
    {
        setTimeout(function () {
            $("#msgWindow").addClass("hide_win");
        }, 2500);
    }
}