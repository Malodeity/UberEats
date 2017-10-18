/// <reference path="C:\Users\User\Documents\Visual Studio 2015\Projects\UberEats\UberEats\Scripts/angular.js" />



var UberWeb = angular.module("UberWeb", ['ngRoute', 'UserService']);

UberWeb.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/Home', {
            templateUrl: 'view/Home.html',
            controller: 'HomeController'
        }).
    when('/Add', {
        templateUrl: 'view/SignUp.html',
        controller: 'UserController'
    }).
    when('/Login', {
        templateUrl: 'view/Login.html',
        controller: 'LoginController'
    }).
         when('/Welcome', {
             templateUrl: 'view/Welcome.html',
             controller: 'WelcomeController'
         }).
         when('/Search', {
             templateUrl: 'view/Search.html',
             controller: 'SearchController'
         }).
         when('/AddRestaurant', {
             templateUrl: 'view/AddRestaurant.html',
             controller: 'ResController'
         }).
         when('/AdminLogin', {
             templateUrl: 'view/AdminLogin.html',
             controller: 'AdminController'
         }).
         when('/UploadPic', {
             templateUrl: 'view/UploadPic.html',
             controller: 'PicController'
         }).
          when('/AdminWelcome', {
              templateUrl: 'view/AdminWelcome.html',
              controller: 'AdminWellController'
          }).
         when('/AddProduct', {
             templateUrl: 'view/AddProduct.html',
             controller: 'AddProductController'
         }).
         when('/ViewProduct', {
             templateUrl: 'view/KFCPage.html',
             controller: 'ShowProductController'
         }).

         when('/ProductPicUpload', {
             templateUrl: 'view/ProdPicUpload.html',
             controller: 'UploadProductController'
         }).
 
         when('/Payment', {
             templateUrl: 'view/Payment.html',
             controller: 'PaymentController'
         }).
         when('/Cart', {
             templateUrl: 'view/Cart.html',
             controller: 'CartController'
         }).
         when('/Order', {
             templateUrl: 'view/PlaceOrder.html',
             controller: 'OrderController'
         }).
         when('/AllOrders', {
             templateUrl: 'view/AllOrders.html',
             controller: 'GetAllOrdersController'
         }).
         when('/DriverOrders', {
             templateUrl: 'view/DriverOrder.html',
             controller: 'DriverOrdersController'
         }).
         when('/ThankYou', {
             templateUrl: 'view/ThankYou.html',
             controller: 'ThankYouController'
         }).
         when('/AddDriver', {
             templateUrl: 'view/DriverReg.html',
             controller: 'AddDriverController'
         }).
          when('/LoginDriver', {
              templateUrl: 'view/DriverSignIn.html',
              controller: 'DriverLoginController'
          }).
         when('/ResStatus', {
             templateUrl: 'view/ResOrderUpdate.html',
             controller: 'OrderResUpdateController'
         }).
    otherwise({
            redirectTo: '/Home'
        });
}]);

//ADD CUSTOMER
UberWeb.controller("UserController", function ($scope, UserApi, $location) {
    $scope.AdUser = function () {
        var UserToAdd = {
            'firstname': $scope.firstname,
            'lastname': $scope.lastname,
            'email': $scope.email,
            'password': $scope.password
        };

        UserApi.AddUser(UserToAdd).then(function (reponse) {
            alert("Registration Was Successful, Now You Can Sign In");
            $scope.firstname = undefined;
            $scope.lastname = undefined;
            $scope.email = undefined;
            $scope.password = undefined;
            $location.path('/Login');
        }),
        function (response) {
            alert("Unable to add user");
        }
    }

    
});

//CUSTOMER LOGGING IN
UberWeb.controller("LoginController", function ($scope, $http, UserApi, $rootScope, $location, $window) {

    $scope.LogInUser = {
        'email': $scope.email,
        'password': $scope.password,
        'firstname': $scope.firstname
    }

    $scope.loginForm = function () {
        UserApi.GetUserInfo($scope.email, $scope.password).then(function (response) {
            if (response.data === null) {
                alert("You've entered an invalid email and password");
            } else {
                alert("Login Successful. Welcome: " + response.data.firstname);
                $rootScope.currentUser = response.data;
                $location.path('/Welcome');
            }
        }), function (response) {
            alert("Error in logging the system");
        }
    };
});

