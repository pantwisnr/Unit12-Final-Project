


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
    static url = "https://6454d179a74f994b3349cd0d.mockapi.io/projects/TeamSheet/TeamsInfo";


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

    
    static createTeam(team){
        // use the ajax post method to post newly created team to API
        
        TeamAdmin.createTeam(team);
    }
    
    static deleteTeam(id){
        // use the ajax delete method to delete team info from API
        
    }
    
    static createPlayer(pName, pPosition){
        // use the ajax get method to get particular team from API using team ID or name
        
    }
    
    static deletePlayer(ID){
        // use the ajax put method to update info about a unique team in API
        
    }
    static show(teams){
        // this method re-render the DOM and create, update, or delete accordingly
    
        // this method develops how the structure of a typical team should be with buttons to delete player, delete the enitire team, and create player
        this.teams = teams;

    
    }
}



let myNewTeam = {
    name: 'manUtd',
    createdAt: 'New York',
    avatar: 'car'
}

let myNewTeam2 = {
    name: 'Chelsea',
    createdAt: 'Boston',
    avatar: 'Trailer',
    id: 2
}

// xhr.open('DELETE', 'url-endpoint/id');

// xhr.addEventListener('load', ()=>{
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





// TeamDOMManager.getAllTeams();


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