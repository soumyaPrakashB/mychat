const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8081/gs-guide-websocket'
});

var sendUser;

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/user/topic/greetings', (greeting) => {
        showGreeting(greeting);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    var targetUser = document.getElementById("recipient").value;
    stompClient.publish({
        destination: "/app/hello",
        body: JSON.stringify({'name': $("#name").val(), 'targetUser': targetUser})
    });
}

function selectSendUser() {
    var e = document.getElementById("recipient");
    sendUser = e.value;
    console.log("=============");
    console.log(sendUser);
}

function showGreeting(message) {
    console.log("+++")
    console.log(message)
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendName());
    $( "#selectUser" ).click(() => selectSendUser());
});