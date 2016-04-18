(function() {
    'use strict';

    angular
        .module('practica7App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('jugador', {
            parent: 'entity',
            url: '/jugador',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'practica7App.jugador.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/jugador/jugadors.html',
                    controller: 'JugadorController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('jugador');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('jugador-detail', {
            parent: 'entity',
            url: '/jugador/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'practica7App.jugador.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/jugador/jugador-detail.html',
                    controller: 'JugadorDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('jugador');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Jugador', function($stateParams, Jugador) {
                    return Jugador.get({id : $stateParams.id});
                }]
            }
        })
        .state('jugador.new', {
            parent: 'jugador',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/jugador/jugador-dialog.html',
                    controller: 'JugadorDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nombre: null,
                                fechaNacimiento: null,
                                posicionCampo: null,
                                canastasTotales: null,
                                rebotesTotales: null,
                                asistenciasTotales: null,
                                faltasTotales: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('jugador', null, { reload: true });
                }, function() {
                    $state.go('jugador');
                });
            }]
        })
        .state('jugador.edit', {
            parent: 'jugador',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/jugador/jugador-dialog.html',
                    controller: 'JugadorDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Jugador', function(Jugador) {
                            return Jugador.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('jugador', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('jugador.delete', {
            parent: 'jugador',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/jugador/jugador-delete-dialog.html',
                    controller: 'JugadorDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Jugador', function(Jugador) {
                            return Jugador.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('jugador', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
    . state ( 'topPlayers' , {
            parent:'entity',
            url:'/jugadors/topPlayers',
            data:{
                authorities:[ 'ROLE_USER' ] ,
                pageTitle:'practica7App.jugador.detail.title'
            },
            views:{
                'content@':{
                    templateUrl:'app/entities/jugador/jugadorsTabla.html',
                    controller:'TopPlayersController'
                }
            },
            resolve:{
                translatePartialLoader: [ '$translate' , '$translatePartialLoader' , function($translate , $translatePartialLoader) {
                    $translatePartialLoader.addPart('jugador');
                    return $translate.refresh ();
                }],
                entity:[ '$stateParams' , 'Jugador' , function ($stateParams , Jugador) {
                    return Jugador.topPlayers({asistencias:50});
                }]
            }
        });
    }

})();
