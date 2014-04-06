angular.module('Klickr', ['ngRoute'])

.config(function ($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/landing.html'
    })
    .when('/gallery', {
      templateUrl: 'views/gallery.html',
      controller: 'HomeCtrl'
    })
    .otherwise({
      // redirectTo: '/'
    });
});