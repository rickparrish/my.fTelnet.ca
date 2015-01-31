'use strict';

var fTelnetApp = angular.module('fTelnetApp', [
    'ngRoute',

    'AddressBook',
    'NavBar',
    'Settings'
]);

fTelnetApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'views/addressbook.html',
        controller: 'AddressBook'
    }).
    when('/about', {
        templateUrl: 'views/about.html'
    }).
    when('/contact', {
        templateUrl: 'views/contact.html'
    }).
    when('/donate', {
        templateUrl: 'views/donate.html'
    }).
    when('/embed', {
        templateUrl: 'views/embed.html'
    }).
    when('/help', {
        templateUrl: 'views/help.html'
    }).
    when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'Settings'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);