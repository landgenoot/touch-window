'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$mdToast', '$routeParams', '$location', function($scope, $mdToast, $routeParams, $location) {

  $scope.showSimpleToast = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent('Private url copied to clipboard')
        .hideDelay(3000)
    );
  };

  $scope.onTouchmove = function($event) {

    console.log($routeParams.id);

    var update = {
      id: 1,
      fingers: []
    };

    var finger;
    for (var i = 0; i < $event.changedTouches.length; i++) {
      finger = {
        x: $event.touches[i].clientX/($event.target.scrollWidth+$event.target.offsetLeft),
        y: $event.touches[i].clientY/($event.target.scrollHeight+$event.target.offsetTop),
      };
      update.fingers.push(finger);
    }
  }

  $scope.$on('$viewContentLoaded', function() {
    if ($routeParams.id === undefined) {
      var hash = Math.random().toString(36).substring(15).toUpperCase();
      $location.path('/window/' + hash)
    }
  });

}]);
