'use strict';

/**
 * @ngdoc overview
 * @name angularTestApp
 * @description
 * # angularTestApp
 *
 * Main module of the application.
 */
 angular.module('myApp',['ngRoute'])

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



 .config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    controller : 'myFormController',
    templateUrl : 'views/test-index.html'
  })
  .when('/test', {
    templateUrl : 'test-template.html'
  })
  .when('/detail/:id', {
    controller : 'detailCtrl',
    templateUrl : 'views/test-detail.html'
  })
  .otherwise({
    redirectTo : '/'
  });
}]);