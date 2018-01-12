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
    $mdThemingProvider.theme('altTheme')
      .primaryPalette('purple')
    // $mdThemingProvider.theme('altTheme')
    //   .primaryPalette('purple')
    //   .accentPalette('orange', {
    //     'default': '400'
    //   });

    $mdThemingProvider.setDefaultTheme('altTheme');
    // .backgroundPalette('brown');
  }

})();