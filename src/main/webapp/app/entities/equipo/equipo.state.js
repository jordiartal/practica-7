(function() {
    'use strict';

    angular
        .module('practica7App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('equipo', {
            parent: 'entity',
            url: '/equipo',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'practica7App.equipo.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/equipo/equipos.html',
                    controller: 'EquipoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('equipo');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('equipo-detail', {
            parent: 'entity',
            url: '/equipo/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'practica7App.equipo.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/equipo/equipo-detail.html',
                    controller: 'EquipoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('equipo');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Equipo', function($stateParams, Equipo) {
                    return Equipo.get({id : $stateParams.id});
                }]
            }
        })
        .state('equipo.new', {
            parent: 'equipo',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/equipo/equipo-dialog.html',
                    controller: 'EquipoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nombre: null,
                                localidad: null,
                                fechaCreacion: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('equipo', null, { reload: true });
                }, function() {
                    $state.go('equipo');
                });
            }]
        })
        .state('equipo.edit', {
            parent: 'equipo',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/equipo/equipo-dialog.html',
                    controller: 'EquipoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Equipo', function(Equipo) {
                            return Equipo.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('equipo', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('equipo.delete', {
            parent: 'equipo',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/equipo/equipo-delete-dialog.html',
                    controller: 'EquipoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Equipo', function(Equipo) {
                            return Equipo.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('equipo', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
