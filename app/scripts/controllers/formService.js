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
})