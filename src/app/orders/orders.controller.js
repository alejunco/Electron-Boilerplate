(function () {
  'use strict';

  angular
    .module('app')
    .controller('OrdersController', OrdersController);

  OrdersController.$inject = ['$log', '$timeout', 'OrdersService', '$mdMedia', '$scope'];

  function OrdersController($log, $timeout, OrdersService, $mdMedia, $scope) {
    var vm = this;
    var timeout;

    vm.mdMedia = $mdMedia;

    vm.results = [];

    vm.keyup = function () {
      
        timeout = $timeout(function () {
          
          $scope.$broadcast('updatedQuery', {
            query: vm.query
          });
          // OrdersService.pendignOrder(vm.query).then(function (result) {
          //   vm.results = result;
          // });
        }, 1000);
      
    }

    vm.keydown = function () {
      $timeout.cancel(timeout);
    }

    activate();

    ////////////////

    function activate() {
      vm.query = '1188110';
      $timeout(function () {
        $scope.$broadcast('updatedQuery', {
          query: vm.query
        });
      }, 1)

      // OrdersService.pendignOrder(vm.query).then(function (result) {
      //   vm.results = result;
      // });

    }
  }
})();