//----Add Restaurant------------//
UberWeb.controller("ResController", function ($scope, $location, UserApi) {
    $scope.AddRestu = function () {
        var ResToAdd = {
            'ResName': $scope.ResName,
            'ResAddress': $scope.ResAddress,
            'ResCity': $scope.ResCity,

        };

        UserApi.AddRestaurant(ResToAdd).then(function (reponse) {
            alert("Restaurant is added successfully, Click OK to upload a logo");
            $scope.ResName = undefined;
            $scope.ResAddress = undefined;
            $scope.ResCity = undefined;
            $location.path('/UploadPic')
           
        }),
        function (response) {
            alert("Unable to add a restaurant");
        }
    }
});

UberWeb.directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {

        var Change = $parse(attrs.ngFiles);

        element.on('change', function (event) {
            Change(scope, { $files: event.target.files });
        })
    }
    return {
        link: fn_link
    }
}])


UberWeb.controller("PicController", function ($scope, $location, UserApi, $http) {
    var formdata = new FormData();

    $scope.GetImages = function ($files) {
        $scope.imagesrc = [];

        for (var b = 0; b < $files.length; b++) {
            var reader = new FileReader();
            reader.Filename = $files[b].name;

            reader.onload = function (event) {
                var image = {};
                image.Name = event.target.Filename;
                image.Size = (event.total / 1024).toFixed(2);
                image.Src = event.target.result;
                $scope.imagesrc.push(image);
                $scope.$apply();
            }
            reader.readAsDataURL($files[b]);
        };
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        })

    };
    $scope.loadup = function () {
        var reqs = {
            method: 'POST',
            url: 'http://localhost:14667/api/Pictures',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        }

        $http(reqs).then(function (gm) {
            alert("Image saved successfully" + gm);
            $scope.reset();
        }), function () {
            alert("Failed to upload image");
            $scope.reset();
        }
    }

    $scope.reset = function () {
        angular.forEach(
            angular.element("Input [Type = 'file']"),
        function (inputElement) {
            angular.element(inputElement).val(null);
        }
            );
        $scope.imagesrc = [];
        formdata = new FormData();
    }
})

//SEARCHING FOR RESTAURANTS
UberWeb.controller("SearchController", function ($scope, UserApi, $rootScope)
{


    getRestu();
    function getRestu(){
        UserApi.RetrieveRestaurants().then(function (response) {
            $scope.Restaurants = response.data;
        }), function(){
            alert('No Restaurants Found');
        }
}
});



UberWeb.controller("AdminController", function ($scope, $http, UserApi, $rootScope, $location, $window) {

    $scope.LogInUser = {
        'Username': $scope.Username,
        'password': $scope.AdminPassword
    }

    $scope.AdminLogin = function () {
        UserApi.GetAdminInfo($scope.Username, $scope.AdminPassword).then(function (response) {
            if (response.data === null) {
                alert("You've entered an invalid Username and password");
            } else {
                alert("Login Successful. Welcome: Admin");
                $rootScope.currentUser = response.data;
                $location.path('/AdminWelcome');
            }
        }), function (response) {
            alert("Error in logging the system");
        }
    };
});

UberWeb.controller("AddProductController", function ($scope, $location, UserApi) {
    $scope.AddProdu = function () {
        var ProdToAdd = {
            'ProdName': $scope.ProdName,
            'ProdDesc': $scope.ProdDesc,
            'ProdPrice': $scope.ProdPrice,
            'ProdResName': $scope.ProdResName,

        };

        UserApi.AddProduct(ProdToAdd).then(function (reponse) {
            alert("Product is added successfully, Click OK to upload a product picture");
            $scope.ProdName = undefined;
            $scope.ProdDesc = undefined;
            $scope.ProdPrice = undefined;
            $scope.ProdResName = undefined;
            $location.path('/ProductPicUpload')

        }),
        function (response) {
            alert("Unable to add a product");
        }
    }
});

