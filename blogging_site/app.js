var app = angular.module("blogApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/blog", {
            templateUrl: "blog.html",
            controller: "blogController"
        })
        .when("/blog/:id", {
            template: `<div>
      <h1>{{blog.blogTitle}}</h1>
      <p>{{blog.blogContent}}</p>
    </div>`,
            controller: "blogIdController"
        })
        .when("/contacts", {
            template: `<h1>Contacts</h1>
      <p>Feel free to get in touch with us through the following contact information.</p>`,
            controller: "contactsController"
        })
        .when("/about", {
            template: `<h1>About</h1>
      <p>Learn more about our blog and our team.</p>`,
            controller: "aboutController"
        })
        .otherwise({
            redirectTo: "/blog"
        });
});

app.controller("mainController", function($scope) {
    $scope.isDarkTheme = false;
    $scope.toggleTheme = function() {
        $scope.isDarkTheme = !$scope.isDarkTheme;
    };
});

app.controller("blogController", function($scope, $http) {
    $scope.blogs = [];
    $http.get("blogs.json").then(function(response) {
        $scope.blogs = response.data;
    });
});

app.controller("blogIdController", function($scope, $routeParams, $http) {
    $scope.blog = {};
    $scope.blogId = $routeParams.id;
    $http.get("blogs.json").then(function(response) {
        let data = response.data;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            if (data[i].blogId == $routeParams.id) {
                $scope.blog = data[i];
                console.log(data[i]);
                break;
            }
        }
    });
});

app.controller("contactsController", function($scope) {
    // Add your contacts-related logic here
});

app.controller("aboutController", function($scope) {
    // Add your about-related logic here
});