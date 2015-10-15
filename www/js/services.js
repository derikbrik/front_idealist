angular.module('starter.services', [])



.factory('user',[ '$window', function($windows) {
    var _iduser = {  value: -1 }
    return  {
       setValue:  function (val) {
            _iduser.value = val;
          },

      getValue: function() {
          return _iduser.value;
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
                                    
        }
    };
}]);


