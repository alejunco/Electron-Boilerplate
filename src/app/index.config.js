(function () {
  'use strict';

  angular
    .module('app')
    .config(config);

  /** @ngInject */
  function config($logProvider, $mdThemingProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    //angular material
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
  }

})();