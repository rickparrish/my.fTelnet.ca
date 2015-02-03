'use strict';

var LocalStorage = angular.module('LocalStorage', []);

LocalStorage.service('LocalStorage', ['$rootScope', function ($rootScope) {
    return {
        GetMyServers: function() {
            // Default to empty list
            var MyServers = [];
            
            // Load from local storage, if available
            if (localStorage['MyServers']) {
                // parse(), toJson(), parse() is to avoid duplicate $$hashKeys (this will filter the hash keys)
                MyServers = JSON.parse(angular.toJson(JSON.parse(localStorage['MyServers'])));
            }
            
            return MyServers;
        },
        
        SetMyServers: function(value) {
            localStorage['MyServers'] = JSON.stringify(value);
        },
        
        GetSettings: function() {
            // Default settings
            var Settings = {
                'ProxyServer': 'proxy-us-ga.ftelnet.ca:1123:11235'
            };
            
            // Load from local storage, if available
            if (localStorage['Settings']) {
                Settings = JSON.parse(localStorage['Settings']);

                // Old ProxyServer setting was only a piece of the domain, is 'us-ga:1123:11235' instead of 'proxy-us-ga.ftelnet.ca:1123:11235'
                if (Settings.ProxyServer.indexOf('.') == -1) {
                    var HostPorts = Settings.ProxyServer.split(':');
                    Settings.ProxyServer = 'proxy-' + HostPorts[0] + '.ftelnet.ca:' + HostPorts[1] + ':' + HostPorts[2];
                    $scope.SetSettings(Settings);
                }
            }
            
            return Settings;
        },
        
        SetSettings: function(value) {
            localStorage['Settings'] = JSON.stringify(value);
        }
    }
}]);
