(function () {
    'use strict';

    angular.module('jifitiApp.store', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/store', {
                templateUrl: 'store/store.html',
                controller: 'StoreCtrl'
            });
        }])

        .controller('StoreCtrl', ['$scope', 'productsFactory', function($scope, productsFactory) {
            $scope.priceFilterModel = '0';
            $scope.genderFilterModel = '0';

            // Brings all store data from the server (JSON)
            productsFactory.getStoreData();

            $scope.priceFiltersList = productsFactory.getPriceFilters();
            $scope.genderFiltersList = productsFactory.getGenderFilters();

            $scope.priceRangeFilter = function (product) {
                if ($scope.priceFilterModel != 0) {
                    var borders = $scope.priceFilterModel.split(",");
                    var minPrice = borders[0],
                        maxPrice = borders[1];

                    return product.price > minPrice && product.price < maxPrice;
                }

                return product;
            };

            $scope.genderTypeFilter = function (product) {
                if ($scope.genderFilterModel != 0) {
                    return product.tags.indexOf(parseInt($scope.genderFilterModel)) > -1;
                }

                return product;
            };

            // $scope.priceFilterModel = '9999';

            // $scope.toggleDropDown = function (event) {
            //     console.log(event);
            // };

            // $scope.showPriceFilter = false;

            // $scope.priceFilter = function (product) {
            //     return product.price < $scope.priceFilterModel;
            // };
        }]);
})( );