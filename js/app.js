var app = angular.module('svgLogos', []);

app.controller('ListController', function($scope, $http) {
    $http.get('logos.json')
        .then(function(res) {
            $scope.logos = res.data;
        });
});
