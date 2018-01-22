(function () {
  'use strict';

  const ipc = require('electron').ipcRenderer;


  angular
    .module('app')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    // ipc.on("deviceIdentifier", (evt, macAddress)=>{
    //   debugger;
      
    // });
    $log.debug('runBlock end');
  }

})();