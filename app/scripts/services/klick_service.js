'use strict';

angular.module('klickrApp')
  .service('KlickService', function KlickService($http, DEFAULTS) {
    this.getKlicks = function (){
      return $http.get(DEFAULTS.HOST + '/klicks').then(function(klicks){
        return klicks.data;
      });
    };
  });