(function () {
    'use strict';

    angular
        .module('app')
        .factory('OrdersService', OrdersService);

    OrdersService.$inject = ['$q', '$log', '$http', 'BsApi'];

    function OrdersService($q, $log, $http, BsApi) {
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
            pendignOrder: pendignOrder,
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

        function pendignOrder(id) {
            return $http.post(BsApi.url + 'orders/pending/' + id, {
                "MerchantId": 834,
                "MerchantPassword": "m5494"
            }).then(function (response) {

                return [response.data];
            }, function (error) {
                return [];
                // $log.error(error);
            })
        }

        function executeOrder(id) {
            var deferred = $q.defer();

            // deferred.reject({
            //     ErrorCode: 500
            // });

            deferred.resolve({
                "Ticket": "^BLACKSTONE TEST MERCHANT DBA  (T & B)^11600 NW 34TH ST^MID:834^(305) 639-9590^--------------------------^^Product : AT&T PREPAID RTR^Amount  : $10.00^Tax     : $0.70^Fee     : $1.00^Total   : $11.70^Date    : 1/10/2018 11:08^--------------------------^^Phone Number:7658990632^^Authorization Number:12345^^Reference Number:42989307^^^--------------------------^^^^^^^"
            });

            return deferred.promise;
            // return $http.post(BsApi.url + 'orders/execute/' + id, {
            //     "MerchantId": 834,
            //     "MerchantPassword": "m5494",
            //     "TerminalId": 10000642
            // }).then(function (response) {
            //     return response.data;
            // })
        }
    }
})();