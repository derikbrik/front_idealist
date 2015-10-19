angular.module('starter.controllers', [])


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('HomeController', ['$scope', 'httpG', '$location', function ($scope, httpG, $location) {    
    
    $scope.logOut = function () {
        alert("Good bye!");
        httpG.removeToken();
        $scope.isAuthenticated = false;
        $location.path('login');
    };
}])


.controller('ScanController',['$scope', '$cordovaBarcodeScanner', function($scope, $cordovaBarcodeScanner){
    
    $scope.LerCodigo = function() {
        $scope.codigo=938392;
        $cordovaBarcodeScanner.scan()
          .then( function(imgCode) {
                  $scope.codigo=imgCode.text;

              httpG.get('/api/produto/'+ $rootScope.idUser)
              .success(function(data){
                  if (data.success){
                      $scope.lista=data.rows;              
                  }
                })
                .error(function (error) {
                    alert('Falha na obtenção da lista');
              });



        }, function(error){
              alert('Ocorreu o seguinte erro: ' + error);
        });
    }
}])






.controller('ListaController',['$scope','$location','httpG','$stateParams','$rootScope','user', '$ionicModal','$ionicActionSheet', function($scope,$location,httpG,$stateParams,$rootScope,user, $ionicModal,$ionicActionSheet){                      

       httpG.get('/api/listas/'+ $rootScope.idUser)
          .success(function(data){
            if (data.success){
              $scope.lista=data.rows;              
            }
          })
          .error(function (error) {
            alert('Falha na obtenção da lista');
        });


       $ionicModal.fromTemplateUrl('lista-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
              $scope.modal = modal
        })  

        $scope.openModal = function() {
            $scope.modal.show()
        }

      $scope.salvarLista = function() {
          
          alert($scope.modal.Descricao  +  "   " + $rootScope.idUser);
           httpG.post('/api/listas/'+ $rootScope.idUser,{listaDescricao:$scope.modal.Descricao})
          .success(function(data){

              httpG.get('/api/listas/'+ $rootScope.idUser)
                .success(function(data){
                  if (data.success){
                      $scope.lista=data.rows;              
                    }
                  })
                  .error(function (error) {
                      alert('Falha na obtenção da lista');
                  });
           
          })
          .error(function (error) {
            alert('Falha na gravação da nova lista');
        });

            $scope.modal.hide();
        };

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });


    $scope.closeModal = function() {   
        $scope.Descricao="";
        $scope.modal.hide();
      }


    $scope.logOut = function () {
        alert("Good bye!");
        httpG.removeToken();
        $scope.isAuthenticated = false;
        $location.path('login');
    };


    $scope.showMenuLista = function(idLista) {
   
     var hideSheet = $ionicActionSheet.show({
      buttons: [
         { text: 'Compartilhar lista' },
        { text: 'Renomear' },
        {text:'Excluir'}


      ],      
      titleText: 'O que deseja fazer com a lista?',
      cancelText: 'Cancelar',
      cancel: function() {
        // add cancel code..
        },
       buttonClicked: function(index) {

          switch(index)
          {
            case 1:

              


              break;
            case 2:                  
                httpG.delete('/api/lista/'+ idLista)
                  .success(function(data){
                      httpG.get('/api/listas/'+ $rootScope.idUser)
                      .success(function(data){
                        if (data.success){
                            $scope.lista=data.rows;              
                        }
                      })
                      .error(function (error) {
                          alert('Falha na obtenção da lista');
                      });          
                  })
                  .error(function (error) {
                      alert('Falha na exclusão da lista');
                  });


              break;
            case 3:

              break;
          }
        
           return true;


       }
   });




   

    }

}])

/*
.controller('ListaDetailsController',['$scope','$location','httpG','$stateParams', function($scope,$location,httpG,$stateParams){
  var id_lista=$stateParams.id_lista;    
          httpG.setHost('http://localhost:8083');
          httpG.get('/api/listas/'+ id_lista)
          .success(function(data){
            if (data.success){
              $scope.lista=data.rows;
            }
          })
          .error(function (error) {
            alert('Falha na obtenção da lista');
        });
}])*/

.controller('ListaDetailsController',['$scope','$location','httpG','$stateParams', function($scope,$location,httpG,$stateParams){
  var id_lista=$stateParams.id_lista;    
        //  httpG.setHost('http://localhost:8083');
          httpG.get('/api/listaprodutos/'+ id_lista)
          .success(function(data){
            if (data.success){
              $scope.lista=data.rows;
            }
          })
          .error(function (error) {
            alert('Falha na obtenção da lista');
        });

/*
          $scope.autocompletar=function(strDescricao)
          {
                    
           httpG.get('/api/produtos/desc/'+ strDescricao )
          .success(function(data){
            if (data.success){
              $scope.lprodutos=data.rows;
            }
          })
          .error(function (error) {
            alert('Falha na obtenção da lista');
          });
        }
*/

}])






.controller('MainController', ['$scope', '$location', 'httpG', function ($scope, $location, httpG) {
    $scope.isAuthenticated = false;

    if (httpG.getToken()) {
        $scope.isAuthenticated = true;
        $location.path('/home');
        
    } else {
        $location.path('/login');
    }
}])


.controller('LoginController', ['$scope', '$location', 'httpG','$rootScope','user', function ($scope, $location, httpG, $rootScope, user) {
        $scope.user = {}        
        $rootScope.idUser=-1;


        $scope.doLogIn = function () {        
                    
           datas = {username: $scope.user.username, password: $scope.user.password}

        httpG.post('/api/authenticate', datas)
          .success(function (data) {             
            if (data.success) {
                httpG.setToken(data.token);                  
                $scope.isAuthenticated = true;                
                  $rootScope.idUser=data.idUser;                
                  user.setValue= $rootScope.idUser;                         
                $location.path('home');

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
            alert('Falha na conexão');
        });
    };

    $scope.doLogOut = function () {
        httpG.removeToken();
    };
}])