(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', foundItemsDirective);

function foundItemsDirective() {
  var ddo = {
    templateUrl: 'founditems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
}


NarrowItDownController.$inject = ['MenuSearchService']
function NarrowItDownController(MenuSearchService) {
  var list = this;
  list.items = "";
  list.errorMessage = "";
  list.getMenuItems = function () {
    var searchTerm = list.searchTerm;

    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (response) {
       list.items = response;

    })
    .catch(function (error) {
       console.log(error);
    })
  };

  list.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];

  service.getMatchedMenuItems = function (searchTerm) {

    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
       foundItems = [];
       if(searchTerm !== '') {
          for(var i=0; i<result.data.menu_items.length; i++){
            if(result.data.menu_items[i].description.includes(searchTerm)) {
              foundItems.push(result.data.menu_items[i]);
            }
          }
       }
      return foundItems;
    });

    return response;
  };

  service.removeItem = function (itemIndex) {
      foundItems.splice(itemIndex, 1);
    };
}
})();
