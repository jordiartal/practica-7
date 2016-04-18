(function() {
    'use strict';
    angular
        .module('practica7App')
        .factory('Equipo', Equipo);

    Equipo.$inject = ['$resource', 'DateUtils'];

    function Equipo ($resource, DateUtils) {
        var resourceUrl =  'api/equipos/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaCreacion = DateUtils.convertLocalDateFromServer(data.fechaCreacion);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.fechaCreacion = DateUtils.convertLocalDateToServer(data.fechaCreacion);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.fechaCreacion = DateUtils.convertLocalDateToServer(data.fechaCreacion);
                    return angular.toJson(data);
                }
            }
        });
    }
})();
