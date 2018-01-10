(function () {
    'use strict';

    angular
        .module('app')
        .factory('OrdersService', OrdersService);

    OrdersService.$inject = ['$q'];

    function OrdersService($q) {
        var orders = [{
            mid: 5294,
            id: 6134
        }, {
            mid: 8366,
            id: 5442
        }, {
            mid: 2133,
            id: 6114
        }, {
            mid: 8854,
            id: 8731
        }, {
            mid: 9845,
            id: 6419
        }]
        var service = {
            searchOrder: searchOrder,
            executeOrder: executeOrder
        };

        return service;

        ////////////////
        function searchOrder(query) {
            var deferred = $q.defer();

            var myResult = [];

            for (let index = 0; index < orders.length; index++) {

                if (orders[index].id.toString().indexOf(query) > -1)
                    myResult.push(orders[index]);
            }

            deferred.resolve(myResult);

            return deferred.promise;
        }

        function executeOrder() {
            return true;
        }
    }
})();