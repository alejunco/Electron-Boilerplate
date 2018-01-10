(function () {
  'use strict';

  angular
    .module('app')
    .controller('OrdersController', OrdersController);

  OrdersController.$inject = ['$log', '$timeout'];

  function OrdersController($log, $timeout) {
    var vm = this;
    var timeout;
    vm.getKeyClass = getKeyClass;
    //   vm.keys = [
    //     ['Clear', '-', 'Delete'],
    //     ['7',      '8',         '9'],
    //     ['4',      '5',         '6'],
    //     ['1',      '2',         '3'],
    //     ['0',      '.',     'Enter']
    // ];

    vm.keys = [
      'Clear', '-', 'Delete', '7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', 'Enter'
    ];

    // vm.keys = [
    //   [
    //     ["`", "~"],
    //     ["1", "!", "\u00a1", "\u00b9"],
    //     ["2", "@", "\u00b2"],
    //     ["3", "#", "\u00b3"],
    //     ["4", "$", "\u00a4", "\u00a3"],
    //     ["5", "%", "\u20ac"],
    //     ["6", "^", "\u00bc"],
    //     ["7", "&", "\u00bd"],
    //     ["8", "*", "\u00be"],
    //     ["9", "(", "\u2018"],
    //     ["0", ")", "\u2019"],
    //     ["-", "_", "\u00a5"],
    //     ["=", "+", "\u00d7", "\u00f7"],
    //     ["Bksp", "Bksp"]
    //   ],
    //   [
    //     ["Tab", "Tab"],
    //     ["q", "Q", "\u00e4", "\u00c4"],
    //     ["w", "W", "\u00e5", "\u00c5"],
    //     ["e", "E", "\u00e9", "\u00c9"],
    //     ["r", "R", "\u00ae"],
    //     ["t", "T", "\u00fe", "\u00de"],
    //     ["y", "Y", "\u00fc", "\u00dc"],
    //     ["u", "U", "\u00fa", "\u00da"],
    //     ["i", "I", "\u00ed", "\u00cd"],
    //     ["o", "O", "\u00f3", "\u00d3"],
    //     ["p", "P", "\u00f6", "\u00d6"],
    //     ["[", "{", "\u00ab"],
    //     ["]", "}", "\u00bb"],
    //     ["\\", "|", "\u00ac", "\u00a6"]
    //   ],
    //   [
    //     ["Caps", "Caps"],
    //     ["a", "A", "\u00e1", "\u00c1"],
    //     ["s", "S", "\u00df", "\u00a7"],
    //     ["d", "D", "\u00f0", "\u00d0"],
    //     ["f", "F"],
    //     ["g", "G"],
    //     ["h", "H"],
    //     ["j", "J"],
    //     ["k", "K"],
    //     ["l", "L", "\u00f8", "\u00d8"],
    //     [";", ":", "\u00b6", "\u00b0"],
    //     ["'", '"', "\u00b4", "\u00a8"],
    //     ["Enter", "Enter"]
    //   ],
    //   [
    //     ["Shift", "Shift"],
    //     ["z", "Z", "\u00e6", "\u00c6"],
    //     ["x", "X"],
    //     ["c", "C", "\u00a9", "\u00a2"],
    //     ["v", "V"],
    //     ["b", "B"],
    //     ["n", "N", "\u00f1", "\u00d1"],
    //     ["m", "M", "\u00b5"],
    //     [",", "<", "\u00e7", "\u00c7"],
    //     [".", ">"],
    //     ["/", "?", "\u00bf"],
    //     ["Shift", "Shift"]
    //   ],
    //   [
    //     [" ", " ", " ", " "],
    //     ["Alt", "Alt"]
    //   ]
    // ]

    function getKeyClass(key) {
      var k = (key[0] || ' ').toLowerCase();
      var keys = ['bksp', 'tab', 'caps', 'enter', 'shift', 'alt', 'altgr', 'altlk'];

      // space bar
      if (k == ' ') {
        k = 'space';
      }
      // special key
      else if (keys.indexOf(k) < 0) {
        k = 'char';
      }
      // spacer helper element
      else if (k == 'spacer') {
        return k;
      }

      return 'key-' + k;
    };

    var triggerKey = function ($event, key) {
      $event.preventDefault();

      switch (key) {
        case "Caps":
          $scope.capsLocked = !$scope.capsLocked;
          $scope.caps = false;
          break;

        case "Shift":
          $scope.caps = !$scope.caps;
          break;

        case "Alt":
        case "AltGr":
        case "AltLk":
          // modify input, visualize
          //self.VKI_modify(type);
          break;

        case "Tab":

          // cycle through elements
          // or insert \t tab
          //if (self.VKI_activeTab) {
          //    if (self.VKI_target.form) {
          //        var target = self.VKI_target, elems = target.form.elements;
          //        self.VKI_close(false);
          //        for (var z = 0, me = false, j = -1; z < elems.length; z++) {
          //            if (j == -1 && elems[z].getAttribute("VKI_attached")) j = z;
          //            if (me) {
          //                if (self.VKI_activeTab == 1 && elems[z]) break;
          //                if (elems[z].getAttribute("VKI_attached")) break;
          //            } else if (elems[z] == target) me = true;
          //        }
          //        if (z == elems.length) z = Math.max(j, 0);
          //        if (elems[z].getAttribute("VKI_attached")) {
          //            self.VKI_show(elems[z]);
          //        } else elems[z].focus();
          //    } else self.VKI_target.focus();
          //} else self.VKI_insert("\t");
          //return false;

          $mdKeyboard.currentModel.$setViewValue(($mdKeyboard.currentModel.$viewValue || '') + "\t");
          $mdKeyboard.currentModel.$validate();
          $mdKeyboard.currentModel.$render();

          break;

        case "Bksp":
          $mdKeyboard.currentModel.$setViewValue(($mdKeyboard.currentModel.$viewValue || '').slice(0, -1));
          $mdKeyboard.currentModel.$validate();
          $mdKeyboard.currentModel.$render();

          break;

        case "Enter":
          if (element[0].nodeName.toUpperCase() != 'TEXTAREA') {
            $timeout(function () {
              angular.element(element[0].form).triggerHandler('submit');
            });
          } else {
            $mdKeyboard.currentModel.$setViewValue(($mdKeyboard.currentModel.$viewValue || '') + "\n");
            $mdKeyboard.currentModel.$validate();
            $mdKeyboard.currentModel.$render();
          }

          break;

        default:
          $mdKeyboard.currentModel.$setViewValue(($mdKeyboard.currentModel.$viewValue || '') + key[0]);
          $mdKeyboard.currentModel.$validate();
          $mdKeyboard.currentModel.$render();

          $scope.caps = false;
      }
    };

    vm.results = [];

    vm.keyup = function () {
      timeout = $timeout(vm.search, 1000);
    }

    vm.keydown = function () {
      $timeout.cancel(timeout);
    }

    vm.search = function () {
      $timeout.cancel(timeout);
      if (vm.query) {
        $log.info('Went to search..."' + vm.query + '"');
        $timeout(function () {
          vm.results.push(vm.query);
        }, 100);
      }
    }


    activate();

    ////////////////

    function activate() {}
  }
})();