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
        // data: '=',
      },
    });

  OrdersGridController.$inject = ['$log', '$scope', '$mdMedia', '$mdDialog', 'OrdersService'];

  function OrdersGridController($log, $scope, $mdMedia, $mdDialog, OrdersService) {
    let vm = this;
    vm.mdMedia = $mdMedia;
    vm.orderExecuted = false;
    vm.activeCard = '';

    vm.confirmExecuteOrder = confirmExecuteOrder;

    ////////////////

    vm.$onInit = function () {
      $log.info('Running Init...');
    };
    vm.$onChanges = function (changesObj) {
      $log.info('Running Changes...');
    };
    vm.$onDestroy = function () {
      $log.info('Running Destroy...');
    };

    function executeOrder(id) {
      OrdersService.executeOrder(id)
        .then(function (data) {
          vm.tikcet = data;
          vm.orderExecuted = true;
          vm.activeCard = 'order-success'
          $log.info(data);
        }, function (error) {
          vm.activeCard = 'order-error'
        })
    }

    function confirmExecuteOrder(ev, id) {
      // Appending dialog to document.body to cover sidenav in docs app
      let confirm = $mdDialog.confirm()
        .title('Confirm Execute')
        .textContent('Are you sure you want to execute this order?')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Yes')
        .cancel('No, Cancel');

      $mdDialog.show(confirm).then(function () {
        executeOrder(id);
      }, function () {
        $log.info('Canceled order execution.');
      });
    };

    $scope.$on('updatedQuery', function (event, data) {
      vm.orderExecuted = false;
      vm.tikcet = null;
      vm.query = data.query;
      vm.data = [];
      if (vm.query && vm.query !== '') {
        $log.info('Went to search..."' + vm.query + '"');
        OrdersService.pendignOrder(vm.query).then(function (result) {
          vm.data = result;
          if (vm.data.length > 0)
            vm.activeCard = 'order';
          else
            vm.activeCard = 'order-not-found';
        });
      } else
      vm.activeCard = 'order-query-empty'
    });
  }
})();