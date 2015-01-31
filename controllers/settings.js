'use strict';

var Settings = angular.module('Settings', []);

Settings.controller('Settings', ['$scope', function ($scope) {
    $scope.Settings = {
        'ProxyServer': 'us-ga:1123:11235'
    };
    if (localStorage['Settings']) {
        $scope.Settings = JSON.parse(localStorage['Settings']);
    }
    $('#cboProxyServer').val($scope.Settings.ProxyServer);

    $scope.ProxyChanged = function (elm) {
        $scope.Settings.ProxyServer = $('#cboProxyServer').val();
        localStorage['Settings'] = JSON.stringify($scope.Settings);
    };
}]);