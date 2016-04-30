// Angular App Part

var ShopProductsApp = angular.module("ShopProductsApp", []);

ShopProductsApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

ShopProductsApp.controller("ShopProductsCtrl", function($scope, $http) {

    $scope.add_to_favorite_shops = function(event) {

        var shop_id = angular.element(event.currentTarget).attr('shop');
        var this_button = angular.element(event.currentTarget);
        var remove_button = angular.element('#remove_from_favorite_shops_'+shop_id);

        $http.get("/accounts/add_to_favorite_shops/"+shop_id)
            .then(function successCallback(response) {
                if(response.data == 'true') {
                    this_button.hide();
                    remove_button.show();
                }else {
                    alert('There are some problems, tra again!');
                }
            }, function errorCallback() {
                alert('There are some problems, tra again!');
            });
    };

    $scope.remove_from_favorite_shops = function(event) {

        var shop_id = angular.element(event.currentTarget).attr('shop');
        var this_button = angular.element(event.currentTarget);
        var add_button = angular.element('#add_to_favorite_shops_'+shop_id);

        $http.get("/accounts/remove_from_favorite_shops/"+shop_id)
            .then(function successCallback(response) {
                if(response.data == 'true') {
                    this_button.hide();
                    add_button.show();
                }else {
                    alert('There are some problems, tra again!');
                }
            }, function errorCallback() {
                alert('There are some problems, tra again!');
            });
    };

    $scope.add_to_wish_list = function(event) {

        var product_id = angular.element(event.currentTarget).attr('product');
        var this_button = angular.element(event.currentTarget);
        var remove_button = angular.element('#remove_from_wish_list_'+product_id);

        $http.get("/accounts/add_to_wish_list/"+product_id)
            .then(function successCallback(response) {
                if(response.data == 'true') {
                    this_button.hide();
                    remove_button.show();
                }else {
                    alert('There are some problems, tra again!');
                }
            }, function errorCallback() {
                alert('There are some problems, tra again!');
            });
    };

    $scope.remove_from_wish_list = function(event) {

        var product_id = angular.element(event.currentTarget).attr('product');
        var this_button = angular.element(event.currentTarget);
        var add_button = angular.element('#add_to_wish_list_'+product_id);

        $http.get("/accounts/remove_from_wish_list/"+product_id)
            .then(function successCallback(response) {
                if(response.data == 'true') {
                    this_button.hide();
                    add_button.show();
                }else {
                    alert('There are some problems, tra again!');
                }
            }, function errorCallback() {
                alert('There are some problems, tra again!');
            });
    };

    $scope.add_to_cart = function(event) {

        var product_id = angular.element(event.currentTarget).attr('product');
        var this_button = angular.element(event.currentTarget);
        var remove_button = angular.element('#remove_from_cart_'+product_id);

        $http.get("/products/add_to_cart/"+product_id)
            .then(function successCallback(response) {
                if(response.data == 'true') {
                    this_button.hide();
                    remove_button.show();
                }else {
                    alert('There are some problems, tra again!');
                }
            }, function errorCallback() {
                alert('There are some problems, tra again!');
            });
    };

    $scope.remove_from_cart = function(event) {

        var product_id = angular.element(event.currentTarget).attr('product');
        var this_button = angular.element(event.currentTarget);
        var add_button = angular.element('#add_to_cart_'+product_id);

        $http.get("/products/remove_from_cart/"+product_id)
            .then(function successCallback(response) {
                if(response.data == 'true') {
                    this_button.hide();
                    add_button.show();
                }else {
                    alert('There are some problems, tra again!');
                }
            }, function errorCallback() {
                alert('There are some problems, tra again!');
            });
    };

});


// Jquery Part

$(function() {

});
