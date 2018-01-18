(function () {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      // .state('home', {
      //   url: '/',
      //   templateUrl: 'app/home/home.html',
      //   controller: 'HomeController',
      //   controllerAs: 'vm'
      // })
      .state('orders', {
        url: '/orders',
        templateUrl: 'app/orders/orders.html',
        controller: 'OrdersController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/orders');
  }

})();