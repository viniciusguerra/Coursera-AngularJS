(function(){
	'use strict'

	angular.module('ShoppingListCheckOff', [])	
	.controller('ToBuyShoppingController', ToBuyShoppingController)
	.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
	.filter('ToBuy', function(){return ToBuyFilter})
	.filter('AlreadyBought', function(){return AlreadyBoughtFilter})
	.provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider)
	.config(Config);

	function ToBuyFilter(item){
		var output = 'Buy ' + item.amount + ' ' + (item.unit !== undefined ? item.unit + " of " : " ") + item.name;

		return output;
	}

	function AlreadyBoughtFilter(item){
		var output = 'Bought ' + item.amount + ' ' + (item.unit !== undefined ? item.unit + " of " : " ") + item.name;

		return output;
	}


	Config.$inject = ['ShoppingListCheckOffServiceProvider'];
	function Config(ShoppingListCheckOffServiceProvider)
	{
		var toBuyInit = [
		{
			name: 'Cookies',
			amount: 10,
			unit: 'bags'
		},
		{
			name: 'Coffee Beans',
			amount: 10,
			unit: 'Kg'
		},
		{
			name: 'Coffee Machine',
			amount: 1,
		},
		{
			name: 'Bacon',
			amount: 5,
			unit: 'Kg'
		},
		{
			name: 'Grana Cheese',
			amount: 600,
			unit: 'g'
		}];

		ShoppingListCheckOffServiceProvider.defaults.toBuy = toBuyInit;
	}

	function ShoppingListCheckOffServiceProvider(){
		this.defaults = {
			toBuy: []
		};

		this.$get = function(){
			var service = new ShoppingListCheckOffService(this.defaults.toBuy);
			return service;
		};
	}

	function ShoppingListCheckOffService(toBuyInit){
		//added the unit property to be able to test the ternary expression at filter
		this.toBuy = toBuyInit;

		this.alreadyBought = [];

		this.addToBoughtList = function(itemIndex){			
			this.alreadyBought.push(this.toBuy[itemIndex]);
			this.toBuy.splice(itemIndex, 1);
		};
	}

	ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyShoppingController(ShoppingListCheckOffService){
		this.CheckOffService = ShoppingListCheckOffService;

		this.toBuy = this.CheckOffService.toBuy;

		this.addToBoughtList = function(index){
			this.CheckOffService.addToBoughtList(index);
		};
	};

	AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtShoppingController(ShoppingListCheckOffService){
		this.CheckOffService = ShoppingListCheckOffService;

		this.alreadyBought = this.CheckOffService.alreadyBought;
	};
})();