var app = angular.module('foodApp', [ 'siyfion.sfTypeahead', 'ui.bootstrap', 'ngRoute', 'chart.js', 'infinite-scroll', 'ngResource', 'ngStorage']);

var foodSearchApi= 'https://test.holmusk.com/food/search'; //search api url
var flikerApi = 'http://api.flickr.com/services/feeds/photos_public.gne'; //fliker image search api

app .config(['$routeProvider', function($routeProvider) {

    $routeProvider.
      when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'foodSearchCrtl'
      }).
      when('/result', {
        templateUrl: 'templates/result.html',
        controller: 'resultCrtl'
      }).
      when('/search', {
        templateUrl: 'templates/search_result.html',
        controller: 'searchCrtl'
      }).
       when('/mydata', {
        templateUrl: 'templates/my_data.html',
        controller: 'mydataCtrl'
      }).
      otherwise({
        redirectTo: '/home',
        controller: 'homeCtrl'
      });

    
 }]);

/*
*	search results controller
*	 
*/
app.controller('searchCrtl', ['$scope', '$http', 'foodItemSrv', 'searchSrv', 'foodSearchSrv', function($scope, $http, foodItemSrv, searchSrv, foodSearchSrv ){

	$scope.$watch(foodSearchSrv.getFoodSearch, function (newValue, oldValue) { //changed query realod everything 

		searchSrv.async(newValue).then(function(data) {
		    $scope.searchData = data;
		});

	});
	

}
]);

/*
*	user temp storage controller
*	 
*/
app.controller('mydataCtrl', ['$scope', '$localStorage',  function($scope, $localStorage ){

	$scope.$watch($localStorage.myDiaryStore, function (newValue, oldValue) { // watch for changed query realod everything 
		$scope.myData = angular.fromJson($localStorage.myDiaryStore);
		//console.log($scope.myData);

		//TODO check simulate the user login functions
		$scope.username = "sara"; 

	});
	
	
}
]);

