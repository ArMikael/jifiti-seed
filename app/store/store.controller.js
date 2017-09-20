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

                    function Product (product) {
                        return {
                            id: product.ProductId,
                            title: product.ProductTitle,
                            description: product.Description,
                            image: product.ProductImage,
                            price: product.Price,
                            priceLabel: product.PriceLabel
                        }
                    }


                    function createProduct(product) {
                        var clientProduct = new Product(product);
                        $scope.productsList.push(clientProduct);
                    }

                    $scope.storesList.forEach(function (store, index) {
                        store.Products.forEach(function (product) {
                            createProduct(product);
                        });
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