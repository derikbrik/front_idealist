angular.module('starter.services', [])

.factory('Chats', function() {
  
})

.factory('produtos', ['$http', function($http) {   
  return $http.get('http://localhost:8083/api/produtos') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}])


.factory('listas', ['$http', function($http) {   
  return $http.get('http://localhost:8083/api/listas') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) {               
              return err; 
            }); 
}])


/*
.factory('lista', ['$http', function($http) {   
  return $http.get('http://localhost:8083/api/listas/:id_lista') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) {               
              return err; 
            }); 
}])

*/





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
                timeout:5000, 
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
                                    
        }
    };
}]);


