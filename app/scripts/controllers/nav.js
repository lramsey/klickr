'use strict';

angular.module('klickrApp')
  .controller('NavCtrl', function ($scope, $location) {

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.formatHeader = function() {
      var formatHeader = {
        '/': 'top-header',
        '/gallery': 'top-header-small'
      };

      return formatHeader[$location.path()] || formatHeader['/gallery'];
    };

  });