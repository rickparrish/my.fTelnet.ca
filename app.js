'use strict';

var fTelnetApp = angular.module('fTelnetApp', [
    'ngRoute',

    'AddressBook',
    'LocalStorage',
    'NavBar',
    'Settings'
]);

fTelnetApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'views/AddressBook.html',
        controller: 'AddressBook'
    }).
    when('/About', {
        templateUrl: 'views/About.html'
    }).
    when('/Contact', {
        templateUrl: 'views/Contact.html'
    }).
    when('/Donate', {
        templateUrl: 'views/Donate.html'
    }).
    when('/Embed', {
        templateUrl: 'views/Embed.html'
    }).
    when('/Help', {
        templateUrl: 'views/Help.html'
    }).
    when('/Settings', {
        templateUrl: 'views/Settings.html',
        controller: 'Settings'
    }).
    when('/500', {
        templateUrl: 'views/500.html'
    }).
    otherwise({
        templateUrl: '/404.aspx?hash=' + location.hash.replace('#', '')
    });
}]);