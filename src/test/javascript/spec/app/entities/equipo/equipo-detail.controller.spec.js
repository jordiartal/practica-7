'use strict';

describe('Controller Tests', function() {

    describe('Equipo Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockEquipo, MockJugador;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockEquipo = jasmine.createSpy('MockEquipo');
            MockJugador = jasmine.createSpy('MockJugador');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Equipo': MockEquipo,
                'Jugador': MockJugador
            };
            createController = function() {
                $injector.get('$controller')("EquipoDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'practica7App:equipoUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
