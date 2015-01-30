'use strict';

var navbar = angular.module('navbar', []);

navbar.controller('navbar', '$scope', function ($scope) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
});