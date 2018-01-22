(function() {
    'use strict';

    const ipc = require("electron").ipcRenderer;
    const {
        events
    } = require("./../src/logic/constant");

    angular
        .module('app')
        .factory('ElectronService', ElectronService);

    ElectronService.$inject = ['$q', '$log'];
    function ElectronService($q, $log) {

        function getMacAddress()
        {
            let deferred = $q.defer();            
 
            ipc.once(events.response.macAddress,  (evt, macAddress)=>{
                deferred.resolve(macAddress)
            });
            
            ipc.send(events.request.macAddress);

            return deferred.promise;
        }

        function getXYZ()
        {
            let deferred = $q.defer();

            let task = {
                method:"Xyz",
                arg:"Hello Main",
                callback:"XyzResponse"
            }

            ipc.once(task.callback, (evt, res)=>
            {
                deferred.resolve(res);
            });
            
            ipc.send('remote-exec', task);

            return deferred.promise;
        }

        return {
            getMacAddress: getMacAddress,
            getXYZ: getXYZ
        };
    }
})();