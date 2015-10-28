angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

$stateProvider

.state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller : 'LoginController'
    })

.state('registro', {
      url: "/registro",
      templateUrl: "templates/registro.html",
      controller : 'RegistroController'
    })
  
  //Diretiva Abstrata
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'    
  })

  .state('tab.home', {
    url: '/home',
    cache:false,
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'ListaController'
      }
    }
  })

  .state('tab.scan', {
      url: '/scan',
      cache:false,
      views: {
        'tab-scan': {
          templateUrl: 'templates/tab-scan.html',
         controller: 'ScanController'
        }
      }
    })

    
  .state('tab.lista', {
    url: '/lista',
    cache:false,
    views: {
      'tab-lista': {
        templateUrl: 'templates/tab-listas.html'
        //controller: 'ListaController'
      }
    }
  })


  .state('tab.lista-detail', {
    url: '/home/:id_lista',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-lista.html',
        controller: 'ListaDetailsController'
      }
    }
  })





  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('tab/home');

});
