require('angular');

module.exports = angular.module('nav-bar-module', [
	require('./nav-bar.controller').name
	]).directive('infoPanel', [function InfoPanelDirective() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/nav-bar-panel.template.html',
        controller: 'navBarController',
        scope: {},
        controllerAs: 'ctrl',
        bindToController: true
    };
}]);