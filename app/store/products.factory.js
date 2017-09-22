(function () {
    'use strict';

    angular.module('jifitiApp')
        .factory('productsFactory', productsFactory);

    function productsFactory($http, $rootScope) {
        
        return {
            getStoreData: fnGetStoreData,
            getPriceFilters: fnGetPriceFilters,
            getGenderFilters: fnGetGenderFilters
        };

        function fnGetStoreData () {
            $http.get('./data/products.json')
                .then(getStoreDataComplete)
                .catch(getStoreDataFailed);

            function getStoreDataComplete(response) {
                var stores = response.data.Stores;
                // $rootScope.priceFilters = priceFiltersFactory(response.data.PriceFilter);
                // $rootScope.genderFilters = genderFiltersFactory(response.data.GenderFilter);

                // function priceFiltersFactory(priceFilters) {
                //     return priceFilters.map(function(price){
                //         return {
                //             value: price.Value,
                //             values: price.Values,
                //             displayText: price.DisplayText,
                //             tagId: price.TagId,
                //             type: price.Type,
                //             order: price.Order
                //         }
                //     });
                // }
                //
                // function genderFiltersFactory(gendersFilters) {
                //     return gendersFilters.map(function (gender) {
                //        return {
                //            tagId: gender.TagId,
                //            type: gender.Type,
                //            value: gender.Value,
                //            values: gender.Values,
                //            displayText: gender.DisplayText,
                //            order: gender.Order
                //        }
                //     });
                // }

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
                $rootScope.productsList = [].concat.apply([], storeProducts);
            }

            function getStoreDataFailed(error) {
                logger.error('XHR Failed for getProducts.' + error.data);
            }
        }

        function fnGetPriceFilters() {
            return [
                {
                    value: '0,25',
                    text: 'up to $25',
                    type: 'budget',
                    minPrice: 0,
                    maxPrice: 25
                },
                {
                    value: '25,50',
                    text: '$25 - $50',
                    type: 'budget',
                    minPrice: 25,
                    maxPrice: 50
                },
                {
                    value: '50,75',
                    text: '$50 - $75',
                    type: 'budget',
                    minPrice: 50,
                    maxPrice: 75
                },
                {
                    value: '75,100',
                    text: '$75 - $100',
                    type: 'budget',
                    minPrice: 75,
                    maxPrice: 100
                },
                {
                    value: '100,1000000',
                    text: '$100+',
                    type: 'budget',
                    minPrice: 100,
                    maxPrice: 1000000
                },
                {
                    value: '0',
                    text: 'All',
                    type: 'budget',
                    minPrice: 0,
                    maxPrice: 1000000
                }
            ];
        }

        function fnGetGenderFilters() {
            return [
                {
                    value: 3,
                    text: 'Boy',
                    type: 'gender'
                },
                {
                    value: 4,
                    text: 'Girl',
                    type: 'gender'
                },
                {
                    value: 0,
                    text: 'Both',
                    type: 'gender'
                }
            ];
        }
    }
})();