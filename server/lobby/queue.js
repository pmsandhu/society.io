var io = require('socket.io');

var Queue = {
  storage: [],
  insert: function(socket) {
    this.storage.push(socket);
    console.log('QUEUE', this.storage.length);
    socket.on('disconnect', function(socket) {
      var idx = Queue.storage.indexOf(socket);
      Queue.storage.splice(idx, 1);
      socket.emit('added to queue');
      console.log(Queue.storage);
    });
  },
  remove: function () {
    var socket1 = this.storage.shift();
    var socket2 = this.storage.shift();
    socket.emit('match ready');
    return {player1: socket1, player2: socket2};
  }
};

module.exports = {
  Queue: Queue
};
/*---TODO: queue Emit-- game ready and added to queue---*/

/*---TODO: queue On-- 'queue', 'join room', 'createRoom' ready and added to queue---*/