//GETTING PRODUCTS
UberWeb.controller("ShowProductController", function ($scope,$location, UserApi, $rootScope, CommonProp) {

    //---

    getProduct();
    function getProduct() {

        UserApi.RetrieveProducts().then(function (response) {
            $scope.Product = response.data;
        }), function () {
            alert('No Products Available');
        }
    }

    //------CART-----------

    $scope.myItems = [];
    //###############ADDING TO CART####################
    $scope.addItem = function (Product) {
        if ($scope.myItems.length == 0) {
            Product.count = 1;
            $scope.myItems.push(Product);
            alert('Successfully Added, Click "Ok" to continue');
        } else {
            var repeat = false;
            for (var i = 0; i < $scope.myItems.length; i++) {
                if ($scope.myItems[i].ProdName == Product.ProdName) {
                    $scope.myItems[i].count++;
                    repeat = true;
                }
            }
            if (!repeat) {
                Product.count = 1;
                $scope.myItems.push(Product);
            }
        }
        updatePrice();
        $scope.$watch('myItems', function () {
            CommonProp.setItems($scope.myItems);
        });
    };

    //################CALCULATE TOTAL PRICE##############
    var updatePrice = function () {
        var totalPrice = 0;
        for (var i = 0; i < $scope.myItems.length; i++) {
            totalPrice += ($scope.myItems[i].count) * ($scope.myItems[i].ProdPrice);
        }
        $scope.totalPrice = totalPrice;
        CommonProp.setTotal(totalPrice);
    };

    //############### EMPTY THE CART##########
    $scope.removeBasket = function () {
        $scope.myItems.splice(0, $scope.myItems.length);
        updatePrice();
    };

    ////##########CHECK OUT################

    

});


UberWeb.service('CommonProp', function () {

    var items = '';
    var total = 0;

    return {

        getItems: function () {
            return items;
        },
        setItems: function (value) {
            items = value;
        },
        getTotal: function () {
            return total;
        },
        setTotal: function (value) {
            total = value;
        }
    }
});
UberWeb.controller('CartController', function ($scope, CommonProp, $rootScope) {
    //-----ASSIGNING ITEMS-------
    $rootScope.myItems = CommonProp.getItems();
    $rootScope.checkOutTot = CommonProp.getTotal();

   
});

//CART FILTERING
UberWeb.filter('reverse', function () {
    return function (items) {
        var x = items.slice().reverse();
        if (items.length > 1) {
            angular.element('#ok tr').css('background', '#fff');
            angular.element('#ok tr').filter(':first').css('background', 'lightyellow');
            setTimeout(function () {
                angular.element('#ok tr').filter(':first').css('background', '#fff');
            }, 500);
        }
        return x;
    };




});


UberWeb.controller("UploadProductController", function ($scope, $location, UserApi, $http) {
    var formdata = new FormData();

    $scope.GetImages = function ($files) {
        $scope.imagesrc = [];

        for (var b = 0; b < $files.length; b++) {
            var reader = new FileReader();
            reader.Filename = $files[b].name;

            reader.onload = function (event) {
                var image = {};
                image.Name = event.target.Filename;
                image.Size = (event.total / 1024).toFixed(2);
                image.Src = event.target.result;
                $scope.imagesrc.push(image);
                $scope.$apply();
            }
            reader.readAsDataURL($files[b]);
        };
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        })
        
    };
    $scope.loadup = function () {
        var reqs = {
            method: 'POST',
            url: 'http://localhost:14667/api/ProdGalleries',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        }

        $http(reqs).then(function (gm) {
            alert("Image saved successfully" + gm);
            $scope.reset();
        }), function () {
            alert("Failed to upload image");
            $scope.reset();
        }
    }

    $scope.reset = function () {
        angular.forEach(
            angular.element("Input [Type = 'file']"),
        function (inputElement) {
            angular.element(inputElement).val(null);
        }
            );
        $scope.imagesrc = [];
        formdata = new FormData();
    }
})

UberWeb.controller('OrderController', function ($scope, $location, $http, $rootScope, UserApi, CommonProp) {

    GetUsers();
    function GetUsers() {
        UserApi.getUsers().then(function (response) {
            $scope.users = response.data;
        }), function () {
            alert("Couldn't get all the users information");
        }
    }


    $scope.ProductPrice = CommonProp.getTotal();
    $scope.Id = $rootScope.currentUser.Id;
    $scope.ProductId = $scope.Product.ProductId;



    $scope.checkoutButton = function () {
        var Checky = {

            'ProductId': $scope.ProductId,
            'CustomerId': $scope.CustomerId,
            'ProductName': $scope.ProductName,
            'ProductQauntity': $scope.ProductQuantity,
            'ProductPrice': $scope.ProductPrice

        };
        UserApi.CheckoutServ(Checky).then(function (reponse) {
            alert("Click OK to procced with payment");
        $scope.ProductId = undefined;
        $scope.CustomerId = undefined;
        $scope.ProductName = undefined;
        $scope.ProductQuantity = undefined;
        $scope.ProductPrice = undefined;
        $location.path('/Payment')
        }),
        function (response) {
            alert("Unable to continue with an order");
        }
    }


  
});

