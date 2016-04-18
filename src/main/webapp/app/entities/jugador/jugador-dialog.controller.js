(function() {
    'use strict';

    angular
        .module('practica7App')
        .controller('JugadorDialogController', JugadorDialogController);

    JugadorDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Jugador', 'Equipo'];

    function JugadorDialogController ($scope, $stateParams, $uibModalInstance, entity, Jugador, Equipo) {
        var vm = this;
        vm.jugador = entity;
        vm.equipos = Equipo.query();
        vm.load = function(id) {
            Jugador.get({id : id}, function(result) {
                vm.jugador = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('practica7App:jugadorUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.jugador.id !== null) {
                Jugador.update(vm.jugador, onSaveSuccess, onSaveError);
            } else {
                Jugador.save(vm.jugador, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.fechaNacimiento = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
