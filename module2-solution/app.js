(function () {
'use strict';

var shoppingList = [
  {
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "200"
  },
  {
    name: "Cookies",
    quantity: "300"
  },
  {
    name: "Chocolate",
    quantity: "5"
  },
  {
    name: "Muffins",
    quantity: "10"
  }
];

angular.module('ShoppingListApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);;


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.getItemToBuy();

  showList.removeItem = function (itemIndex) {
      ShoppingListCheckOffService.removeItem(itemIndex);
      if(showList.items.length  === 0) {
        showList.message = "Everything is bought!";
      }

  };

  showList.addItem = function (itemIndex) {
    ShoppingListCheckOffService.addItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var itemAdder = this;

itemAdder.itemsBought = ShoppingListCheckOffService.getItemBought();
itemAdder.message = ShoppingListCheckOffService.getMessage();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items bought
  var items = shoppingList;
  var itemsBought = [];

  this.boughtMessage = {
      value: 'Nothing bought yet.'
    }


  service.removeItem = function (itemIdex) {
    items.splice(itemIdex, 1);
  };
  service.getItemToBuy = function () {
    return items;
  };

  // bought items
  service.addItem = function (itemIndex) {
    this.boughtMessage.value = "";
    var item = items[itemIndex];
    itemsBought.push(item);
  };
  service.getItemBought = function () {
    return itemsBought;
  };
  service.getMessage = function () {
    return this.boughtMessage;
  };

}
})();
