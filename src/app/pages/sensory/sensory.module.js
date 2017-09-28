/**
 * @author msarno
 *
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sensory', [])
    .config(routeConfig)
    .config(chartJsConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('sensory', {
          url: '/sensory',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Sensory',
          sidebarMeta: {
            icon: 'ion-ios-flask-outline',
            order: 100,
          },
        }).state('sensory.list', {
          url: '/list',
          templateUrl: 'app/pages/sensory/sensoryList.html',
          title: 'Listado',
          controller: 'SensoryListCtrl',
          controllerAs: 'vm',
          sidebarMeta: {
            order: 100,
          },
        }).state('sensory.evaluation', {
          url: '/evaluation',
          templateUrl: 'app/pages/sensory/sensory.html',
          title: 'Nueva Evaluación',
          controller: 'SensoryEvaluationCtrl',
          controllerAs: 'vm',
          sidebarMeta: {
            order: 200,
          },
        });
    $urlRouterProvider.when('/sensory', '/sensory/list', '/sensory/evaluation');
  }

  function chartJsConfig(ChartJsProvider, baConfigProvider) {
    var layoutColors = baConfigProvider.colors;
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: [
        layoutColors.primary, layoutColors.danger, layoutColors.warning, layoutColors.success, layoutColors.info, layoutColors.default, layoutColors.primaryDark, layoutColors.successDark, layoutColors.warningLight, layoutColors.successLight, layoutColors.primaryLight],
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2500
      },
      scale: {
        gridLines: {
          color: layoutColors.border
        },
        scaleLabel: {
          fontColor: layoutColors.defaultText
        },
        ticks: {
          beginAtZero: true,
          fontColor: layoutColors.defaultText,
          showLabelBackdrop: false
        }
      }
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      datasetFill: false
    });
    // Configure all radar charts
    ChartJsProvider.setOptions('radar', {
      scale: {
        pointLabels: {
          fontColor: layoutColors.defaultText
        },
        ticks: {
          maxTicksLimit: 5,
          display: false
        }
      }
    });
    // Configure all bar charts
    ChartJsProvider.setOptions('bar', {
      tooltips: {
        enabled: false
      }
    });
  }

})();
