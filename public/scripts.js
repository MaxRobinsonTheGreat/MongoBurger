var app = window.angular.module('myApp', [])

app.factory('burgerFetcher', burgerFetcher)
app.controller('myCtrl', mainCtrl)

function burgerFetcher($http) {

    var API_ROOT = 'burger'
    return {
        get: function() {
            return $http
                .get(API_ROOT)
                .then(function(resp) {
                    console.log(resp.data);
                    return resp.data
                })
        },
        post: function(formData) {
            return $http
                .post(API_ROOT, formData)
                .then(function(resp) {
                    console.log("Post worked");
                })
        }
    }
}

function mainCtrl($scope, burgerFetcher) {
    $scope.burgers = []

    burgerFetcher.get()
        .then(function(data) {
            $scope.burgers = data
        })
    $scope.addRecipe = function(e) {
        e.preventDefault();
        var formData = {
            name: $scope.name,
            burgerName: $scope.burgerName,
            bun: $scope.bun,
            vegetable: $scope.vegetable,
            cheese: $scope.cheese,
            sauce: $scope.sauce,
            meat: $scope.meat
        };
        console.log(formData);
        burgerFetcher.post(formData); //Send the data to the back end
        $scope.burgers.push(formData);
    }
}
