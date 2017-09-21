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

            $scope.storesList = [];
            $scope.productsList = [];


            getProducts();

            function getProducts () {
                $http.get('./data/products.json')
                    .then(getProductsComplete)
                    .catch(getProductsFailed);

                function getProductsComplete(response) {
                    var stores = response.data.Stores;

                    $scope.storesList = stores.map(function(store) {
                        return new StoreFactory(store);
                    });

                    function StoreFactory(store){
                        return {
                            name: store.StoreName,
                            logo: store.StoreLogo,
                            products: createProductsList(store.Products)
                        }
                    }

                    function createProductsList(products) {
                        return products.map(function (product) {
                            return new Product(product);
                        });
                    }

                    function Product (product) {
                        return {
                            id: product.ProductId,
                            title: product.ProductTitle,
                            description: product.Description,
                            image: product.ProductImage,
                            price: product.Price,
                            priceLabel: product.PriceLabel,
                            tags: product.ProductTags
                        }
                    }

                    console.log('finally', $scope.productsList);
                }

                function getProductsFailed(error) {
                    logger.error('XHR Failed for getProducts.' + error.data);
                }
            }

        }]);
})( );