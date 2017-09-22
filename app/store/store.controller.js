(function () {
    'use strict';

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

            $scope.priceFilterMod = '0';
            $scope.genderFilterMod = '0';

            // Brings all store data from the server (JSON)
            productsFactory.getStoreData();

            // $scope.toggleDropDown = function (event) {
            //     console.log(event);
            // };

            // $scope.showPriceFilter = false;

            $scope.priceFiltersList = productsFactory.getPriceFilters();
            $scope.genderFiltersList = productsFactory.getGenderFilters();

            $scope.priceRangeFilter = function (product) {
                if ($scope.priceFilterMod != 0) {
                    var borders = $scope.priceFilterMod.split(",");
                    var minPrice = borders[0],
                        maxPrice = borders[1];

                    return product.price > minPrice && product.price < maxPrice;
                }

                console.log('0 return price');
                return product;
            };

            $scope.genderTypeFilter = function (product) {
                if ($scope.genderFilterMod != 0) {
                    return product.tags.indexOf(parseInt($scope.genderFilterMod)) > -1;
                }

                console.log('0 return gender');
                return product;
            };

            $scope.priceFilter = function (product) {
                return product.price < $scope.priceFilterModel;
            };

            $scope.genderFilter = function (product) {
                return product.tags.indexOf(parseInt($scope.genderFilterModel)) > -1;
            };


        }]);
})( );