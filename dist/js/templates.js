angular.module('road-mapper').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('partials/info-panel.template.html',
    "<div id=\"info-panel\" ng-show=\"ctrl.isOpen()\"> <span class=\"label label-default\">Select road</span><div ui-view=\"info\" class=\"fullHeight\"> <select ng-model=\"ctrl.roadObj\" ng-model-options=\"ctrl.modelOptions\" ng-options=\"road.name for road in ctrl.roads()\"></select></div></div>"
  );


  $templateCache.put('partials/mapping.template.html',
    "<div class=\"mapWrapper\"><div id=\"gmap\" class=\"map\"></div></div>"
  );

}]);
