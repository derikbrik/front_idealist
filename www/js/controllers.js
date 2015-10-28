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
        $cordovaBarcodeScanner.scan()
          .then( function(imgCode) {
                  $scope.codigo=imgCode.text;

              httpG.get('/api/produto/barcode/'+ $scope.codigo)
              .success(function(data){
                  if (data.success){
                      $scope.listaproduto=data.rows;              
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






.controller('ListaController',['$scope','$location','httpG','$stateParams','$rootScope','usuario', '$ionicModal','$ionicActionSheet', function($scope,$location,httpG,$stateParams,$rootScope,usuario, $ionicModal,$ionicActionSheet){                      


//Carrega lista inicial
  /*     httpG.get('/api/listas/' + usuario.getValue())      
          .success(function(data){            
            if (data.success){
              $scope.lista=data.rows;              
            }
          })
          .error(function (error) {
            alert('Falha na obtenção da lista');
        });*/



//Funcao para modal criar lista
       $ionicModal.fromTemplateUrl('lista-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
              $scope.modal = modal
        })  

        $scope.openModal = function() {
            $scope.modal.show()
        }

//salva a lista 

    $scope.atualizarListas=function()
    {

      httpG.get('/api/listas/'+ usuario.getValue())
                .success(function(data){
                  if (data.success){
                      $scope.lista=data.rows;              
                    }
                    else
                    {
                      alert("sem sucesso")
                    }
                  })
                  .error(function (error) {
                      alert('Falha na obtenção da lista');
                  });


    }

  $scope.atualizarListas();

      $scope.salvarLista = function() {
                    
           httpG.post('/api/listas/' + usuario.getValue(),{ListaDescricao:$scope.modal.Descricao})
          .success(function(data){
              $scope.atualizarListas();           
          })
          .error(function (error) {
            alert('Falha na gravação da nova lista' + error);
        });

            $scope.modal.hide();
            $scope.atualizarListas();
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
                      httpG.get('/api/listas/'+ usuario.getValue())
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


.controller('ListaDetailsController',['$scope','$location','httpG','$stateParams','$ionicModal','$ionicLoading', function($scope,$location,httpG,$stateParams,$ionicModal,$ionicLoading){
  $scope.ShowDelete=false;
       var id_lista=$stateParams.id_lista;            
         
         /* var id_lista=$stateParams.id_lista;            
          httpG.get('/api/listaprodutos/'+ id_lista)
          .success(function(data){
            if (data.success){
              $scope.lista=data.rows;
            }
          })
          .error(function (error) {
            alert('Falha na obtenção da lista');
        });*/
    
        $ionicLoading.show({
          template: 'Aguarde... <p><p><ion-spinner icon="android" class="spinner-positive"></ion-spinner>'
      });

        $scope.AtualizarLista=function(id_lista){ 
          httpG.get('/api/listaprodutos/'+ id_lista)
          .success(function(data){
            if (data.success){
              $scope.lista=data.rows;
              $ionicLoading.hide();
            }else
            {

              $ionicLoading.hide();
            }
          })
          .error(function (error) {
            alert('Falha na obtenção da lista');
             $ionicLoading.hide();
        });
        }
              $scope.AtualizarLista(id_lista);



      $ionicModal.fromTemplateUrl('produto-modal.html',
        {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
              $scope.modal = modal              
              $scope.modal.idfLista=id_lista;
              $scope.modal.strDescricao="";
        })  

        $scope.openModal = function() {
            $scope.modal.show()
        }

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


    $scope.ExibirBotaoDelete=function()
    {

      $scope.ShowDelete = !($scope.ShowDelete);

    }


    $scope.Remover=function(idLista)
      {

          
        httpG.delete('/api/listaprodutos/'+ idLista)
            .success(function(data){  
            if (data.success){          

            httpG.get('/api/listaprodutos/'+ id_lista)
                .success(function(data){                                    
                  if (data.success){
                      $scope.lista=data.rows;
                     
                  }
                   else
                  {

                    if (data.erro==1451)
                      {
                        alert("Produto não pode ser removido, por fazer parte de um registro de preços.");

                      }else
                       {
                          alert("Erro não identificado.");
                      }
                    }

                  
                $scope.ExibirBotaoDelete();
              })
            .error(function (error) {
                  alert('Falha na obtenção da lista');
                   $ionicLoading.hide();
            });

                alert('Produto removido da lista')                ;
            }
          })
          .error(function (error) {
            alert('Falha na exclusão do item');
             $ionicLoading.hide();
          });        


        

    }





}])

.controller('ModalCtrl',['$scope','httpG','$ionicLoading', function($scope,httpG,$ionicLoading)
{

  

    $scope.selecionarProduto=function(idProduto)
    {
      $ionicLoading.show({
          template: 'Aguarde... <p><p><ion-spinner icon="android" class="spinner-positive"></ion-spinner>'
      })
      
      datas = {idfLista: $scope.modal.idfLista, idfProduto: idProduto}

      httpG.post('/api/listaprodutos/',datas )
            .success(function(data){                

              $scope.AtualizarLista($scope.modal.idfLista);
            /*if (data.success){        
                  
                  httpG.get('/api/listaprodutos/'+ $scope.modal.idfLista)                  
                  .success(function(datalista){                                        
                    if (datalista.success){                      
                        $scope.lista=datalista.rows;                                                    
                  }})
              .error(function(err)
                {
                  alert(err);
                })*/

            $ionicLoading.hide();
                $scope.modal.hide();
            
          
          })
          .error(function (error) {
            alert('Falha na obtenção da lista');
          });        



//      idfLista
  //    idfProduto

      
    }

    $scope.change = function(_strDescricao) {
        if (_strDescricao=='')
            _strDescricao=-111111;
        httpG.get('/api/produtos/desc/'+ _strDescricao )
            .success(function(data){  
            if (data.success){
                
                  $scope.lprodutos=data.rows; 

            }
          })
          .error(function (error) {
            alert('Falha na obtenção da lista');
          });        
    };

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


.controller('LoginController', ['$scope', '$location', 'httpG','$rootScope','usuario', function ($scope, $location, httpG, $rootScope, usuario) {
        $scope.user = {}                
        

        $scope.doLogIn = function () {        
                    
           datas = {username: $scope.user.username, password: $scope.user.password}

        httpG.post('/api/authenticate', datas)
          .success(function (data) {             
            if (data.success) {
                httpG.setToken(data.token);                  
                $scope.isAuthenticated = true;                
                   
                  usuario.setValue(data.idUser);               
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


    $scope.NovaConta=function()
    {        
        $location.path('registro');

    }


    $scope.doLogOut = function () {
        httpG.removeToken();
        
    };
}])


.controller('RegistroController', ['$scope', '$location', 'httpG', function ($scope, $location, httpG) {
        $scope.nuser = {}  ;      

$scope.Cancelar=function()
{
  $location.path('login')

}

          $scope.AddUser=function()
          {
                
            if ($scope.nuser.username==undefined)
            {            
              alert("Digite um nome de usuário")
              return;
            }
            
            if ($scope.nuser.email==undefined)
            {
                 alert("Digite um email válido")
                 return;
            }
            
            

            if ($scope.nuser.password==undefined || $scope.nuser.password.length < 6 )
            {

               alert("A senha deve ter no minimo 6 caracteres")
                return;
            }


            if ($scope.nuser.password != $scope.nuser.confirmpassword  )
            {

               alert("As senhas não conferem")
                return;
            }
            
              datUser = { username:$scope.nuser.username,
                          email:$scope.nuser.email,
                          password:$scope.nuser.password
                        }


            httpG.post('/api/users/', datUser)
            .success(function(data)
            {                

              alert("Parabéns! Sua conta foi criada.")            
              $location.path('login') 

            })
            .error(function()
            {

              alert("Não foi possivel criar a conta neste momento. Tente novamente mais tarde.")            
            })


              
            
              
          }





  }])