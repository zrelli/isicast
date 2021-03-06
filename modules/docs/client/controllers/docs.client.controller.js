'use strict';

// Docs controller
angular.module('docs').controller('DocsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Docs', 'Docs2',function ($scope, $stateParams, $location, Authentication, Docs, Docs2) {
  $scope.authentication = Authentication;
    // pagination
  $scope.currentPage = 1;
  $scope.pageSize =10;
  $scope.offset = 0;
  // Page changed handle
  $scope.pageChanged = function() {
    $scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
  };
    
  // picker stuff
  $scope.files = [];
  $scope.onLoaded = function () {
    console.log('Google Picker loaded!');
  }; 
  $scope.onPicked = function (docs) {
    angular.forEach(docs, function (file, index) {
      $scope.files.push(file);
    });
  };
  $scope.onCancel = function () {
    console.log('Google picker close/cancel!');
  };    
    
    // Create new Doc
  $scope.create = function (isValid) {
    $scope.error = null;

    if (!isValid) {
      $scope.$broadcast('show-errors-check-validity', 'docForm');

      return false;
    }

      // Create new Doc object
    var doc = new Docs({
      title: this.title,
      content: this.content,
      prot: this.prot,
      main_doc:[],
      attachment:[]
      	
    });
    angular.forEach($scope.files, function(file,index){
      if(index === 0){
        doc.main_doc.push(file);
      }
      else {	  
        doc.attachment.push(file);
      }
    });  
      // Redirect after save
    doc.$save(function (response) {
      $location.path('docs/' + response._id);

        // Clear form fields
      $scope.title = '';
      $scope.content = '';
      $scope.prot = null;
      $scope.main_doc = [];
      $scope.attachment = [];
    }, function (errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };

    // Remove existing Doc
  $scope.remove = function (doc) {
    if (doc) {
      doc.$remove();

      for (var i in $scope.docs) {
        if ($scope.docs[i] === doc) {
          $scope.docs.splice(i, 1);
        }
      }
    } else {
      $scope.doc.$remove(function () {
        $location.path('docs');
      });
    }
  };

    // Update existing Doc
  $scope.update = function (isValid) {
    $scope.error = null;

    if (!isValid) {
      $scope.$broadcast('show-errors-check-validity', 'docForm');

      return false;
    }

    var doc = $scope.doc;

    doc.$update(function () {
      $location.path('docs/' + doc._id);
    }, function (errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };

    // Find a list of Docs
  $scope.find = function () {
    $scope.docs = Docs.query();
  };

  // find docs between two dates
  $scope.findWithParams = function() {
    $scope.docs = Docs2.query({
      param1: $scope.endDate,
      param2: $scope.startDate
    });
  };
    // Find existing Doc
  $scope.findOne = function () {
    $scope.doc = Docs.get({
      docId: $stateParams.docId
    });	
  };
        // Search for documents
  $scope.docSearch = function(doc) {
    $location.path('docs/' + doc._id);
  };
}
]);
