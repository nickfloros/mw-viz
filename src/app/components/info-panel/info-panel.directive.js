require('angular');

module.exports = angular.module('info-panel-module', [
	require('./info-panel.controller').name
	]).directive('infoPanel', [function InfoPanelDirective() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/info-panel.template.html',
        controller: 'infoPanelController',
        scope: {},
        controllerAs: 'ctrl',
        bindToController: true
    };
}]);