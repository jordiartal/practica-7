(function() {
    'use strict';

    angular
        .module('practica7App')
        .controller('EquipoDeleteController',EquipoDeleteController);

    EquipoDeleteController.$inject = ['$uibModalInstance', 'entity', 'Equipo'];

    function EquipoDeleteController($uibModalInstance, entity, Equipo) {
        var vm = this;
        vm.equipo = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Equipo.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
