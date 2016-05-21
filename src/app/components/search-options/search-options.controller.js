require('angular');
var _=require('lodash');

module.exports=angular.module('search-options-controller-module',[
		require('../../services/search.service').name,
	]).controller('searchOptionsController',['SearchService', function SearchOptionsController(SearchService){
		var ctrl = this,
			_options = ['Road', 'Junctions'];

		_.extend(ctrl,{
			search: function() {

			},
			options : function optionsGetter() {
				return _options;
			},
			modelOptions : {
				getterSetter: true
			}
		})

	}]);