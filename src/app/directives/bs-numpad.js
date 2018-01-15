(function () {
    'use strict';

    angular
        .module('app')
        .directive('bsNumpad', bsNumpad);

    bsNumpad.$inject = ['$log'];

    function bsNumpad($log) {
        // Usage:
        //
        // Creates:
        //
        let directive = {
            bindToController: true,
            controller: BsNumpadController,
            controllerAs: 'vm',
            templateUrl: 'app/directives/bs-numpad.html',
            link: link,
            restrict: 'E',
            scope: {
                bsModel: '=',
                bsKeydown: '=',
                bsKeyup: '='
            }
        };
        return directive;

        function link(scope, element, attrs, vm) {}
    }
    /* @ngInject */
    function BsNumpadController($timeout) {
        let vm = this;
        vm.keys = [
            '7', '8', '9', 
            '4', '5', '6', 
            '1', '2', '3', 
            'Clear', '0', 'Delete'
        ];

        vm.mouseup = mouseup;
        vm.mousedown = mousedown;

        function mouseup(event, key) {
            if (!vm.bsModel) {
                vm.bsModel = '';
            }

            switch (key) {
                case 'Delete':
                    if (vm.bsModel.length > 0)
                        vm.bsModel = spliceString(vm.bsModel, vm.bsModel.length - 1, 1);
                    break;
                case 'Clear':
                    vm.bsModel = '';
                    break;
                case 'Enter':
                    break;
                case '.':
                    if (vm.bsModel.indexOf('.') === -1)
                        vm.bsModel += '.';
                    break;
                default:
                    vm.bsModel += key;
                    break;
            }

            $timeout(vm.bsKeyup,50)
        }

        function mousedown(event, key) {
            vm.bsKeydown();
        }
    }

    function spliceString(str, index, count) {
        let ar = str.split('');
        ar.splice(index, count);
        return ar.join('');
    }

    function TryParseInt(str, defaultValue) {
        let retValue = defaultValue;
        if (str !== null) {
            if (str.length > 0) {
                if (!isNaN(str)) {
                    retValue = parseInt(str);
                }
            }
        }
        return retValue;
    }
})();