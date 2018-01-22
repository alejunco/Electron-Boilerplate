(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$log', '$state', '$scope', '$rootScope', 'ElectronService'];

    function HomeController($log, $state, $scope,$rootScope,ElectronService) {
        let vm = this;
        vm.title = 'Demo App';
        vm.goToState = goToState;
        vm.getMacAddress = getMacAddress;
        vm.macAdress = "";

        vm.xyz = "";
        vm.getXYZ = getXYZ;


        vm.theme = $rootScope.theme;

        activate();

        ////////////////
        function activate() {}

        function goToState(stateName) {
            $state.go(stateName);
        }

        function getXYZ()
        {
            ElectronService.getXYZ().then(x=>
            {
                vm.xyz = x;
            });
        }

        function getMacAddress()
        {
            ElectronService.getMacAddress().then(macAdress =>
            {
                vm.macAdress = macAdress;
            });
        }

        $scope.$watch('vm.theme', function () {
            $rootScope.theme = vm.theme;
            console.log('updated theme');
        })
    }
})();