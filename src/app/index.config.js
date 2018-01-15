(function () {
  'use strict';

  angular
    .module('app')
    .config(config);

  /** @ngInject */
  function config($logProvider, $mdThemingProvider, cfpLoadingBarProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    //angular material
    $mdThemingProvider.theme('altTheme')
      .primaryPalette('green')
      .accentPalette('purple', {
        'default': '400'
      })
      .warnPalette('red')      
      .backgroundPalette('grey');

    $mdThemingProvider.setDefaultTheme('altTheme');

    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.spinnerTemplate =
      ` <div class="overlay">
        <div id="loading-bar-spinner" >
          <div class="spinner-icon"></div>
        </div>
      </div>`;

  }

})();