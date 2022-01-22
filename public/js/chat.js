const socket = io();

socket.on('welcome user', (message) => {
    console.log(message);
});

socket.on('user join', (message) => {
    console.log(message);
});

// Sends the message from the input field
document.getElementById('sendMessageBtn').addEventListener('click', () => {
    
    let parentContainer = document.getElementById("chatBox");
    let card = document.getElementById("senderCard").innerHTML;

    // Getting typed message
    var userMessage = document.getElementById('messageBox').value;
    var rendered = Mustache.render(card, { name: 'Abc', message: userMessage });
    parentContainer.insertAdjacentHTML("beforeend", rendered);

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

    let parentContainer = document.getElementById("chatBox");
    let card = document.getElementById("receiverCard").innerHTML;
    var rendered = Mustache.render(card, { name: 'Xyz', message: message });
    parentContainer.insertAdjacentHTML("beforeend", rendered);
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

