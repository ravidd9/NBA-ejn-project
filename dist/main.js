
const render = function(teamArr){
    $('.player-container').text("")
    let source = $('#player-template').html();
    let template = Handlebars.compile(source);
    let newHTML = template({teamArr});
    $('.player-container').append(newHTML);
}


$("#roster").on("click", function () {
    let teamName = $("input").val()
    $.get(`/teams/${teamName}`, function (teamArr) {
        console.log(teamArr)
        render(teamArr)
    })
})

$("#dreamTeam").on("click", function () {
    $.get(`/dreamTeam/`, function(dreamTeam){
        console.log(dreamTeam)
        render(dreamTeam)
    })
})

$("#container").on("click", ".playerCard", function () {
    let fullName = $(this).find(".fullName").text()
    let player = {
        fName: fullName.split(" ")[0],
        lName: fullName.split(" ")[1],
        jersey: $(this).find(".jersey").text(),
        pos: $(this).find(".position").text()
    }
    console.log(player)
    $.post(`/roster/`, player, function(response){
        console.log("added player to dreamTeam")
    })
})