/*
*	result view controller
*	graphs and details view
*	 
*/
app.controller('resultCrtl', ['$scope', '$http', '$timeout', '$localStorage', 'foodItemSrv', 'Flickr', 'searchSrv',   function($scope, $http, $timeout, $localStorage, foodItemSrv, Flickr, searchSrv){

		var result = foodItemSrv.getFoodItem(); //food item
		var _self = this;
		$scope.series = ['total_carbs', 'total_fats', 'Protein'];
		$scope.calories_labels = ["Carbohydrate", "Fat", "Protein"];
		$scope.showModal = false;
		$scope.statusText = "";

		//form dates  init
		var today = new Date();
		$scope.dates =  [ 
							{ 
								'text' : 'Yesterday',
								'value' : today.setDate(today.getDate() - 1) 
							},
							{
								'text' : 'Today',
								'value' : today.setDate(today.getDate() + 1)
							}, 
							{
								'text' : 'Tomorrow',
								'value' : today.setDate(today.getDate() + 1) 
							}, 
							 
						];

		$scope.$watch(foodItemSrv.getFoodItem, function (newValue, oldValue) { // watch for food item changes - reload the values
		       
		    result = newValue;
        	
        	$scope.portions = result.portions;
			$scope.food_name = result.name;
			$scope.brand_name = result.brand_name;
			_self.newItem = {};
			_self.newItem.description = result.name;

			if(!angular.isUndefined(result.portions) )
			{
				$scope.portion_des = result.portions[0]; // get all portions details

				$scope.calories_data =  getCaloriesBreakdown($scope.portion_des.nutrients.important); //get summary of fat, carbs, prot

			}
			else{
				$scope.portion_des =  [];
			}		
			
	 		
			var carbs = [];
			var fats = [];
			var prot = [];

			$scope.labels = [];	
			$scope.data = [];

			//add to chart data - line chart
			angular.forEach(result.portions, function(item) {
		     	$scope.labels.push(item.name);
		     	carbs.push(item.nutrients.important.total_carbs.value);
		     	fats.push(item.nutrients.important.total_fats.value);
		     	prot.push(item.nutrients.important.protein.value);
		     	
		    });

		    $scope.data.push(carbs);
		    $scope.data.push(fats);
		    $scope.data.push(prot);

		    //grab images from flickr :TODO redefine search query for fliker
		    var flk_query='';
		   	if(!angular.isUndefined($scope.food_name) )
		   	{
		   		if( $scope.food_name.replace(',', ' ').split(' ').length > 2 )
			    {
			    	flk_query =  $scope.food_name.substr(0, $scope.food_name.indexOf(" "));
			    }
			    else
			    {
			    	flk_query =  $scope.food_name.replace(',', ' ');
			    }
		   	}
		    
		    if(flk_query != '') //avoid requests
		    {
		    	//call fliker service
			    Flickr.search(flk_query).then(function(resp) {
			      $scope.photos = resp;
			      //console.log($scope.photos);
			    });

			    //related food items
			    searchSrv.async(flk_query).then(function(data) {
				    $scope.relatedFoodItems = data;
				    //console.log(d);
				});
		    }
		    

		    //set magnific pop up after loading images
		    $timeout(function() {
			    $('.gallery').each(function() {
			      $(this).magnificPopup({
			        delegate: '.magnific-image-link',
			        type:'image',
			        gallery: {
			         enabled: true
			        }
			     });
			    });
			});

		});

		//line chart click event - future 
		$scope.onClick = function (points, evt) {
		    console.log(points, evt);
		};

		  
		// verify object
		$scope.isEmpty = function (obj) {	  		
	  		 
	  		for(var i in obj){ 
	  		 	return true;
	  		}
			return false;
		};

		//get portion details from food item obj
		$scope.loadData = function (index) {
		  		$scope.portion_des = $scope.portions[index]; // get portions and nutritions info
		  		$scope.calories_data = getCaloriesBreakdown($scope.portion_des.nutrients.important);
		};

		//save data to localstorage
		this.save = function(newItem){
			 $scope.statusText = 'saved';
       		 $scope.showModal = !$scope.showModal;
			 //console.log( newItem.date);

			 newItem.username = "sara"; //simulate login details TODO: login

			//get the data from local stroage
			var tempStore = angular.fromJson($localStorage.myDiaryStore);
			var temp = [];
			if(!angular.isUndefined(tempStore))
			{
				temp = tempStore;
			}
			temp.push(newItem);
			 //save back to storage
			$localStorage.myDiaryStore = angular.toJson(temp) ;
		}; 

		 
	}
]);

/*
*	autocomplete search view controller
*	 
*/
app.controller('foodSearchCrtl', ['$scope', '$http', '$location', 'foodItemSrv', 'foodSearchSrv', function($scope, $http, $location, foodItemSrv, foodSearchSrv){

	var self = this;
	$scope.selectedFood = null;
  
  	// instantiate the bloodhound suggestion engine
  	var foodItemsBound = bindSearchEngine();

	  // initialize the bloodhound suggestion engine
	foodItemsBound.initialize();
	  
	$scope.foodDataset = {
	    displayKey: 'name',
	    source: foodItemsBound.ttAdapter()
	};
	  
	  // Typeahead options object
	$scope.FoodSearchOptions = {
	    highlight: true
	};
 
	//search item result could be str or obj
	this.searchFood = function(query){
		
		//check result is object or str - avoid http request
		if( angular.isObject(query) )
		{
			
			foodItemSrv.setFoodItem(query); // save the result obj to temp store
			$location.path( "/result");					

		}
		else
		{

  			foodSearchSrv.setFoodSearch(query); // save query str
  			$location.path( "/search")

		}
		
		
	}

}
]);


/*
*	home controller
*	 
*/
app.controller('homeCtrl', ['$scope', '$localStorage',  function($scope, $localStorage ){

	//TODO check simulate the user login functions
	$scope.username = "sara"; 	
	
}
]);

