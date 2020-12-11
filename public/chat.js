function buttonClick() {
    //send the message 
    sendMessage().then(function(retVal){
        console.log("We sent a message"); 
    }).catch(function(error){
        console.log(error); 
    }); 

    //get all the mesasges 
    getMessages().then(function(messages){
       // [{ name : "", message: ""}]
       let h4 = document.createElement('h4');
       let p = document.createElement('p');
       let messagesList = document.getElementById("messages"); 

       messages.forEach( function(message){
        h4.innerHTML = message.name;
        p.innerHTML = message.message; 
        messagesList.appendChild(h4); 
        messagesList.appendChild(p); 
       })
    }).catch(function(error){
        console.log(error); 
    });  
}

async function getMessages(){
    let requestOptions = {
        method: "GET",
        headers : { "Content-Type": "application/json"} 
    }

    const response = await fetch("/messages", requestOptions); 
    const body = await response.json(); 
    if(response.status != 200){
        throw Error(body.message); 
    }

    return body; 
}

async function sendMessage(){
    let message = {
        name : document.getElementById("name").value, 
        message : document.getElementById("message").value
    }

    let requestOptions = {
        method: "POST",
        body: JSON.stringify(message), 
        headers : { "Content-Type": "application/json"} 
    }

    const response = await fetch("/messages", requestOptions); 

    if(response.status != 200){
        throw Error("Error!"); 
    }

    return true; 
}