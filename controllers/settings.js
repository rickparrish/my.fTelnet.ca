'use strict';

var Settings = angular.module('Settings', []);

Settings.controller('Settings', ['$scope', '$http', function ($scope, $http) {
    $scope.Settings = {
        'ProxyServer': 'proxy-us-ga.ftelnet.ca:1123:11235'
    };
    if (localStorage['Settings']) {
        $scope.Settings = JSON.parse(localStorage['Settings']);

        // Old ProxyServer setting was only a piece of the domain, is 'us-ga:1123:11235' instead of 'proxy-us-ga.ftelnet.ca:1123:11235'
        if ($scope.Settings.ProxyServer.indexOf('.') == -1) {
            var HostPorts = $scope.Settings.ProxyServer.split(':');
            $scope.Settings.ProxyServer = 'proxy-' + HostPorts[0] + '.ftelnet.ca:' + HostPorts[1] + ':' + HostPorts[2];
            localStorage['Settings'] = JSON.stringify($scope.Settings);
        }
    }

    $scope.ProxyServers = [];
    $http.get('models/ProxyServers.json').success(function(data) {
        $scope.ProxyServers = data;
    });
    
    $scope.ProxyChanged = function() {
        localStorage['Settings'] = JSON.stringify($scope.Settings);
    }
}]);