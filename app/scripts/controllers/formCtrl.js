'use strict';

angular.module('myApp').controller('myFormController',function($rootScope,$scope,storage,$location){

	$scope.users = storage.get() || []

	$scope.editIndex = -1

	$rootScope.goto = function(_url,_param){
		$location.path(_url)
	}

	$scope.edit = function(index){
		var user = $scope.users[index]
		$scope.user = {
			email : user.email,
			password: user.password
		}
		$scope.editFlag = index
	}

	$scope.reset = function(){
		$scope.user.email = ''
		$scope.user.password = ''
	}

	$scope.remove = function(index){
		$scope.users.splice(index,1)
		storage.set($scope.users)
	}

	$scope.submit = function(){
		var data = {
			email: $scope.user.email.trim(),
			password: $scope.user.password
		}

		console.log('test')
		var users = storage.get()

		if($scope.editFlag>-1){
			users[$scope.editFlag] = data
		}else{
			users.push(data)
		}
		
		storage.set(users)
		$scope.users = users
		$scope.editFlag = -1

		$scope.reset()

		console.log($scope.users)
	}

})



.controller('detailCtrl',function($scope,storage,$routeParams){
	$scope.id = $routeParams.id
	$scope.user = storage.get()[$scope.id]

<<<<<<< HEAD
})
=======
})

>>>>>>> master
