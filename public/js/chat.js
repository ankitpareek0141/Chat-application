const socket = io();

socket.on('welcome user', (message) => {
    console.log(message);
});

socket.on('user join', (message) => {
    console.log(message);
});

// Sends the message from the input field
document.getElementById('sendMessageBtn').addEventListener('click', () => {
    

    // mustache demo
    let card = document.getElementById("chatCard").innerHTML;
    var rendered = Mustache.render(card, { name: 'DIVISHA', message: "THIS IS IT" });
    document.getElementById("temp").innerHTML = rendered;

    // message code
    var userMessage = document.getElementById('messageBox').value;
    socket.emit('send message', userMessage);
    
    document.getElementById('messageBox').value = null;
});

// Send the current location of  user
document.getElementById('sendLocationBtn').addEventListener('click', () => {
    
    if(!navigator) {
        return console.log('Navigator not found on your browser!');
    }

    navigator.geolocation.getCurrentPosition((oLocation) => {
        socket.emit('send location', {
            longitude: oLocation.coords.longitude,
            latitude: oLocation.coords.latitude
        }, (response) => {
            console.log(response);
        });
    });
});

// Prints the other user messages
socket.on('check message', (message) => {
    console.log("==>> ", message);
});

// Prints the other users shared locations
socket.on('share location', (location) => {
    console.log('Location => ', location);
});


// socket.on('current count', (count) => {
//     console.log('Current count value ', count);
// });

// document.getElementById('btn').addEventListener('click', () => {
//     socket.emit('increment count');
// });

// socket.on('update count', (count) => {
//     console.log('Update value...');
//     console.log('Counter is ', count);
// });


// Prints message in the console when some user connects

