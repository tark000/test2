angular.module('realty').controller('SearchAdvertController',['$rootScope','$scope','Options',
    '$q','$stateParams','$state','$http', '$location', '$log','RegionSearch',
    function($rootScope,$scope,Options,$q,$stateParams,$state,$http,$location,$log,RegionSearch){

        var options  = Options;


        options.categories.then(function(data){

            $scope.categories = data.categories;
//            $scope.category = $scope.categories[$stateParams.category-1];
//            console.log("categories",angular.toJson($scope.categories));
            $scope.category = []
            if ($stateParams['category']){
                angular.forEach($stateParams['category'].split(","), function(c) {
                    angular.forEach($scope.categories , function(a) {
                        if (parseFloat(a.id) == parseFloat(c) ){
                            $scope.category.push(a);
                        }
                    });
                });
            }
        })

        //defin adaptive width windows
//        $scope.width = window.innerWidth;
//        function tellAngular() {
//
//            $scope.$apply(function() {
//                $scope.width = window.innerWidth;
//                $scope.height = window.innerHeight;
//            });
//        }
//
////first call of tellAngular when the dom is loaded
//        document.addEventListener("DOMContentLoaded", tellAngular, false);
//
////calling tellAngular on resize event
//        window.onresize = tellAngular;

        //

//        options.operations.then(function(data){
//           // $log.debug("data.operations", data.operation_types);
//            $scope.operations = data.operation_types;
//            $scope.operation = $scope.operations[$stateParams.operation-1];
//        })

/*

        $scope.operations = options.operations.then(function(data){
            $scope.operations = data.operation_types;
        })
*/


        $scope.cities = options.cities.then(function(data){
            $scope.cities = data.cities;

        })


        $scope.params = [];
        $scope.guests = {items: []}
        RegionSearch.query({}).then(function(data){
            //            $scope.regions = data;
//            console.log("$scope.regions.data",$scope.regions)


            if ($stateParams['city'] ){
//                console.log("paramsCity");
                angular.forEach($stateParams['city'].split(","), function(c) {
                    $scope.params.push(c);

                });
//                console.log("paramsCity",$scope.params);
            }



            $scope.regions = data;
            angular.forEach($scope.regions,function(reg){
                var cities1 = [];
                angular.forEach(reg.catalog, function(city){
//                    console.log('params1',$scope.params)
//                    cities1.push({id:city.id, name:city.name})
                    if ($scope.params == []){
                        cities1.push({id:city.id, name:city.name})
                    }else {
                        var found = false;

                        angular.forEach($scope.params ,function(id){
                            if(id == city.id){

                                found = true;
                            }
                        })
                        if (found == true){
                            cities1.push({id:city.id, name:city.name, "checked": true})
                            console.log("kiev")
                        } else if (found == false){
                            cities1.push({id:city.id, name:city.name})
                        }


                    }



                })
                $scope.guests.items.push({name:reg.name, items:cities1, show:false})

            })

            console.log("$scope.guests",$scope.guests)
        })


//        $scope.params = [];
//        $scope.guests = {items: []}
//        $scope.regions = options.regions.then(function(data){
//
////            $scope.regions = data;
//            console.log("$scope.regions.data",$scope.regions)
//
//
//            if ($stateParams['city'] ){
//                console.log("paramsCity");
//                angular.forEach($stateParams['city'].split(","), function(c) {
//                    $scope.params.push(c);
//
//                });
//                console.log("paramsCity",$scope.params);
//            }
//
//
//
//            $scope.regions = data;
//            angular.forEach($scope.regions,function(reg){
//                var cities1 = [];
//                angular.forEach(reg.catalog, function(city){
////                    console.log('params1',$scope.params)
////                    cities1.push({id:city.id, name:city.name})
//                    if ($scope.params == []){
//                        cities1.push({id:city.id, name:city.name})
//                    }else {
//                        var found = false;
//
//                        angular.forEach($scope.params ,function(id){
//                            if(id == city.id){
//
//                                found = true;
//                            }
//                        })
//                        if (found == true){
//                            cities1.push({id:city.id, name:city.name, "checked": true})
//                        } else if (found == false){
//                            cities1.push({id:city.id, name:city.name})
//                        }
//
//
//                    }
//
//
//
//                })
//                $scope.guests.items.push({name:reg.name, items:cities1, show:false})
//
//            })
//
//
//        })

        $scope.metro_stations = options.metro_stations.then(function(data){
            $scope.metro_stations = data;
//            $scope.metro = $scope.metro_stations[$stateParams.metro - 3];
            $scope.metro = []
            if ($stateParams['metro']){
                angular.forEach($stateParams['metro'].split(","), function(c) {
                    angular.forEach($scope.metro_stations , function(a) {
                        if (parseFloat(a.id) == parseFloat(c) ){
                            $scope.metro.push(a);
                        }
                    });
                });
            }
        })

        $scope.search = function(){
            var city = '';
            $log.debug("$scope.search.city.val",$scope.search.city);
            if(angular.isDefined($scope.search.city)){
                city =   $scope.search.city.filter(function(elem, pos) {
                    return $scope.search.city.indexOf(elem) == pos;
                })
            }

            $location.path('/search');
            $location.search('category',$scope.search.category);
            $location.search('metro',$scope.search.metro);
            $location.search('operation',$scope.search.operation);
            $location.search('price_min',$scope.search.price_min);
            $location.search('price_max',$scope.search.price_max);
            $location.search('area_min',$scope.search.area_min);
            $location.search('area_max',$scope.search.area_max);
            $location.search('living',$scope.search.living);
            $location.search('by_all',$scope.search.by_all);
            $location.search('map',$scope.search.map);
            $location.search('commission',$scope.search.commission);
            $location.search('city',cityArray);
            $location.search('page',"1");
            $location.search('free',$scope.search.free);
        }


        $scope.area_min = $scope.search.area_min
        $scope.area_max = $scope.search.area_max
        $scope.marking = $scope.search.marking

        $scope.area_min = 0;
        $scope.area_max = 1000;
        $scope.startMinArea = 0;
        $scope.startMaxArea = 1000;


        //area
        if ($stateParams['area_min'] == null){
            $scope.area_min = 0;
        }else{
            $scope.area_min = $stateParams['area_min'];
        }

        if ($stateParams['area_max'] == null){
            $scope.area_max = 1000;
        }else{
            $scope.area_max = $stateParams['area_max'];
        }

        $scope.sliderStep = 1;

        $scope.mouse = true;
        $scope.$watch('mouse', function(newVal, oldVal) {
            console.log("mouse vel",newVal)
            $scope.$watch('area_max', function(newVal, oldVal) {
                if ($scope.startMaxArea != $scope.area_max && $scope.mouse == true){
                    $location.path('/search');
                    $location.search('area_max',$scope.area_max);
                    $location.search('area_min',$scope.area_min);
                }

            });

            $scope.$watch('area_min', function(newVal, oldVal) {
                if ($scope.startMinArea != $scope.area_min && $scope.mouse == true){
                    $location.path('/search');
                    $location.search('area_max',$scope.area_max);
                    $location.search('area_min',$scope.area_min);
                }
            });

        });

        $scope.search.map = 0;
        $scope.search.living = '';
        $scope.search.free = 1;
        $scope.search.by_all = 1;
        $scope.search.commission = 1;

        //price

        if ($stateParams['price_min'] == null){

            $scope.price_min = null;
        }else{
            $scope.price_min = $stateParams['price_min'];
        }

        if ($stateParams['price_max'] == null){
            $scope.price_max = null;
        }else{
            $scope.price_max = $stateParams['price_max'];
        }

        //clean form
        $scope.clean = function(){
            $location.search({});
        }
        $scope.cleanMobile = function(){
            $location.path("/adverts");
            $location.search({});
        }
        //living default value and defin current value
        $scope.search.living = "";
        $scope.living = "";
        if ($location.search().living != null){
//            console.log("location living",$location.search().living)
            $scope.living = $location.search().living;
        }

        //by_all default value and
        $scope.search.by_all = 1;
        $scope.by_all = 1;
        if ($location.search().by_all != null){
//            console.log("location by_all",$location.search().by_all)
            $scope.by_all = $location.search().by_all
        }

//
        if ($location.search().commission != null){

            if($location.search().commission == 1){
                $scope.search.commission = 1;
            } else if ($location.search().commission == 0){
                $scope.search.commission = 0;
            }
//            console.log("location commission",$location.search().commission)
//            $scope.search.commission = $location.search().commission
        }

        $scope.changeCommission = function(){
            $location.path('/search');
            if($scope.search.commission == 0){
//                console.log("temp == 0",temp == 0)
                $location.search('commission',1);
                $scope.search.commission = 1;
            } else{
                $location.search('commission',0);
                $scope.search.commission = 0;
            }
        }



        //search by id
        $scope.search.marking = $stateParams['marking'];
        $scope.searchMarking = function(){
            console.log("marking",$scope.search.marking)
            if ($scope.search.marking != null){
                $location.path('/search');
                $location.search({'marking':$scope.search.marking});
            }

        }


        $scope.$on('handleBroadcastAdvert', function(val,total) {
//            searchCities = total;
            $location.path('/search');
            $location.search('solr',total.term);

        });

        if ($location.search().operation != null){
            $scope.operation = $location.search().operation;
        }
        if ($location.search().free != null){
            $scope.free = $location.search().free;
        }

        $scope.mapClick = function(velue){
            console.log("value",velue)
//            $location.path('/search');
            if(velue == 0){
                $location.path('/search');
                $location.search('map',1);
                $scope.search.map= 1;
            } else{
                $location.path('/search');
                $location.search('map',0);
                $scope.search.map = 0;
            }


//            $location.search('map',velue);
        }

        if ($location.search().map == 1){
            $scope.search.map = 1;
        }


        //city
        $scope.btns = [
            {
                "label":"Drop Button 2",
                "chk":true,
                "items": $scope.guests
            }
        ];

        function findRoomById(id) {
            var i, options = $scope.rooms.items;
            for (i in options) {
                if (options[i].id == id) {
                    return options[i];
                }
            }
            return null;
        }
        $scope.populateDropdown = function (res) {
            var id, room, s = "";
            for (id in res) {
                if (res[id]){
                    room = findRoomById(id);
                    if (room != null) {
                        s += room.name + ", ";
                    }
                }
            }
            if (s.length > 19) {
                $scope.label = s.substring(0,17)+"...";
            } else if (s.length > 2) {
                $scope.label = s.substring(0, s.length - 2);
            }
        }

        $scope.processRes = function (res) {
            var prop;
            if (typeof(res) === "string") {
                alert(res);
            } else {
                var s = "";
                for(prop in res){
                    s += prop + ":" + res[prop] + ",";
                }
                alert(s);
            }
        };


        $scope.isOn = function (btn) {
            return btn.chk;
        };

        var cityArray = '';
        $scope.$on('handleBroadcastCity', function(val,total) {
            cityArray = '';
            if (total){
                angular.forEach(total,function(vel){
                    if (cityArray == ''){
                        cityArray = vel
                    }else{
                        cityArray = cityArray + "," + vel
                    }
                })
            }

        });


        $scope.$watch('category', function(newVal, oldVal) {
            console.log("category newVal",newVal);
            var array = '';
//            console.log("newVal",newVal)
            angular.forEach(newVal, function(category) {

                if (array == ''){
                    array = category.id
                }else{
                    array = array + "," + category.id
                }
            });
            if ($location.path() == "/adverts"){
                $scope.search.category = array;
            } else if(newVal != oldVal && oldVal ){
                $location.path('/search');
                $location.search('category',array);
            }


        });

        $scope.$watch('metro', function(newVal, oldVal) {
            console.log("metro newVal",newVal);
            var array = '';
            angular.forEach(newVal, function(metro) {
                if (array == ''){
                    array = metro.id
                }else{
                    array = array + "," + metro.id
                }
            });
            if ($location.path() == "/adverts"){
                $scope.search.metro = array;
            } else if (newVal != oldVal && oldVal ){
                $location.path('/search');
                $location.search('metro',array);
            }
        });




    }])
