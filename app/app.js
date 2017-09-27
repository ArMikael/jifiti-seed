(function(){
    'use strict';

    angular.module('jifitiApp', [
        'ngRoute',
        'jifitiApp.store',
        'jifitiApp.directives.productCard'
    ]).
    config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/store'});
    }]);
})();

