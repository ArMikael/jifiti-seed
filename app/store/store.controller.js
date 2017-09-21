(function () {
    'use strict';

    console.log('222');

    angular.module('jifitiApp.store', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/store', {
                templateUrl: 'store/store.html',
                controller: 'StoreCtrl'
            });
        }])

        .controller('StoreCtrl', ['$scope', 'productsFactory', '$rootScope',
            function($scope, productsFactory, $rootScope) {
            $scope.priceFilterModel = '9999';
            $scope.genderFilterModel = '3';

            productsFactory.getProducts();

            $scope.priceFilter = function (product) {
                return product.price < $scope.priceFilterModel;
            };

            $scope.genderFilter = function (product) {
                return product.tags.indexOf(parseInt($scope.genderFilterModel)) > -1;
            };


        }]);
})( );