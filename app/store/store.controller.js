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

            //$scope.priceFilterModel = $rootScope.priceFilters[$rootScope.priceFilters.length - 1];

            $scope.priceFilter = function (product) {
                //console.log('filter product: ', product);
                return product.price < $scope.priceFilterModel;
            };

            $scope.genderFilter = function (product) {
                return product.tags.indexOf(parseInt($scope.genderFilterModel)) > -1;
            };


        }]);
})( );