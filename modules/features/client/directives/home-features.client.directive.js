'use strict';

angular.module('features').directive('homeFeatures', [function() {
  return {
    templateUrl: 'modules/features/client/views/list-features-template.html',
    restrict: 'E',
    transclude:true,
    link: function postLink(scope, element, attrs) {
    }
  };
}
]);
