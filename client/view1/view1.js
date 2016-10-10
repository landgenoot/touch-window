'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$mdToast', '$routeParams', '$location', 'socket', '$interval', 'vibrator', function($scope, $mdToast, $routeParams, $location, socket, $interval, vibrator) {


  $scope.url = window.location.href;

  $scope.fingers = [];
  for (var i = 0; i < 10; i++) {
    $scope.fingers.push({visible: false});
  }

  $scope.showSimpleToast = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent('Private url copied to clipboard')
        .hideDelay(3000)
    );
  };

  $scope.onTouchmove = function($event) {

    // Max 30fps
    if (new Date().getTime() > $scope.lastEvent + 33 || $scope.lastEvent === undefined) {
      var update = {
        id: $routeParams.id,
        fingers: []
      };

      var finger;
      for (var i = 0; i < $event.changedTouches.length; i++) {
        finger = {
          x: $event.touches[i].clientX / ($event.target.scrollWidth + $event.target.offsetLeft),
          y: $event.touches[i].clientY / ($event.target.scrollHeight + $event.target.offsetTop),
        };
        update.fingers.push(finger);
      }
      socket.emit('move', update);
      $scope.lastEvent = new Date().getTime();

      // Check match
      for (var i = 0; i < $scope.fingers.length; i++) {
        for (var j = 0; $event.changedTouches.length; i++) {
          if ($scope.fingers[i].visible && Math.abs($event.touches[i].clientX - $scope.fingers[i].x) < 25 && Math.abs($event.touches[i].clientY - $scope.fingers[i].y) < 25 ) {
            vibrator.vibrate(300);
          }
        }
      }
    }
  };

  $scope.$on('$viewContentLoaded', function() {
    var target = document.getElementsByClassName("canvas-container")[0];
    if ($routeParams.id === undefined) {
      var hash = Math.random().toString(36).substring(12).toUpperCase();
      $location.path('/window/' + String(hash));
    } else {
      socket.on('move', function (data) {
        if (data.id == $routeParams.id) {
          var i = 0;
          for (i; i < data.fingers.length; i++) {
            $scope.fingers[i].x = Math.round(data.fingers[i].x*(target.scrollWidth+target.offsetLeft));
            $scope.fingers[i].y = Math.round(data.fingers[i].y*(target.scrollHeight+target.offsetTop));
            $scope.fingers[i].visible = true;
            $scope.fingers[i].lastSeen = new Date().getTime();
          }
        }
      });
    }
  });

  $interval(function() {
    for (var i = 0; i < 10; i++) {
      if ($scope.fingers[i].lastSeen + 1000 < new Date().getTime()) {
        $scope.fingers[i].visible = false;
      }
    }
  }, 100);




}]);