//------MAKE PAYEMENT-------------
UberWeb.controller('PaymentController', function ($scope, $location, $http, $rootScope, UserApi, $window) {

    GetUsers();
    function GetUsers() {
        UserApi.getUsers().then(function (response) {
            $scope.users = response.data;
        }), function () {
            alert("Couldn't get all the users information");
        }
    }

    $scope.Id = $rootScope.currentUser.Id;

    $scope.JustPay = function () {
        var PaymentsToAdd = {
            'PayCardName': $scope.PayCardName,
            'PayCardNum': $scope.PayCardNum,
            'PayExpDate': $scope.PayExpDate,
            'PayCvCode': $scope.PayCvCode,
            'Id': $scope.Id
        };

        UserApi.AddPay(PaymentsToAdd).then(function (reponse) {
            alert("Payment Was Successful");
            $scope.PayCardName = undefined;
            $scope.PayCardNum = undefined;
            $scope.PayExpDate = undefined;
            $scope.PayCvCode = undefined;
            $scope.Id;
            $location.path('/Order');
        }),
            function (response) {
                alert("Unable to add user");
            };
    };


});
  
UberWeb.controller('OrderController', function ($scope, $location, $http, $rootScope, UserApi, CommonProp) {

    GetUsers();
    function GetUsers() {
        UserApi.getUsers().then(function (response) {
            $scope.users = response.data;
        }), function () {
            alert("Couldn't get all the users information");
        }
    }

    getProduct();
    function getProduct() {

        UserApi.RetrieveProducts().then(function (response) {

            $scope.Product = response.data;
        }), function () {

            alert("Coudn't get all the products information");
        }
    }


    $scope.totalPrice = CommonProp.getTotal();
    $scope.Id = $rootScope.currentUser.Id;
    $scope.firstname = $rootScope.currentUser.firstname;
    $scope.lastname = $rootScope.currentUser.lastname;
    $scope.email = $rootScope.currentUser.email;
    //$scope.Address = $scope.Address
    
    $scope.checkoutButton = function () {
        var OrderToAdd = {
            'Id': $scope.Id,
            'firstname': $scope.firstname,
            'lastname' : $scope.lastname,
            'email': $scope.email,
            'totalPrice': $scope.totalPrice,
            'AddressOrder': $scope.AddressOrder
           
        };

        UserApi.AddOrders(OrderToAdd).then(function (response) {
            $scope.Order = response.data;
            
            alert("Order has been placed successfully");
            $scope.totalPrice = undefined;
            $scope.email = undefined;
            $scope.Id = undefined;
            $scope.Address = undefined;
            $scope.firstName = undefined;
            $scope.lastName = undefined;
            $location.path('/ThankYou');
            $scope.adDum();

        }),
            function (response) {
                alert("Unable to add user");
            };
    };

    $scope.adDum = function () {

        for (var i = 0; i <= $rootScope.myItems.length; i++) {

            $scope.product_id = $rootScope.myItems[i].ProdId;
            var ordItems =
                {
                    'product_id': $scope.product_id,
                    'orderId': $scope.Order.OrderId
                }

            UserApi.AddDum(ordItems).then(function (response) {
                console.log(response);
            }),
            function (response) {
                alert("Unable to add");
            }
        }

    };
});

UberWeb.controller("GetAllOrdersController", function ($scope, UserApi, $rootScope) {


    getOd();
    function getOd() {
        UserApi.RetrieveOrders().then(function (response) {
            $scope.Orders = response.data;
        }), function () {
            alert('No Orders Found');
        }
    }
});

//-------DRIVER UPDATES STATUS---------

