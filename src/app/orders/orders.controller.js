(function () {
  'use strict';

  angular
    .module('app')
    .controller('OrdersController', OrdersController);

  OrdersController.$inject = ['$log', '$timeout', 'OrdersService', '$mdMedia'];

  function OrdersController($log, $timeout, OrdersService, $mdMedia) {
    var vm = this;
    vm.mdMedia = $mdMedia;
    // vm.query = '';
    var timeout;

    vm.results = [];

    vm.keyup = function () {
      if (vm.query && vm.query !== '') {
        timeout = $timeout(function () {
          $log.info('Went to search..."' + vm.query + '"');
          OrdersService.searchOrder(vm.query).then(function (result) {
            vm.results = result;
          });
        }, 1000);
      }
    }

    vm.keydown = function () {
      $timeout.cancel(timeout);
    }

    // vm.search = function () {
    //   $timeout.cancel(timeout);
    //   if (vm.query) {
    //     $log.info('Went to search..."' + vm.query + '"');
    //     $timeout(function () {
    //       vm.results.push(vm.query);
    //     }, 100);
    //   }
    // }


    activate();

    ////////////////

    function activate() {}
  }
})();