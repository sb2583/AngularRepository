(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {

$scope.checkIfTooMuch = function () {
var data = $scope.lunchMenu;
var lunchMenuList =arrayOfLunchMenu(data);

if(lunchMenuList.length == 0)
{
  $scope.response = "Please enter data first";
  $scope.responseColor  = 'red';
}
else if (lunchMenuList.length <= 3 ) {
    $scope.response =  "Enjoy!";
    $scope.responseColor = 'green';
} else {
    $scope.response = "Too much!";
    $scope.responseColor = 'green';
  }
}
};
function arrayOfLunchMenu(data){
var menuList;

var arrayList = new Array();
if(data != null && data != '')
{
  menuList = data.split(",");
  for (var i = 0; i < menuList.length; i++) {
    if(menuList[i].length > 0)
      arrayList.push(menuList[i]);
  }
}
  return arrayList;
}

})();
