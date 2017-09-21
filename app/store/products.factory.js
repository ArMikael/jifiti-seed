(function () {
    'use strict';

    angular.module('jifitiApp')
        .factory('productsFactory', productsFactory);

    //productsFactory.$inject = ['$http'];

    function productsFactory($http, $rootScope) {
        console.log('FACTORY');

        return {
            getProducts: getProducts
        };

        function getProducts () {
            $http.get('./data/products.json')
                .then(getProductsComplete)
                .catch(getProductsFailed);

            function getProductsComplete(response) {
                var stores = response.data.Stores;

                $rootScope.storesList = stores.map(function(store) {
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

                console.log('finally', $rootScope.storesList);
            }

            function getProductsFailed(error) {
                logger.error('XHR Failed for getProducts.' + error.data);
            }
        }
    }
})();