//required for front end communication between client and server

const socket = io();

const inboxPeople = document.querySelector(".inbox__people");


let userName = "";
let id;
// value which stores if current user typing, which doesn't work :(
var typing = false;
var timeout = undefined;
const newUserConnected = function (data) {
    

    //give the user a random unique id
    id = Math.floor(Math.random() * 1000000);
    userName = 'user-' +id;
    //console.log(typeof(userName));   
    
    //emit an event with the user id
    socket.emit("new user", userName);
    //call
    addToUsersBox(userName);
};

const addToUsersBox = function (userName) {
    //This if statement checks whether an element of the user-userlist
    //exists and then inverts the result of the expression in the condition
    //to true, while also casting from an object to boolean
    if (!!document.querySelector(`.${userName}-userlist`)) {
        return;
    }
    
    //setup the divs for displaying the connected users
    //id is set to a string including the username
    const userBox = `
    <div class="chat_id ${userName}-userlist">
      <h5>${userName}</h5>
    </div>
  `;
    //set the inboxPeople div with the value of userbox
    inboxPeople.innerHTML += userBox;
};

//call 
newUserConnected();

//when a new user event is detected
socket.on("new user", function (data) {
  data.map(function (user) {
          return addToUsersBox(user);
      });
});

// when a new user joins, display message to current users
socket.on("new user message", function(user){
    addNewUserConnected(user);
});

//when a user leaves
socket.on("user disconnected", function (userName) {
  document.querySelector(`.${userName}-userlist`).remove();
});
//when a user leaves display message
socket.on("user disconnect message", function(user){
    showUserDisconnected(user);
});

const inputField = document.querySelector(".message_form__input");
const messageForm = document.querySelector(".message_form");
const messageBox = document.querySelector(".messages__history");
const typingBox = document.querySelector(".typing_box");

// the message for a new user joining
const addNewUserConnected = (user) => {
  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });
  const sendMsg = `
  <div class="incoming__message">
    <div class="received__message">
      <p>${user} connected at ${formattedTime}</p>
    </div>
  </div>`;
    
  messageBox.innerHTML += sendMsg;
};

const showUserDisconnected = (user) => {
    const time = new Date();
    const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });
    const disconnectMsg = `
  <div class="incoming__message">
    <div class="received__message">
      <p>${user} disconnected at ${formattedTime}</p>
    </div>
  </div>`;
  
  messageBox.innerHTML += disconnectMsg;
}
const addNewMessage = ({ user, message }) => {
  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

  const receivedMsg = `
  <div class="incoming__message">
    <div class="received__message">
      <p>${message}</p>
      <div class="message__info">
        <span class="message__author">${user}</span>
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`;

  const myMsg = `
  <div class="outgoing__message">
    <div class="sent__message">
      <p>${message}</p>
      <div class="message__info">
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`;

  //is the message sent or received
  messageBox.innerHTML += user === userName ? myMsg : receivedMsg;
};

/* taken and adapted from https://rsrohansingh10.medium.com/add-typing-in-your-chat-application-using-socket-io-421c12d8859e
   doesn't work
$(document).ready(function(){
      $(inputField).keypress((e)=>{
        if(e.which!=13){
          typing=true;
          socket.emit('typing', {user:user, typing:true});
          clearTimeout(timeout);
          timeout=setTimeout(typingTimeout, 3000);
        }else{
          clearTimeout(timeout);
          typingTimeout();
          //sendMessage() function will be called once the user hits enter
          //sendMessage()
        }
      })

      //code explained later
      socket.on('display', (data)=>{
        if(data.typing==true){
          $(typingBox).text(`${data.user} is typing...`);
        }
        else{
          $(typingBox).text("");
        }
      });
 });

function typingTimeout(){
    typing=false;
    socket.emit('typing', {user:user, typing:false});
}
*/

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputField.value) {
    return;
  }

  socket.emit("chat message", {
    message: inputField.value,
    nick: userName,
  });

  inputField.value = "";
});

socket.on("chat message", function (data) {
  addNewMessage({ user: data.nick, message: data.message });
});