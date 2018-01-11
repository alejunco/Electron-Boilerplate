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
    $mdThemingProvider.theme('default')
      .primaryPalette('blue', {
        'default': '400', 
      })
      .accentPalette('deep-orange', {
        'default': '400' // use shade 200 for default, and keep all other shades the same
      });
      // .backgroundPalette('brown');
  }

})();