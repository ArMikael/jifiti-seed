angular.module('jifitiApp.directives.productCard', [])
    .directive('productCard', function () {
       return {
           restrict: 'E',
           scope: {
             product: '='
           },
           // transclude: false, - Will show/hide elements that added in HTML inside the directive
           // replace: true, - will show/hide in the DOM original directive tag or replace it with elements inside the template
           templateUrl: 'templates/productCard.html',
           controller: function($scope) {
               console.log('contactCard is running');
               //console.log('Directive data: ', $scope.product)
           }
       }
    });