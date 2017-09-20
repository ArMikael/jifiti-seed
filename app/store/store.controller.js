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

        .controller('StoreCtrl', ['$scope', 'productsFactory', '$http', function($scope, productsFactory, $http) {
            $scope.productsList = [];

            getProducts();

            function getProducts () {
                $http.get('./data/products.json')
                    .then(getProductsComplete)
                    .catch(getProductsFailed);

                function getProductsComplete(response) {
                    console.log('data received', response.data.Stores);
                    $scope.storesList = response.data.Stores;

                    $scope.storesList.forEach(function (store, index) {
                        store.Products.forEach(function (product) {
                            console.log(product);
                            $scope.productsList.push(product);
                        });
                        // console.log(store, index);
                    });

                    console.log('finally', $scope.productsList);
                }

                function getProductsFailed(error) {
                    logger.error('XHR Failed for getProducts.' + error.data);
                }
            }


            // $scope.productsList = productsFactory.getProducts();
            // console.log('DATA in CTRL: ', $scope.productsList);
            //['One', 'Two', 'Three'];
        }]);
})( );