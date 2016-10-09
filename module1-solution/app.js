(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope', '$filter'];
function LunchCheckController($scope, $filter) {

$scope.checkIfTooMuch = function () {
var data = $scope.lunchMenu;

if(data == null || data == "")
{
  $scope.response = "Please enter data first";
  $scope.style = {color: 'red' };
}
else
{
  var flag = data.endsWith(",");
  if(flag) {
    data = data.substring(0,data.length-1);
  }
  var lunchMenuList = data.split(",");
  if(lunchMenuList.length > 3 ) {
    $scope.response = "Too much!";
    $scope.style = {color: 'green' };
  } else {
    $scope.response =  "Enjoy!";
    $scope.style = {color: 'green' };
  }
}


}

};
})();
