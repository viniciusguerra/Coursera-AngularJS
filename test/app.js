//IIFE - Immediately Invoked Function Expression
//required to keep local variables from leaking into the global scope
(function(){
	//enforces definition of vars and avoids mistakes
	'use strict';

	angular.module('MyAngularApp', [])

	//.controller defines ViewModel
	//takes declarative name and function

	//$ means that a variable is a service provided by Angular
	//$scope, then, is called scope service

	//after the declarative name, the following array takes args and a function object
	//the args should be the ones received by the function in respective order
	//this protects the code from being broken by minifying
	//.controller('MyFirstController', ['$scope', MyFirstController]);

	//minification is the removal of any unnecessary characters from the code
	//but keeping it's functionality
	//it is used for reducing bandwidth when downloading the code

	//a better way of injecting those dependencies and also protecting it from minifying
	//is calling the $inject service upon the function before it is called
	.controller('MyFirstController', MyFirstController);

	MyFirstController.$inject = ['$scope'];

	function MyFirstController($scope)
	{
		$scope.directString = "String defined at $scope";

		$scope.functionString = function(){
			return "String returned by a function defined at $scope";
		};

		$scope.inputString = "Change me!";
	}

})();

//minified version of the previous code
//!function(){"use strict";function n(n){n.directString="String defined at $scope",n.functionString=function(){return"String returned by a function defined at $scope"},n.inputString="Change me!"}angular.module("MyAngularApp",[]).controller("MyFirstController",n),n.$inject=["$scope"]}();