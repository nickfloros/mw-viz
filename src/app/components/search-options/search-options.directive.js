require('angular');

module.exports=angular.module('search-options-module',[
	require('./search-options.controller').name
]).directive('searchOptions',[function SearchOptionsDirective(){
	return {
		restrict:'E',
		replace:true,
		templateUrl:'partials/search-options.template.html',
		controller:'searchOptionsController',
		scope : {},
		controllerAs : 'ctrl',
		bindToController:true,
	};
}]);