angular.module('starter.services', [])



.factory('usuario',[ '$window', function($window) {

    return  {
       setValue:  function (val) {
            $window.localStorage.setItem('idUser',val);
          },

      getValue: function() {
          return $window.localStorage.getItem('idUser');
        }

    }
}])



.factory('httpG', ['$http', '$window', function ($http, $window) {
    var serviceToken, serviceHost, tokenKey;
    tokenKey = 'token';

    serviceHost= 'http://api-ideallist.rhcloud.com';
    //serviceHost="http://localhost:8080"

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
            datas=params                        ;
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
                                    
        },

        put: function (uri, params) {            
            params = params || {};
            params['token'] = serviceToken;            
            datas=params;
            Object.toparams = function ObjecttoParams(obj) {
                      var p = [];
                    for (var key in obj) {
                          p.push(key + '=' + encodeURIComponent(obj[key]));
                      }
                      return p.join('&');
              };
             return $http({
                method: 'PUT',
                url: serviceHost + uri,
                data: Object.toparams(datas),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}                
                })
                                    
        },        


         delete: function (uri, params) {            
            params = params || {};
            params['token'] = serviceToken;            
            datas=params;
            Object.toparams = function ObjecttoParams(obj) {
                      var p = [];
                    for (var key in obj) {
                          p.push(key + '=' + encodeURIComponent(obj[key]));
                      }
                      return p.join('&');
              };
             return $http({
                method: 'DELETE',
                url: serviceHost + uri,
                data: Object.toparams(datas),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}                
                })
                                    
        },
  


    };
}]);


