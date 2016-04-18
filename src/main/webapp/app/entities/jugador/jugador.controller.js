(function() {
    'use strict';

    angular
        .module('practica7App')
        .controller('JugadorController', JugadorController);

    JugadorController.$inject = ['$scope', '$state', 'Jugador'];

    function JugadorController ($scope, $state, Jugador) {
        var vm = this;
        vm.jugadors = [];
        vm.loadAll = function() {
            Jugador.query(function(result) {
                vm.jugadors = result;
            });
        };

        vm.loadAll();
        
    }
})();
