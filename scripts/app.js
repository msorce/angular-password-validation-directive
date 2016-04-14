var app = angular.module('app', []);

app.controller('mainCtrl', ['$scope', function($scope) {
  $scope.title = 'Password Validator';
}]);

app.directive('pwVal', [function(){

  var letterReq = /[a-z]/;
  var numReq = /[0-9]/;
  var specCharReq = /[\[\]\^\$\.\|\?\*\+\(\)\\~`\!@#%&\-_+={}'""<>:;, ]{1,}/;

  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl){
      scope.passwordObj = {
        len: false,
        letter: false,
        num: false,
        specChar: false
      }
      ctrl.$parsers.unshift(function(viewValue) {
        scope.passwordObj.len = viewValue.length >= 6 ? true : false;
        scope.passwordObj.letter = letterReq.test(viewValue);
        scope.passwordObj.num = numReq.test(viewValue);
        scope.passwordObj.specChar = specCharReq.test(viewValue);
        scope.showPopup = '';
        if(scope.passwordObj.len && scope.passwordObj.letter && scope.passwordObj.num && scope.passwordObj.specChar){
          setTimeout(function(){
            scope.showPopup = 'hide';            
          },300);
        }
        console.log(scope.validateObj);
      });

    } //end link function
  }; //end return obj
}]); //end pwVal directive
