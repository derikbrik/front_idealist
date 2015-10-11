angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array
/*
  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
*/})

.factory('produtos', ['$http', function($http) {   
  return $http.get('http://localhost:8083/api/produtos') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}])


.factory('httpG', ['$http', '$window', function ($http, $window) {
    var serviceToken, serviceHost, tokenKey;
    tokenKey = 'token';

    serviceHost= 'http://localhost:8083';

    if (localStorage.getItem(tokenKey)) {

        serviceToken = $window.localStorage.getItem(tokenKey);
    }
  
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
 
    return {
       setHost: function (host) {

            serviceHost = host;
        },

        setToken: function (token) {
            serviceToken = token;
            $window.localStorage.setItem(tokenKey, token);
        },
  
        getToken: function () {
            return serviceToken;
        },
  
        removeToken: function() {
            serviceToken = undefined;
            $window.localStorage.removeItem(tokenKey);
        },

  
        get: function (uri, params) {
            params = params || {};
            params['token'] = serviceToken;
            return $http.get(serviceHost + uri, {params: params});
        },
  
        post: function (uri, params) {            
            params = params || {};
            params['token'] = serviceToken;            
            
            datas ={username: params.username,
                    password: params.password}       
            
            Object.toparams = function ObjecttoParams(obj) {
                      var p = [];
                    for (var key in obj) {
                          p.push(key + '=' + encodeURIComponent(obj[key]));
                      }
                      return p.join('&');
              };
          
         return $http({
                method: 'POST',
                url: serviceHost + uri,
                data: Object.toparams(datas),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
                                    
        }
    };
}]);


