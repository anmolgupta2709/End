var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.html"
        })
        .when("/dept", {
            templateUrl: "depts.html",
            controller: "deptController"
        })
        .when("/dept/:deptName", {
            templateUrl: "deptName.html",
            controller: "deptNameController"
        })
        .when("/sem", {
            template: `<h1>Semester Time Table</h1> <p>This question is becoming too long so I'm stopping here... but you get the point right?</p>`
        })
        .otherwise({
            redirectTo: "/"
        });
});

app.controller("deptController", function($scope, $http) {
    $scope.depts = [];
    $http.get("data.json").then(function(response) {
        $scope.depts = response.data;
    });
});

app.controller("deptNameController", function($scope, $routeParams, $http) {
    $scope.deptName = $routeParams.deptName;
    $scope.dept = {};
    $http.get("data.json").then(function(response) {
        $scope.dept = response.data.find(function(dept) {
            return dept.deptName === $scope.deptName;
        });
    });
});