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

            productsFactory.getProducts();

            // $scope.priceFilter = function (product) {
            //     return product.price;
            // }

            // $scope.handlePriceFilter = function () {
            //     var filteredProducts = $rootScope.storesList.map(function (store) {
            //        return store.products.map(function (product) {
            //           return product.price < $scope.priceFilter;
            //        });
            //     });
            //
            //     $rootScope.storesList = filteredProducts;
            // }

        }]);
})( );