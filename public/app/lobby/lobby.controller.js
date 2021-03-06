
(function () {
'use strict';
 angular
  .module('app')
  .controller('LobbyController', LobbyController);

  LobbyController.$inject = ['$scope', 'lobbyFactory', 'socketFactory', 'authFactory', 'statsFactory', 'soundFactory'];

  function LobbyController($scope, lobbyFactory, socketFactory, authFactory, statsFactory, soundFactory) {
    var vm = this;
    vm.pageTitle = "Lobby";

    soundFactory.loadSounds();

    authFactory.checkAuth();
    var tokenObj = authFactory.attachToken({});

    socketFactory.connectSocket()
    .then(function() {
      console.log('promise resolved');
      lobbyFactory.getPlayer();
    });

    $scope.options = {
      playlist: ['../audio/NVOY-AllNight.mp3'],
      loop: true
    };

    vm.get = lobbyFactory.get;
    vm.set = lobbyFactory.set;
    vm.queue = lobbyFactory.joinQueue;

    vm.createRoom = lobbyFactory.createRoom;
    vm.showCreateGameInput = false;
    vm.showCreateGameController = false;

    vm.joinRoom = lobbyFactory.joinRoom;
    vm.showJoinGameInput = false;
    vm.showJoinGameController = false;

    vm.showPreQueueWarning = false;

    vm.showAvatars = false;

    vm.signOut = function() {
      console.log('signing out');
      authFactory.signOut();
    };

    vm.getErrorMessage = function(val) {
      var message = lobbyFactory.get(val);
      return lobbyFactory.get(val);
    };

    vm.toggleQueueWarning = function() {
      console.log("inside toggleQueueWarning()");
      if(vm.showPreQueueWarning) {
        vm.showPreQueueWarning = false;
      } else {
        vm.showPreQueueWarning = true;
      }
    };

    vm.getLeaderboard = function() {
      return statsFactory.get('leaderboard');
    };

    vm.myAvatar = function() {
      return vm.get('avatar');
    };

    vm.getAvatar = function() {
      var player = vm.get('player');
      vm.myAvatar = player.avatar;
      console.log('my avatar is: ', vm.myAvatar);
    };

    vm.updateAvatar = function(obj) {
      console.log('this is update avatar: ', obj);
      lobbyFactory.updateAvatar(obj);
    };

    vm.setNewAvatar = lobbyFactory.setNewAvatar;

    vm.playClick = function() {
      console.log('LobbyController playClick');
      soundFactory.playClick();
    };

    vm.playConfirm = function() {
      console.log('LobbyController playConfirm');
      soundFactory.playConfirm();
    };

  }
})();
