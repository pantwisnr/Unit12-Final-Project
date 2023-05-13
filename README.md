# Unit12 Final Project Outline

- This is going to be a project of teams where users can create team, get team info, update team info and delete team from the using the MOCK API. 



----------------------------------------------------------------
ACCESSING STATUS AND READYSTATE IN JQUERY AJAX CALLS:
--------------------------------------------------------------
 - In the TeamAdmin class, when the static getAllTeams() was called, an HttpRequest object was returned similar to what will be returned when 2 line code below is called.   
 
        // let myResponse = new XMLHttpRequest();
        // myResponse.open('GET', this.url, true);

 I struggled a lot because i didnt understand what was actually going on under the hood.

        // let Admin = TeamAdmin.getAllTeams();
        // Admin.then(console.log(Admin.responseText));
        // Admin.then(console.log(data));

    the code above only returned undefined. For some reason,  
    
   (a) Admin.then(console.log(Admin.readyState)); => code (a)returns "1" 

    whilst 
    (b) // Admin.then(data => {console.log(Admin.readyState)}); => code (b) reutrns "4" 

    that was when i realized that, in order for the promise to be fufilled and to access the readyState, status, responText and other properties, an annonymous callback function has to be introudced before it becomes possible.
 
    // Admin.then(data => {console.log(data)});  => the introduction of the anonymous func makes it similar to funcs below.
    
    xhr.onload()
    or 
    xhr.addEventListener('load', ()=>{})
 





---------------------------------------------------------------------
ERRROR - ( cannot read properties of undefined (reading 'then') )
-------------------------------------------------------------------- 
    - One of the errors I faced was in the TeamAdmin class, the static updateTeam, and delteTeam methods was returning 
    ( cannot read properties of undefined (reading 'then') ) to the console. ==> The ans to this problem was that the function simply performs the operations corectly but does not return a value. Hence, the undefined value is returned. (when I added the RETURN keyword before the ajax calls, the problem was solved).
