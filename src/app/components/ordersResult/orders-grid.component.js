(function () {
  'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('app')
    .component('ordersGrid', {
      templateUrl: 'app/components/ordersResult/orders-grid.html',
      controller: OrdersGridController,
      controllerAs: 'vm',
      bindings: {
        data: '=',
      },
    });

  OrdersGridController.$inject = ['$log'];

  function OrdersGridController($log) {
    var vm = this;

    ////////////////

    vm.$onInit = function () {$log.info('Running Init...');};
    vm.$onChanges = function (changesObj) {$log.info('Running Changes...');};
    vm.$onDestroy = function () {$log.info('Running Destroy...');};
  }
})();
