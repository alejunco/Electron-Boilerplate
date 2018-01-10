(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$log', '$state'];

    function HomeController($log, $state) {
        var vm = this;
        vm.title = 'Hello from AngularJS Home Controller';
        vm.goToState = goToState;

        activate();

        ////////////////

        function activate() {}

        function goToState(stateName) {
            $state.go(stateName);
        }
    }
})();