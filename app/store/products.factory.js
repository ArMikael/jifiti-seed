(function () {
    'use strict';

    angular.module('jifitiApp')
        .factory('productsFactory', productsFactory);

    //productsFactory.$inject = ['$http'];

    function productsFactory($http) {
        console.log('FACTORY');

        return {
            getProducts: getProducts
        };

        function getProducts() {
            return $http.get('./data/products.json')
                .then(getProductsComplete)
                .catch(getProductsFailed);

            function getProductsComplete(response) {
                console.log('data received', response.data);
                return response.data;
            }

            function getProductsFailed(error) {
                console.log('data not received');

                logger.error('XHR Failed for getProducts.' + error.data);
            }
        }
    }
})();