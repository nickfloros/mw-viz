require('angular');

var ui_bootstrap = require('angular-ui-bootstrap'),
	ui_router = require('angular-ui-router'),
	ui_loading_bar = require('angular-loading-bar');

angular.module('road-mapper', [
	ui_bootstrap,
	ui_router,
	ui_loading_bar,

	// routes 
	require('./routes/home/home.route').name,
	require('./routes/link/link.route').name,

	// directives ..
	require('./components/mapping/mapping.directive').name,
	require('./components/info-panel/info-panel.directive').name,
]).config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeSpinner = false;
}]);