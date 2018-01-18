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
    $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .accentPalette('purple', {
        'default': '400'
      })
      .warnPalette('red')
      .backgroundPalette('grey');

    $mdThemingProvider.theme('lime')
      .primaryPalette('lime')
      .accentPalette('orange')
      .warnPalette('blue');

    $mdThemingProvider.theme('indigo')
      .primaryPalette('indigo')
      .accentPalette('pink');

    $mdThemingProvider.setDefaultTheme('default');
    $mdThemingProvider.alwaysWatchTheme(true);

    cfpLoadingBarProvider.latencyThreshold = 500;
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