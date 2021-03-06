'use strict';

//Class_timetables service used for communicating with the class_timetables REST endpoints
angular.module('class_timetables').factory('Class_timetables', ['$resource',
  function ($resource) {
    return {
      tt:  $resource('api/class_timetables/:class_timetableId', {
        class_timetableId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      }),
      teach:  $resource('api/teachers/:teacherId', {
        teacherId: '@_id'
      })
    };  
  }
]);
