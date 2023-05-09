

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
        for(let team of teams){
            if (team.id == id){
                alert(`${team.id}`)
                let pName = $('#add-playerName').val();
                let pPosition = $('#add-playerPosition').val()
                team.players.push(new Player(pName, pPosition))
                console.log(new Player(pName, pPosition));
                // TeamAdmin.updateTeam(team)
                //     .then(() => {
                //         return TeamAdmin.getAllTeams();
                //     })
                //     .then(teams => this.show(teams));
            }
        }
        
    }
    

    static deletePlayer(teamID, pID){
        // use the ajax put method to update info about a unique team in API
        for(let team of teams){
            if (team.id == teamID){
                for(let player of team){
                    if (player.id == pID ){
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
            <div id="teams" class="teams">
            <!-- should contain all teams -->
            <div class="newTeam container-md">
                <div id="newTeam__teamName"> ${team.name} ${team.color}</div>
                <button id="delete__team" onclick="TeamDOMManager.deleteTeam(${team.id})" class="btn btn-warning">Delete Team</button>
                <label for="add-teamPlayerName">
                    <input type="text" id="add-playerName" placeholder="Player Name">
                </label> 
                <label for="add-teamPlayer">
                    <input type="text" id="add-playerPosition" placeholder="Player Position">
                </label> <br>
                <button id="createNewPlayer" onclick="TeamDOMManager.createPlayer(${team.id})" class="btn btn-warning">Create Player</button>
                <div id="newTeam__teamPlayers">
                    <div class="player-detail">
                   
                    </div>
                </div>
            </div>
        </div>
        `);
        // for(let player of team.players){
        //     $(`#${team.id}`).find('.player-detail').append(
        //         `
        //         <p>
        //             <span  id="pName"> ${player.playerName} </span>
        //             <span  id="pPosition"> ${player.playerPostion} </span>
        //             <button class="btn btn-danger">Delete</button>
        //          </p>
        //         `
        //     );
        // }
            // console.log(`${team.id} ${team.name} ${team.color + "\n"} `);
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
   
// BTN FOR ADDING NEW PLAYER
// $('#createNewPlayer').on('click', function (){
//     let pName = $('#add-playerName').val();
//     let pPosition = $('#add-playerPosition').val();

//     TeamDOMManager.createPlayer(pName, pPosition);
//     $('#team-name').val("");
//     $('#team-color').val("");
// });


let myNewTeam = {
    name: 'manUtd',
    createdAt: 'New York',
    color: 'red'
}

let myNewTeam2 = {
    name: 'Chelsea',
    createdAt: 'Boston',
    avatar: 'Trailer',
    color : 'blue'
}

let myNewTeam3 = {
    name: 'Man City',
    createdAt: 'Philly',
    avatar: 'Trooper',
}

let myNewTeam4 = ('Man Utd');

// xhr.open('DELETE', 'url-endpoint/id');

// xhr.addE ventListener('load', ()=>{
//     if(xhr.status === 204 && xhr.readyState === 4){
//         console.log('xhr.status')
//     } else{
//         throw new Eror("Bad Request");
//     }
// }) 

// xhr.send();

 function getInfo (obj) {
    // if(obj.status == 200){
    //     // var result = this.responseText;
    //     // var newResult = JSON.parse(this.responseText);
    //     return obj.status; 
    // }
    // console.log(newResult)
    return obj.readyState;
}





TeamDOMManager.getAllTeams();
// TeamDOMManager.createTeam('chelsea', 'newBlue');
// TeamDOMManager.deleteTeam(1);




// let myTeam10 = new Team('Man City', 'red');
// let myTeam10 = TeamDOMManager.createTeam(myNewTeam);
// console.log(myTeam10);





// Admin.then(data => {console.log(Admin.responseText)});
// console.log(Admin);









// let Admin = TeamAdmin.getAllTeams();
// Admin.then(data => {console.log(Admin.responseText)});
// Admin.then(data => {console.log(data)});

// let Admin3 = TeamAdmin.getUniqueTeam(8);
// Admin3.then(data => {console.log(Admin3.readyState, "myteam")});
// Admin3.then(data => {console.log(data)});


// let Admin4 = TeamAdmin.createTeam(myNewTeam2);
// console.log(Admin4.then(data));
// Admin4.then(data => {console.log(Admin4.statusText)});
// Admin4.then(data => {console.log(data)});


// let Admin2 = TeamAdmin.updateTeam(myNewTeam2);
// Admin2.then(data => {console.log(Admin2.statusText)});
// Admin2.then(data => {console.log(data)});
// Admin2.then(console.log(Admin2));


// let Admin10 = TeamAdmin.deleteTeam(17);
// Admin10.then(data => {console.log(Admin10.status)});
// Admin10.then(data => {console.log(data)});
// Admin10.then(console.log(Admin10));


// console.log(Admin.then(data => {console.log(data)}).catch(err =>{con}));

// console.log(TeamAdmin.getAllTeams());
// console.log(getInfo(TeamAdmin.getAllTeams()))
// TeamAdmin.getAllTeams().then(data => console.log(data));

// TeamAdmin.createTeam(myNewTeam);

// TeamAdmin.deleteTeam(myNewTeam); 



// console.log(TeamAdmin.getAllTeams().then(tasks => {
//            // Do something with the list of tasks
//             console.log(tasks); }));









// let denfender = new Player('mario','defense');
// console.log(denfender);


// let myTeam = new Team('Man Utd', 'red');
// // TeamAdmin.createTeam(myTeam);
// myTeam.addPlayer('defender', 'aguero');
// console.log(myTeam.players);

// let myNewTeam = {
//     name: 'manUtd',
//     createdAt: 'New York',
//     avatar: 'car'
// }
 
// console.log(TeamAdmin.getAllTeams().then(tasks => {
//            // Do something with the list of tasks
//             console.log(tasks); }));


// console.log(TeamAdmin.getUniqueTeam(1).then(tasks => {
//     // Do something with the list of tasks
//     tasks.players.push('laylow'),
//     tasks.players.push('newUser'),
//     console.log(tasks); }));
    


// console.log(TeamAdmin.createTeam(myNewTeam));
// myNewTeam.players.push(new Player('laylow','defence'));