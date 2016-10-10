'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.version',
  'ngMaterial',
  'ngTouch',
  'btford.socket-io'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
    .when('/window/:id',{
      templateUrl:'view1/view1.html',
      controller: 'View1Ctrl'
    })
    .otherwise({redirectTo: '/view1'});
}])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('deep-orange')
    .backgroundPalette('grey');

}).
factory('socket', function (socketFactory) {
  return socketFactory();
});

new Clipboard('.md-button');
