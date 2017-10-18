/// <reference path="C:\Users\User\Documents\Visual Studio 2015\Projects\UberEats\UberEats\Scripts/angular.js" />


var UserService = angular.module('UserService', []);

UserService.factory('UserApi', function ($http) {
    var urlBase = "http://localhost:14667/api/";
    var UserApi = {};


    //############### USERS #####################
    //Get all users
    UserApi.getUsers = function () {
        return $http.get(urlBase + '/Customers/');
    }

    //-----------ADD CUSTOMER------------
    UserApi.AddUser = function (user) {
        return $http.post(urlBase + 'Customers', user);
    }


    //-----------CUSTOMER LOGIN IN------------
    UserApi.GetUserInfo = function (email, password, firstname) {
        return $http.get(urlBase + 'Customers/?email=' + email + '&password=' + password + '&firstname=' + firstname);
    }

    //############### RESTAURANTS #####################

    //-----------ADDING RESTAURANT------------

    UserApi.AddRestaurant = function (ResToAdd) {

        return $http.post(urlBase + '/Restaurants/', ResToAdd);

    }

    //-----------RETRIEVING RESTAURANTS------------

    UserApi.RetrieveRestaurants = function () {

        return $http.get(urlBase + 'GetRes');
    }

    //-----------ADMIN LOG IN------------
    UserApi.GetAdminInfo = function (Username, AdminPassword) {
        return $http.get(urlBase + 'Admins?Username=' + Username + '&AdminPassword=' + AdminPassword);
    }


    //##############PRODUCT################


    //-----------ADDING A PRODUCT------------

    UserApi.AddProduct = function (ProdToAdd) {

        return $http.post(urlBase + '/Products', ProdToAdd);

    }

    //-----------RETRIEVING ALL PRODUCTS------------
    UserApi.RetrieveProducts = function () {

        return $http.get(urlBase + 'Products');
    }


    UserApi.CheckoutServ = function (Checky) {
        return $http.post(urlBase + '/Orders/', Checky);

    }

    //#########PAYMENT###########

    UserApi.AddPay = function (pay) {
        return $http.post(urlBase + '/Payments/', pay);
    }

    //############ORDERS#########


    //-----------ADDING AN ORDER------------
    UserApi.AddOrders = function (Order) {
        return $http.post(urlBase + '/Orders/', Order);
    }

    UserApi.AddDum = function (Orders) {
        return $http.post(urlBase + '/OrderCopies', Orders);
    }

    //-----------ALL ORDERS------------
    UserApi.RetrieveOrders = function () {

        return $http.get(urlBase + 'GetOrder');
    }

    //-----------GET ORDERS FOR DRIVER------------

    UserApi.RetrieveDriverOrders = function () {

        return $http.get(urlBase + 'DriverOrders');
    }
    //-----------GET ALL ORDERS TO BE UPDATED------------
    UserApi.RetrieveUpdate = function () {

        return $http.get(urlBase + '/Orders');
    }

    //-----------ORDER CHANGE STATUS------------
    UserApi.UpdateStatus = function (ChangeStatus) {
        var StatusData = $http({
            method: 'PUT',
            url: urlBase + 'Orders/' + ChangeStatus.OrderId,
            data: ChangeStatus,

        });
        return StatusData;
    }

    //----------------DRIVER---------------


    //---------------ADDING DRIVER---------
    UserApi.AddDriver = function (driver) {
        return $http.post(urlBase + 'Drivers', driver);
    }
    //---------------DRIVER LOGGING IN--------------
    UserApi.GetDriverInfo = function (DriverEmail, DriverPassword, DriverFname) {
        return $http.get(urlBase + 'Drivers/?DriverEmail=' + DriverEmail + '&DriverPassword=' + DriverPassword + '&DriverFname=' + DriverFname);
    }
  
    return UserApi;
});