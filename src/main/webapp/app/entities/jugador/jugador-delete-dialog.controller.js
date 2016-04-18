(function() {
    'use strict';

    angular
        .module('practica7App')
        .controller('JugadorDeleteController',JugadorDeleteController);

    JugadorDeleteController.$inject = ['$uibModalInstance', 'entity', 'Jugador'];

    function JugadorDeleteController($uibModalInstance, entity, Jugador) {
        var vm = this;
        vm.jugador = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Jugador.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
