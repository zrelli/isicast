'use strict';

angular.module('core').controller('DocsController',['$scope','$stateParams','$location','Docs',
function($scope,$stateParams, $location, Docs) {
     // Find a list of Docs
  $scope.find = function() {
    $scope.docs = Docs.query();
  };
  $scope.currentPage = 1;
  $scope.pageSize =10;
  $scope.offset = 0;
  // Page changed handle
  $scope.pageChanged = function() {
    $scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
  };
 
}
]);
