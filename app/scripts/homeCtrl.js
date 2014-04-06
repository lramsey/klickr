angular.module('Klickr')
  .controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
    var server = 'http://jyek.cloudapp.net:3004/klicks';
    $scope.links = [];

    $scope.getData = function (){
      $http.get(server)
      .then(function(data){
        $scope.links = data.data;
      });
    };

    $scope.getData();
  }]);