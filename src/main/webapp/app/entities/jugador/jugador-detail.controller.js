(function() {
    'use strict';

    angular
        .module('practica7App')
        .controller('JugadorDetailController', JugadorDetailController);

    JugadorDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Jugador', 'Equipo'];

    function JugadorDetailController($scope, $rootScope, $stateParams, entity, Jugador, Equipo) {
        var vm = this;
        vm.jugador = entity;
        vm.load = function (id) {
            Jugador.get({id: id}, function(result) {
                vm.jugador = result;
            });
        };
        var unsubscribe = $rootScope.$on('practica7App:jugadorUpdate', function(event, result) {
            vm.jugador = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
