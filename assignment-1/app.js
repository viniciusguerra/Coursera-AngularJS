(function(){
	'use strict'

	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope)
	{
		$scope.lunchInput = '';
		$scope.resultMessage = noData;
		$scope.resultStyle = errorStyle;

		var noData = 'Please enter data first';
		var tooMuch = 'Too Much!';
		var enjoy = 'Enjoy!';

		var okayStyle = 'Okay';
		var errorStyle = 'Error';

		$scope.CheckInput = function()
		{
			var trimmedInput = $scope.lunchInput.trim();

			if(trimmedInput.length === 0)
			{
				$scope.resultMessage = noData;
				$scope.resultStyle = errorStyle;

				return;
			}

			var rawSplitInput = trimmedInput.split(',');

			var splitInput = [];

			for(var i = 0; i < rawSplitInput.length; i++)
			{
				if(rawSplitInput[i].trim() && rawSplitInput[i].length > 0)
				{
					splitInput.push(rawSplitInput[i].trim());
				}
			}

			if(splitInput.length <= 3)
			{
				$scope.resultMessage = enjoy;
				$scope.resultStyle = okayStyle;
			}
			else
			{
				$scope.resultMessage = tooMuch;
				$scope.resultStyle = okayStyle;
			}

			console.log(splitInput);
		};
	};
})();