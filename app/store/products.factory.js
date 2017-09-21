(function () {
    'use strict';

    angular.module('jifitiApp')
        .factory('productsFactory', productsFactory);

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
                var priceFilters = response.data.PriceFilter;
                var genderFilters = response.data.GenderFilter;

                $rootScope.priceFilters = priceFilters;
                $rootScope.genderFilters = genderFilters;


                function Product (product, store) {
                    return {
                        id: product.ProductId,
                        title: product.ProductTitle,
                        description: product.Description,
                        image: product.ProductImage,
                        price: product.Price,
                        priceLabel: product.PriceLabel,
                        tags: product.ProductTags,
                        storeName: store.name,
                        storeLogo: store.logo
                    }
                }

                var storeProducts = stores.map(function(store) {
                    var storeObj = {
                        name: store.StoreName,
                        logo: store.StoreLogo
                    };

                    return store.Products.map(function (product) {
                        return new Product(product, storeObj);
                    });
                });

                // Merging stores products arrays in one array
                $rootScope.productsList  = [].concat.apply([], storeProducts);

            }

            function getProductsFailed(error) {
                logger.error('XHR Failed for getProducts.' + error.data);
            }
        }
    }
})();