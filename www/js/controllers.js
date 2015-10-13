angular.module('starter.controllers', [])


.controller('HomeController', ['$scope', 'httpG', '$location', function ($scope, httpG, $location) {  

    $scope.isAuthenticated = false;
    if (httpG.getToken()) {
        $scope.isAuthenticated = true;
        $location.path('/tab/home');
        
    } else {

        $location.path('/login');
    }

       httpG.get('/api/listas')
        .success(function (data) {            
            
            if (data.success) {
              $scope.listas=data;  
            }
        })
        .error(function(err){
          alert(err);
        });


$scope.getprodutos = function () {
       httpG.get('/api/produtos')
        .success(function (data) {            

            if (data.success) {
              $scope.produtos=data;  
            }
        })
        .error(function(err){
          alert(err);
        });

    }

 
$scope.golista=function(id_lista)
{

  $location.path('/lista');


}



    $scope.logOut = function () {
        alert("Good bye!");
        httpG.removeToken();
        $scope.isAuthenticated = false;
        $location.path('login');
    };
}])


.controller('MainController', ['$scope', '$location', 'httpG', function ($scope, $location, httpG) {

    $scope.isAuthenticated = false;
    if (httpG.getToken()) {
        $scope.isAuthenticated = true;
        $location.path('/tab/home');
        
    } else {

        $location.path('/login');
    }
}])



.controller('listaController', ['$scope', '$location','$stateParams', 'httpG', function ($scope, $location,$stateParams, httpG )
 {
 var id_lista = $stateParams.id_lista;


    $scope.isAuthenticated = false;
    if (httpG.getToken()) {
        $scope.isAuthenticated = true;              

    } else {

        $location.path('/login');
    }

   
    httpG.get('/api/listas/' + id_lista)
        .success(function (data) {                        
            if (data.success) {
           
              $scope.lista=data;  
            }
        })
        .error(function(err){
          alert(err);
        });
    
}])


.controller('LoginController', ['$scope', '$location', 'httpG', function ($scope, $location, httpG) {
    $scope.user = {};


    $scope.doLogIn = function () {

      
        httpG.setHost('http://localhost:8083');
        httpG.post('/api/authenticate', {username: $scope.user.username, password: $scope.user.password})
          .success(function (data) {             
            if (data.success) {

                httpG.setToken(data.token);                  
                $scope.isAuthenticated = true;                                 
                $location.path('tab/home');

            } else
            {          
              if( data.codigo==1){
               alert('Usuário inválido');
              }
              else if( data.codigo==2)
              {
                alert('Senha inválida');
              }
              
            }


        }).error(function (error) {
           // alert(err);   
            alert('Falha na conexão');
        });
    };

    $scope.doLogOut = function () {
        httpG.removeToken();
    };
}])