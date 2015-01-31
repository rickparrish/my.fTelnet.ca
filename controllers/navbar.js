'use strict';

var NavBar = angular.module('NavBar', []);

NavBar.controller('NavBar', ['$scope', '$location', function ($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}]);