'use strict';

var Settings = angular.module('Settings', []);

Settings.controller('Settings', ['$scope', '$http', function ($scope, $http) {
    $scope.Settings = {
        'ProxyServer': 'proxy-us-ga.ftelnet.ca:1123:11235'
    };
    if (localStorage['Settings']) {
        $scope.Settings = JSON.parse(localStorage['Settings']);
    }

    $scope.ProxyServers = [];
    $http.get('models/ProxyServers.json').success(function(data) {
        $scope.ProxyServers = data;
    });
    
    $scope.ProxyChanged = function() {
        localStorage['Settings'] = JSON.stringify($scope.Settings);
    }
}]);