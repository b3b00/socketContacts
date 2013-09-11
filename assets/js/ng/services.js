var myApp = angular.module('contacts', []);
//provider style, full blown, configurable version     
myApp.provider('helloWorld', function() {

    this.name = 'Default';

    this.$get = function($rootScope) {
        var name = this.name;
        return {
            sayHello: function() {
                $rootScope.message='bonjour '+name+' ...';
                return "Hello, " + name + "!"
            }
        }
    };

    this.setName = function(name) {
        this.name = name;
    }


});