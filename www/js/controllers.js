angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('HomeController', ['$scope', 'httpG', '$location', function ($scope, httpG, $location) {    
    
    $scope.hello = function () {
        httpG.get('/api/produtos')
        .success(function (data) {            

            if (data.success) {
              $scope.produtos=data;  
            }
        })
        .error(function(err){
          alert(err);
        });

    };

    $scope.teste='Clicando';

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
        $location.path('/home');
        
    } else {
        $location.path('/login');
    }
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