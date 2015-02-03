'use strict';

var Settings = angular.module('Settings', []);

Settings.controller('Settings', ['$scope', '$http', 'LocalStorage', function ($scope, $http, LocalStorage) {
    $scope.Settings = LocalStorage.GetSettings();

    $scope.ProxyServers = [];
    $http.get('models/ProxyServers.json').success(function(data) {
        $scope.ProxyServers = data;
    });
    
    $scope.ProxyChanged = function() {
        LocalStorage.SetSettings($scope.Settings);
    }
}]);