var _=require('lodash');
require('angular');

module.exports = angular.module('mapping-module', [
    require('./mapping.controller').name
]).directive('mapView', [function mappingDirectrive() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/mapping.template.html',
        controller: 'MappingController',
        controllerAs: 'ctrl',
        bindToController: true
    };
}]);