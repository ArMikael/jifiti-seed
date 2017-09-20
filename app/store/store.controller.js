// (function () {
    'use strict';

    angular.module('jifitiApp.store', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/store', {
                templateUrl: 'store/store.html',
                controller: 'StoreCtrl'
            });
        }])

        .controller('StoreCtrl', ['$scope', function($scope) {
            $scope.productsList = ['One', 'Two', 'Three'];
        }]);
// })();