UberWeb.controller("DriverOrdersController", function ($scope, UserApi, $rootScope, $http, $location) {

    $scope.selectedItem = "Selected Order";
    $scope.isDeleteItemVisible = false;
    getOd();
    function getOd() {
        UserApi.RetrieveDriverOrders().then(function (response) {
            $scope.Orders = response.data;
        }), function () {
            alert('No Orders Found');
        }
    };
  
    $scope.dropboxitemselected = function (item) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = item.OrderId;
        $scope.totalPrice = item.totalPrice;
        $scope.email = item.email;
        $scope.AddressOrder = item.AddressOrder;
        $scope.Id = item.Id;
        $scope.OrderStatus = "Picked Up";

    };


    $scope.UpdateStatus = function () {

        var DriverStatusUp = {

            'OrderId': $scope.selectedItem,
            'totalPrice': $scope.totalPrice,
            'email' : $scope.email,
            'AddressOrder': $scope.AddressOrder,
            'Id': $scope.Id,
            'OrderStatus': $scope.OrderStatus,
            'DeliveryStatus': $scope.DeliveryStatus
        };
        UserApi.UpdateStatus(DriverStatusUp).then(function (response) {

            alert("Delivery Status Successfully updated");
            $scope.totalPrice = undefined;
            $Scope.email = undefined;
            $scope.AddressOrder = undefined;
            $scope.Id = undefined;
            $scope.OrderStatus = undefined;
            $scope.DeliveryStatus = undefined;
            getOrder();
            location.path('/DriverOrders');
        }),
        function (response) {
            alert("Couldn't update the status");
        }

    };


});

//------ADD DRIVER------------
UberWeb.controller("AddDriverController", function ($scope, UserApi, $location) {
    $scope.AdDriver = function () {
        var DriverToAdd = {
            'DriverFName': $scope.DriverFName,
            'DriverLName': $scope.DriverLName,
            'DriverEmail': $scope.DriverEmail,
            'DriverCellNum' : $scope.DriverCellNum,
            'DriverPassword': $scope.DriverPassword
        };

        UserApi.AddDriver(DriverToAdd).then(function (reponse) {
            alert("Registration Was Successful, Now You Can Sign In");
            $scope.DriverFName = undefined;
            $scope.DriverLName = undefined;
            $scope.DriverEmail = undefined;
            $scope.DriverCellNum = undefined;
            $scope.DriverPassword = undefined;
            $location.path('/LoginDriver');
        }),
        function (response) {
            alert("Unable to add user");
        }
    }


});

//----DRIVER LOG IN--------------
UberWeb.controller("DriverLoginController", function ($scope, $http, UserApi, $rootScope, $location, $window) {

    $scope.LogInUser = {
        'DriverEmail': $scope.DriverEmail,
        'DriverPassword': $scope.DriverPassword,
        'DriverFname': $scope.DriverFname
    }

    $scope.DriverloginForm = function () {
        UserApi.GetDriverInfo($scope.DriverEmail, $scope.DriverPassword).then(function (response) {
            if (response.data === null) {
                alert("You've entered an invalid email and password");
            } else {
                alert("Login Successful. Welcome: " + response.data.DriverFname);
                $rootScope.currentUser = response.data;
                $location.path('/DriverOrders');
            }
        }), function (response) {
            alert("Error in logging the system");
        }
    };
});


//-----ADMIN UPDATES ORDER STATUS----------
UberWeb.controller("OrderResUpdateController", function ($scope, UserApi, $rootScope, $http, $location) {

    $scope.selectedItem = "Selected Order";
    $scope.isDeleteItemVisible = false;
    getOd();
    function getOd() {
        UserApi.RetrieveUpdate().then(function (response) {
            $scope.Orders = response.data;
        }), function () {
            alert('No Orders Found');
        }
    };

    $scope.dropboxitemselected = function (item) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = item.OrderId;
        $scope.totalPrice = item.totalPrice;
        $scope.email = item.email;
        $scope.AddressOrder = item.AddressOrder;
        $scope.Id = item.Id;

    };


    $scope.UpdateStatus = function () {

        var DriverStatusUp = {

            'OrderId': $scope.selectedItem,
            'totalPrice': $scope.totalPrice,
            'email': $scope.email,
            'AddressOrder': $scope.AddressOrder,
            'Id': $scope.Id,
            'OrderStatus': $scope.OrderStatus,
            'DeliveryStatus': $scope.DeliveryStatus
        };
        UserApi.UpdateStatus(DriverStatusUp).then(function (response) {

            alert("Delivery Status Successfully updated");
            $scope.totalPrice = undefined;
            $Scope.email = undefined;
            $scope.AddressOrder = undefined;
            $scope.Id = undefined;
            $scope.OrderStatus = undefined;
            $scope.DeliveryStatus = undefined;
            getOrder();
            location.path('/ResStatus');
        }),
        function (response) {
            alert("Couldn't update the status");
        }

    };


});