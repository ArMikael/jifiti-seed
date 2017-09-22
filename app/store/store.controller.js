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

        .controller('StoreCtrl', ['$scope', 'productsFactory',
            function($scope, productsFactory) {
            $scope.priceFilterModel = '9999';
            $scope.genderFilterModel = '3';
            $scope.priceFilterMod = '0,1000000';

            // Brings all store data from the server (JSON)
            productsFactory.getStoreData();

            // $scope.toggleDropDown = function (event) {
            //     console.log(event);
            // };

            // $scope.showPriceFilter = false;

            $scope.priceFiltersList = productsFactory.getPriceFilters();

            $scope.priceFilterFilter = function (product) {
                //console.log($scope.priceFilterMod);
                var borders = $scope.priceFilterMod.split(",");
                var minPrice = borders[0],
                    maxPrice = borders[1];
                return product.price > minPrice && product.price < maxPrice;
            };

            $scope.priceFilter = function (product) {
                return product.price < $scope.priceFilterModel;
            };

            $scope.genderFilter = function (product) {
                return product.tags.indexOf(parseInt($scope.genderFilterModel)) > -1;
            };


        }]);
})( );