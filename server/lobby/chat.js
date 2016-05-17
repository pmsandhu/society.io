var color = require('colors');
var chat= require('../socket/chatAPI').chat;
var addToChat = require ('../socket/chatAPI').addToChat;
var removeSock = require('../socket/chatAPI').removeSock;
var broadcast = require('../socket/chatAPI').broadcast;
var generateUserList = require('../socket/chatAPI').generateUserList;
var sendChat= require('../socket/chatAPI').sendChat;

function chatListeners(socket) {
  socket.on('chat', function() {
    addToChat(socket);
    console.log(chat);
    addChatter(socket);
  });

  socket.on('message', function(data){
    addMessage(socket, data);
  });

  socket.on('disconnect', function() {
    removeSock(socket);
    removeChatter(socket);
  });
}
// EMITTERS
function addChatter (socket) {
  var userJoined = getUserProfile(socket);
  var updatedUserList = generateUserList();
  broadcast('chat', userJoined);
  broadcast('updated user list', updatedUserList );
}


function addMessage (socket, data) {
   var response = {};
   response.user = socket.profile.username;
   response.time = new Date();
   response.message = data.message;
   chat.messages.push(response);
   broadcast('message', response);
}


function removeChatter(socket) {
  var userLeftMessage = 'user left @' + new Date();
  var updateUserList = generateUserList();

  broadcast('userLeft', userLeftMessage);
  broadcast('updated userList', updateUserList);
}


// EMIT MESSAGE HELPERS/FORMATERS
function getUserProfile (socket){
  var obj = {};
  obj.sockId= socket.socketId;
  obj.username = socket.profile.username;
  // obj.avatar= socket.profile.avatar;
  obj.joinTime = new Date();
  return obj;
}

module.exports= {
  chatListeners:chatListeners
};


