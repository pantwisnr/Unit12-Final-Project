

class Team {
    constructor(name, color){
        this.name = name;
        this.color = color;
        this.players = [];
    }

    addPlayer(playerName, playerPostion){
        this.players.push(new Player(playerName, playerPostion)); 
        
        // const newPlayer = new Player(playerName, playerPostion);

        // this.players.length < 5 ?  newPlayer instanceof Player ? this.players.push(newPlayer) : console.log("Enter Player name and position") : console.log("team is full");
        
    }
}


class Player {
    constructor(playerName, playerPostion){
        this.playerName = playerName;
        this.playerPostion = playerPostion;
    }
}


class TeamAdmin {
    static url = "https://6458916f4eb3f674df77425b.mockapi.io/TeamsInfo";


    static getAllTeams(){
        // use the ajax get method to get all posts from API
        
        
        // let myResponse = new XMLHttpRequest();
        // myResponse.open('GET', this.url, true);
        // myResponse.addEventListener('load', ()=>{
        //     if(myResponse.status === 200 && myResponse.readyState === 4){
        //         console.log(myResponse.responseText)
        //     } else{
        //         throw new Error("Bad Request");
        //     }
        // }) 
        
        // myResponse.send();
        // console.log(myResponse)
        

        return $.get(this.url);
    }


    static getUniqueTeam(teamID){
        // use the ajax get method to get particular team from API using team ID or name
        return $.get(this.url + `/${teamID}`);

    }


    static createTeam(team){
        // use the ajax post method to post newly created team to API
        return $.post(this.url, team);
    }


    static updateTeam(team){
        // use the ajax put method to update info about a unique team in API
        return $.ajax({
                    url: this.url + `/${team.id}`,
                    data: JSON.stringify(team),
                    contentType: 'application/json',
                    type: 'PUT',
                });
    }
    
    static deleteTeam(teamID){
        // use the ajax delete method to delete team info from API
        return $.ajax({
                    url: this.url + `/${teamID}`,	
                    type: 'DELETE',
                });
    }

}

//  in the teamAdmin class, we create the ajax methods 'but in the TeamDommanger class, we call these methods which returns a promise therefore we handle the resolve and rejected values from the promise.

// also, after every promise in the TeamDommaager class, we have to get the reutrn promise of getAllteams and then use the info as expected


class TeamDOMManager {
    // class for re-rendering the DOM each time a new instance of class is created, deleted or updated. The methods in this class call the methods in the TeamAdmin class which will return a promise and then we deal with the return value. 
    static teams;


    static getAllTeams(){
        // use the ajax get method to get all posts from API
        TeamAdmin.getAllTeams().then(teams => this.show(teams));
    }

    
    static createTeam(teamName, teamColor){
        // use the ajax post method to post newly created team to API
        
        TeamAdmin.createTeam(new Team(teamName, teamColor))
            .then(() => {
                    return TeamAdmin.getAllTeams();
                })
                .then(teams => this.show(teams));
            
            // .then(teams => console.log(teams));
    }

    
    static deleteTeam(id){
        // use the ajax delete method to delete team info from API
        TeamAdmin.deleteTeam(id)
            .then(() => {
                return TeamAdmin.getAllTeams();
            })
            .then(teams => this.show(teams));
    }
    

    static createPlayer(id){
        // use the ajax get method to get particular team from API using team ID or name
        
        for(let team of this.teams){
            if (team.id == id){
                let pName = $(`#${team.id}-add-PlayerName`).val();
                let pPosition = $(`#${team.id}-add-PlayerPosition`).val();
                let newPlayer = new Player(pName, pPosition);
                // newPlayer.id = `${team.id}${pName[0]}${pPosition[0]}`;
                team.players.push(newPlayer)
                TeamAdmin.updateTeam(team)
                    .then(() => {
                        return TeamAdmin.getAllTeams();
                    })
                    .then(teams => this.show(teams));
            }
        }     
    }
    

    static deletePlayer(teamID, pIDName){
        // use the ajax put method to update info about a unique team in API
        for(let team of this.teams){
            if (team.id == teamID){
                for(let player of team.players){
                    if (player.playerName == pIDName ){
                        team.players.splice(team.players.indexOf(player), 1);
                        TeamAdmin.updateTeam(team)
                        .then(() => {
                            return TeamAdmin.getAllTeams();
                        })
                        .then(teams => this.show(teams));
                    }
                }
            }
        }   
    }


    static show(teams){ 
        // this method re-render the DOM and create, update, or delete accordingly
    
        // this method develops how the structure of a typical team should be with buttons to delete player, delete the enitire team, and create player
        this.teams = teams;
        $('#teams').empty();
        for(let team of teams) {
            $('#teams').prepend(
                `
                <div id="${team.id}" class="newTeam container-md">
                    <h5 id="newTeam__teamName"> ${team.name} ${team.color} </h5>
                    <button id="delete__team" onclick="TeamDOMManager.deleteTeam(${team.id})" class="btn btn-warning">Delete Team</button>
                    <label for="add-PlayerName">
                        <input type="text" id="${team.id}-add-PlayerName" placeholder="Player Name">
                    </label> 
                    <label for="add-PlayerPosition">
                        <input type="text" id="${team.id}-add-PlayerPosition" placeholder="Player Position">
                    </label> <br>
                    <button id="createNewPlayer" onclick="TeamDOMManager.createPlayer(${team.id})" class="btn btn-warning">Create Player</button>
                    <div id="newTeam__teamPlayers">
                        <div class="player-detail">
                        
                        </div>
                    </div>
                </div>
            `);
       
            for(let player of team.players){
                // console.log(player.id);
                $(`#${team.id}`).find('.player-detail').append(
                    `
                    <p>
                        <span  id="${player.id}-pName"> ${player.playerName} </span>
                        <span  id="${player.id}-pPosition"> ${player.playerPostion} </span>
                        <button onclick="TeamDOMManager.deletePlayer(${team.id}, '${player.playerName}')" class="btn btn-danger">Delete</button>
                     </p>
                    `
                );
                
            }        
        }      
    
    }
}



// BTN FOR ADDING NEW TEAM
$('#create-new-team').on('click', function (){
    let tName = $('#team-name').val();
    let tColor = $('#team-color').val();

    TeamDOMManager.createTeam(tName, tColor);
    $('#team-name').val("");
    $('#team-color').val("");
});  
   




TeamDOMManager.getAllTeams();


