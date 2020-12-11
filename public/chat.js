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
       messages.forEach( function(message){
        document.getElementById("#messages").append(
            `<h4>${message.name}</h4> 
             <p>${message.message}<p> 
            `
        )
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
        body: message, 
        headers : { "Content-Type": "application/json"} 
    }

    const response = await fetch("/messages", requestOptions); 

    if(response.status != 200){
        throw Error(body.message); 
    }

    return true; 
}