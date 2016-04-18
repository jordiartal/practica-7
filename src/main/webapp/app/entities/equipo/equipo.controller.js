(function() {
    'use strict';

    angular
        .module('practica7App')
        .controller('EquipoController', EquipoController);

    EquipoController.$inject = ['$scope', '$state', 'Equipo'];

    function EquipoController ($scope, $state, Equipo) {
        var vm = this;
        vm.equipos = [];
        vm.loadAll = function() {
            Equipo.query(function(result) {
                vm.equipos = result;
            });
        };

        vm.loadAll();
        
    }
})();
