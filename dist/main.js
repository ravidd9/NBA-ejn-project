
const render = function(teamArr){
    $('.player-container').text("")
    let source = $('#player-template').html();
    let template = Handlebars.compile(source);
    let newHTML = template({teamArr});
    $('.player-container').append(newHTML);
}


$("button").on("click", function () {
    let teamName = $("input").val()
    $.get(`/teams/${teamName}`, function (teamArr) {
        console.log(teamArr)
        render(teamArr)
    })
})
