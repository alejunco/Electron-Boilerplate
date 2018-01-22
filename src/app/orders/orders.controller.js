(function () {
  'use strict';

  

  angular
    .module('app')
    .controller('OrdersController', OrdersController);

  OrdersController.$inject = ['$log', '$timeout', 'OrdersService', '$mdMedia', '$scope', '$rootScope'];

  function OrdersController($log, $timeout, OrdersService, $mdMedia, $scope, $rootScope) {
    let vm = this;
    let timeout;

    vm.mdMedia = $mdMedia;
    vm.theme = $rootScope.theme;

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

      vm.query = '';
      $timeout(function () {
        $scope.$broadcast('updatedQuery', {
          query: vm.query
        });
      }, 100)

      // angular.element(document).ready(function () {
      //   $scope.$broadcast('updatedQuery', {
      //     query: vm.query
      //   });
      // });

      // OrdersService.pendignOrder(vm.query).then(function (result) {
      //   vm.results = result;
      // });

    }
  }
})();