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
                $rootScope.priceFilters = priceFiltersFactory(response.data.PriceFilter);
                $rootScope.genderFilters = genderFiltersFactory(response.data.GenderFilter);

                //$rootScope.genderFilters.push(genderBoth);

                function priceFiltersFactory(priceFilters) {
                    return priceFilters.map(function(price){
                        return {
                            value: price.Value,
                            values: price.Values,
                            displayText: price.DisplayText,
                            tagId: price.TagId,
                            type: price.Type,
                            order: price.Order
                        }
                    });
                }

                function genderFiltersFactory(gendersFilters) {
                    return gendersFilters.map(function (gender) {
                       return {
                           tagId: gender.TagId,
                           type: gender.Type,
                           value: gender.Value,
                           values: gender.Values,
                           displayText: gender.DisplayText,
                           order: gender.Order
                       }
                    });
                }


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