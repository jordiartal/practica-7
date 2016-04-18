(function() {
    'use strict';

    angular
        .module('practica7App')
        .controller('EquipoDetailController', EquipoDetailController);

    EquipoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Equipo', 'Jugador'];

    function EquipoDetailController($scope, $rootScope, $stateParams, entity, Equipo, Jugador) {
        var vm = this;
        vm.equipo = entity;
        vm.load = function (id) {
            Equipo.get({id: id}, function(result) {
                vm.equipo = result;
            });
        };
        var unsubscribe = $rootScope.$on('practica7App:equipoUpdate', function(event, result) {
            vm.equipo = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
