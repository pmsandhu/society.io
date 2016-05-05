angular
  .module('app')
  .factory('lobbyFactory', lobbyFactory);

	lobbyFactory.$inject = ['socketFactory', '$state'];

	function lobbyFactory(socketFactory, $state) {
		var emit = socketFactory.emit;
		var on = socketFactory.on;

		return {
			joinQueue: joinQueue,
			addedToQueue: addedToQueue,
			createRoom: createRoom,
			joinRoom: joinRoom,
			waitingRoom: waitingRoom,
			battlefield: battlefield
		};

		function joinQueue(message) {
			emit('queue', message);
			console.log('queue event emitted!');
		}

		function addedToQueue() {
			on('added to queue', function() {
				$state.go('/loading');
			});
		}

		function createRoom(joinCode) {
			emit('create room', {joinCode: joinCode});
			console.log('create room event emitted!');
		}

		function joinRoom() {
			emit('join room');
			console.log('join room event emitted!');
		}

		function waitingRoom() {
			on('room created', function(data){
				$state.go('waitingRoom');
			});
			on('room exists', function(data){
				if(data.success) {
					$state.go('waitingRoom');
				} else {
					$state.go('lobby');
				}
			});
		}

		function battlefield() {
			on('match ready', function(){
				$state.go('Battlefield');
			});
		}

	}