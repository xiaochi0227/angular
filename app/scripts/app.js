'use strict';

/**
 * @ngdoc overview
 * @name angularTestApp
 * @description
 * # angularTestApp
 *
 * Main module of the application.
 */
 angular.module('myApp',['ngRoute','ngResource'])

 .directive('hello',function(){
  return {
    restrict: 'E',
    template: '<h1>Hello Directive!<span ng-transclude></span></h1>',
      replace: false,//替换标签
      transclude: true //
    }
  })

 .directive('expander',function(){
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,

    template: '<div>'+
    '<div class="title" ng-click="toggle()" >{{title}}</div>'+
    '<div class="body" ng-show="showMe" ng-transclude></div>'+
    '</div>',
    link: function(scope,element,atts){
      scope.showMe = false;
      scope.toggle = function(){
        scope.showMe = !scope.showMe
      }

    }
  }
})
 .controller('directiveCtrl',function($scope){
  $scope.title = '点击展开'
  $scope.text = 'body内容'

})

 .directive('accordion',function(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {},
    template: '<div class="accordion" ng-transclude></div>'  ,
    controller: function(){
      var expanders = []
      this.gotOpened = function(selectedExpander){
        angular.forEach(expanders,function(expander){
          if(selectedExpander!=expander){
            expander.showMe = false
          }
        })
      }
      this.addExpander = function(expander){
        expanders.push(expander)
      }
    }

  }

})
 .directive('myDirective',function(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    require: '^?accordion',
    template: '<div>'+
              '<div class="title" ng-click="toggle()">{{expander.title}}</div>'+
              '<div class="body" ng-show="showMe" ng-transclude></div>'+
              '</div>',
    link: function(scope,element,attrs,accordionController){
        scope.showMe = false;
        accordionController.addExpander(scope)
        scope.toggle = function(){
          scope.showMe = !scope.showMe
          accordionController.gotOpened(scope)
        }
    }
  }
 })

 .controller('sumCtrl',function($scope){
  $scope.expanders = [{
        title : 'Click me to expand',
        text : 'Hi there folks, I am the content that was hidden but is now shown.'
    }, {
        title : 'Click this',
        text : 'I am even better text than you have seen previously'
    }, {
        title : 'Test',
        text : 'test'
    }];
}) 

.directive('tableDirective',['$compile',function($compile){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      name:"@name",
      age:'=',
      changeName: '&changeName'
    },
    templateUrl: 'views/deTable.html',
    link: function(scope,iElement,iAttrs){
      console.log('link')
    }
    // ,
    // template: function(iElement,iAttrs){
    //   return '<div>test</div>'
    // },
    // compile: function(iElement,iAttrs){
    //   iElement.append('<div>xiaochi</div>')
    //   return function(scope,iElement,iAttrs){
    //     console.log('compile return link')
    //     var template="<div>name:{{name}}</div>"
    //     iElement.append($compile(template)(scope))
    //   }
    // }
  }
 }])


.controller('competenceCtrl',['$scope','competenceService','$http','$timeout',function($scope,competenceService,$http,$timeout){
   
   $scope.name="test scope"
   $scope.age="21"
   $scope.changeName = function(){
    $scope.name='xiaochi'
   }
  var p = $timeout(function(){console.log('haha')}, 500);
  p.then(function(){console.log('x')});

   var result = competenceService('../../test.json')
   result.get().$promise.then(function(d){
      $scope.result = d.result
   })

   // $http({
   //    method:'GET',
   //    url:'/test.json',
   //    dataType: 'json'
   //  }).success(function(res){
   //    console.log(res)
   //  }).error(function(res){
   //    console.log('error')
   //    console.log(res)

   //  })

}])


 .config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    controller : 'myFormController',
    templateUrl : 'views/test-index.html'
  })
  .when('/test', {
    templateUrl : 'test-template.html'
  })
  .when('/competence', {
    controller: 'competenceCtrl',
    templateUrl : 'competence.html'
  })
  .when('/detail/:id', {
    controller : 'detailCtrl',
    templateUrl : 'views/test-detail.html'
  })
  .otherwise({
    redirectTo : '/'
  });
}]);