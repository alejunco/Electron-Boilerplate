(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$log', '$state', '$scope', '$rootScope'];

    function HomeController($log, $state, $scope,$rootScope) {
        let vm = this;
        vm.title = 'Demo App';
        vm.goToState = goToState;

        vm.theme = $rootScope.theme;

        activate();

        ////////////////

        function activate() {}

        function goToState(stateName) {
            $state.go(stateName);
        }

        $scope.$watch('vm.theme', function () {
            $rootScope.theme = vm.theme;
            console.log('updated theme');
        })
    }
})();