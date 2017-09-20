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

            getProducts();

            function getProducts () {
                $http.get('./data/products.json')
                    .then(getProductsComplete)
                    .catch(getProductsFailed);

                function getProductsComplete(response) {
                    console.log('data received', response.data.Stores);
                    $scope.productsList = response.data.Stores;
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