const express = require('express')
const req = require('request')
const path = require('path')
const app = express()
const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}
let teamArr = []

app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'dist')))

app.get(`/teams/:teamName`, function (request, response) {
    teamArr = []
    let team = request.params.teamName
    let teamID = teamToIDs[team]
    if (teamID != undefined) {
        req('http://data.nba.net/10s/prod/v1/2018/players.json', function (err, result) {
            console.log(team, teamID)
            let body = JSON.parse(result.body)
            createTeam(body.league.standard, teamID)
            console.log(teamArr)
            response.send(teamArr)
        })
    }
})
const createTeam = function(players, teamID){
    for (let player of players) {
        if (player.teamId == teamID && player.isActive == true) {
            let p1 = {
                fName: player.firstName,
                lName: player.lastName,
                jersey: player.jersey,
                pos: player.pos
            }
            teamArr.push(p1)
        }
    }
}



const port = 3000
app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})