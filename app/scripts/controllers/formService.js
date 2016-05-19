'use strict';

angular.module('myApp').factory('storage',function(){

	var STORAGE_ID = 'TEST'
	var store = {
		_getLocalStorage: function(){
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]')
		},
		_setLocalStorage: function(formData){
			localStorage.setItem(STORAGE_ID,JSON.stringify(formData))
		},
		get: function(){
			return store._getLocalStorage()
		},
		set: function(formData){
			store._setLocalStorage(formData)
		}
	}
	return store
}).factory('competenceService',['$resource',function($resource){

	var defaultMethod = {
		get: {method:'get',dataType:'json'},
		update: {method:'post'},
		create: {method:'put'}
	}

	var resourceService = function (url,params,method){
		method = angular.extend(defaultMethod,method)
		var resource = $resource(url,params,method)
		resource.prototype.$save = function(){
			if (!this.id){
				return this.$create()
			}else{
				return this.$update()
			}
		}
		return resource
	}

	return resourceService
}])
