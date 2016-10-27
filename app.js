var app = angular.module("ughwhateverApp", ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'mainController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

