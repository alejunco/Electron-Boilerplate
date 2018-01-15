(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$log', '$state'];

    function HomeController($log, $state) {
        let vm = this;
        vm.title = 'Demo App';
        vm.goToState = goToState;

        activate();

        ////////////////

        function activate() {}

        function goToState(stateName) {
            $state.go(stateName);
        }
    }
})();