//convert mg to grams
var convertTog = function(unit, value) {

	if(unit == 'mg')
	{
		value = value / 10; //convert to g
	}

	return value;
}

//for pie chart data
var getCaloriesBreakdown = function(nutrients) {
	
	var cabo = nutrients.total_carbs.value;
	var fats = nutrients.total_fats.value;
	var protein = nutrients.protein.value;

	cabo = convertTog(nutrients.total_carbs.unit, cabo);
	fats = convertTog(nutrients.total_fats.unit, fats);
	protein = convertTog(nutrients.protein.unit, protein);

	var total = cabo + fats + protein;
	return [ Math.round( (cabo / total) * 100) , Math.round( (fats / total) * 100) , Math.round( (protein / total) * 100) ];

}

//shared food item obj 
app.factory('foodItemSrv', function(){
   
   var foodItem ={};

   	var setFoodItem = function(newObj) {
      foodItem = newObj;
  	};

  	var getFoodItem = function(){
      return foodItem;
  	};

  	return {
    	setFoodItem: setFoodItem,
    	getFoodItem: getFoodItem
  	};

});

// bloodhound search engine - autocomplete
var bindSearchEngine = function(){

	// instantiate the bloodhound suggestion engine
  	var foodItemsBound = new Bloodhound({

	    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
	    queryTokenizer: Bloodhound.tokenizers.whitespace,
	     limit: 10,
	     minLength: 3,
		 remote: {
	        url: foodSearchApi,
	        replace: function (url, query) {
	            return url + '/?q=' + query;
	        },
	        filter: function (items) {
	  			return items; // TODO: filter dubs
	        }
	    }

    });

    return foodItemsBound;
}

//http request serveice
app.factory('searchSrv', function($http) {
  	var myService = {
    	async: function(query) {
      		// $http returns a promise, which has a then function, which also returns a promise
      		var promise = $http.get(foodSearchApi + '/?q=' + query).then(function (response) {
        	// The then function here is an opportunity to modify the response
        	//console.log(response);
        	// The return value gets picked up by the then in the controller.
        	return response.data;
      	});
      	// Return the promise to the controller
      	return promise;
    	}
  	};
  return myService;
});

//shared search query for resue 
//cause of query string does not work well with angular routing
app.factory('foodSearchSrv', function(){
   
   var queryString ='';

   	var setFoodSearch = function(newObj) {
      queryString = newObj;
  	};

  	var getFoodSearch = function(){
      return queryString;
  	};

  	return {
    	setFoodSearch: setFoodSearch,
    	getFoodSearch: getFoodSearch
  	};

});

//fliker api service
app.factory('Flickr', function($resource, $q) {
  var photosPublic = $resource(flikerApi, 
      { format: 'json', jsoncallback: 'JSON_CALLBACK' }, 
      { 'load': { 'method': 'JSONP' } });
      
  return {
    search: function(query) {
      var q = $q.defer();

      photosPublic.load( {	tags: query }, function(resp) {
        	q.resolve(resp);
      }, function(err) {
        	q.reject(err);
      })
      
      return q.promise;
    }
  }
});

//show model dialogs bootstrap
app.directive('modal', function () {
    return {
	      templateUrl: 'templates/model_dir.html',
	      restrict: 'E',
	      transclude: true,
	      replace:true,
	      scope:true,
	      link: function postLink(scope, element, attrs) {
	          	
	          	scope.$watch(attrs.visible, function(value){
		          if(value == true)
		            $(element).modal('show');
		          else
		            $(element).modal('hide');
	        	});

		        $(element).on('shown.bs.modal', function(){
			          scope.$apply(function(){
			            	scope.$parent[attrs.visible] = true;
			          });
		        });

		        $(element).on('hidden.bs.modal', function(){
			          scope.$apply(function(){
			            	scope.$parent[attrs.visible] = false;
			          });
		        });
	      	}
    	};
 });

//search enter key event binding
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) { //enter key press bind
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});