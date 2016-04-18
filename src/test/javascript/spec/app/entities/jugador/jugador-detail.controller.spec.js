'use strict';

describe('Controller Tests', function() {

    describe('Jugador Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockJugador, MockEquipo;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockJugador = jasmine.createSpy('MockJugador');
            MockEquipo = jasmine.createSpy('MockEquipo');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Jugador': MockJugador,
                'Equipo': MockEquipo
            };
            createController = function() {
                $injector.get('$controller')("JugadorDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'practica7App:jugadorUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
