angular.module('jifitiApp.directives.productCard', [])
    .directive('productCard', function () {
       return {
           restrict: 'E',
           scope: {
             product: '='
           },
           templateUrl: 'templates/productCard.html',
           // transclude: false, - Will show/hide elements that added in HTML inside the directive
           // replace: true, - will show/hide in the DOM original directive tag or replace it with elements inside the template
           // Use link when we want to watch for DOM events. When you want to add behavior to it when users interacts with directive.
           link: function (scope, element, attrs) {
                element.click(function () {
                    console.log('Click');
                });
           },
           controller: function($scope) {
               console.log('contactCard is running');
               //console.log('Directive data: ', $scope.product)
           }
       }
    });