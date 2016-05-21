require('angular');

module.exports = angular.module('nav-bar-module', [
    require('../search-options/search-options.directive').name,
	require('./nav-bar.controller').name
	]).directive('navBar', [function NavBarDirective() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/nav-bar.template.html',
        controller: 'navBarController',
        scope: {},
        controllerAs: 'ctrl',
        bindToController: true
    };
}]);