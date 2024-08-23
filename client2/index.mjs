const socket = io("http://localhost:5000");

let senderId = 'user2';
let receiverId = 'user1';
socket.on('connect', (res) => {
    console.log('connected to server');
})

socket.emit('register', {
    from: senderId
})

let sendMessage = (event) => {
    event.preventDefault();

    let toSendText = document.getElementById('sendField');
    let textValue = toSendText.value;
    console.log(textValue);
    if (textValue) {
        console.log('ready to send text');
        socket.emit("message", {
            from: senderId,
            to: receiverId,
            text: textValue,
        })
    }
    toSendText.value = '';
}
socket.on('recieve', (data) => {
    console.log('data recieved', data);
    if(data) {
        console.log(data.text);
        let responseBox = document.getElementById('recieveField');
        console.log(responseBox);
        
        responseBox.value = data.text;
    }
})

document.getElementById('messageFrom').addEventListener('submit', sendMessage);