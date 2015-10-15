// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
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

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

.state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller : 'LoginController'
    })


  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'    
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    cache:false,
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html'
        //controller: 'ListaController'
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
