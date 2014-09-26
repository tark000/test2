'use strict';

angular.module('pbComponents', [])
    /**
     * @ngdoc directive
     * @name ngTreeBtn
     *
     * @description
     * The 'ngTreeBtn' directive instantiates a template with the multi-select drop-down.
     * Drop-down is marked up as a Bootstrap button with a caret.
     * Checked state of options is kept in local object checkMarks
     *
     * @element - any
     * @param ng-tree-btn - data object with dropdown options tree;
     *     each leaf of the tree is selectable and has to have an "id" property.
     * @param label - the text on the button
     * @param btnCls - additional style class(es) for the button
     * @param callback - function which takes selection results as object with
     *     property names as tree leaves' ids and values as boolean "checked" status
     *     example of result argument passed to callback: {"123":true,"763":false,"2":true}
     * @param enabled - function used to determine enabled/disabled state
     *
     * @author pbosin
     */
    .directive('ngTreeBtn', [function () {
        return {
            scope: {
                options: '=ngTreeBtn',
                test: '=test',
                handleRes: '&callback',
                label: '@',
                isEnabled: '&'
            },
            controller: ["$scope", "$attrs","$rootScope","$location","$stateParams", function($scope, $attrs,$rootScope,$location,$stateParams) {

                $scope.btnCls = $attrs.btncls;
                console.log("$scope.options",$scope.options)
//                console.log("$scope.options",$scope.options.items)


                $scope.hasChildren = function (item) {
                    return (typeof(item.items) !== "undefined" && item.items.length > 0);
                };

                $scope.newTest = [];
                console.log("$scope.newTest1",$scope.newTest)
                $scope.toggleDrop = function () {
                    console.log("checkMarks2",checkMarks)
//                    checkMarks = initChks($scope.options.items);
                    if ($scope.isEnabled()) {
                        $scope.opened = !$scope.opened;
                    }

                    $scope.newTest = [];
                    angular.forEach($scope.options.items,function(item){
                        angular.forEach(item.items, function(city){
                            console.log("city",isChecked(city))
                            if (isChecked(city)){
                                item.show = true;
                                $scope.newTest.push(city.id);
                            }
//

                        })
                    })
                    $rootScope.$broadcast('handleBroadcastCity',$scope.newTest);





                    if ($location.path() != '/adverts' && $scope.opened == false && window.innerWidth > 768){
                        var cityArray = '';
                        angular.forEach($scope.newTest,function(vel){
                            if (cityArray == ''){
                                cityArray = vel
                            }else{
                                cityArray = cityArray + "," + vel
                            }

                        })
                        $location.path('/search');
                        $location.search('city',cityArray);

                    }

                };

                function isChecked (obj) {
                    var i;
                    if (!obj || typeof(obj) === "undefined") {
                        return false;
                    }
                    if (typeof(obj.items) === "undefined" || obj.items.length == 0) {
                        //tree leaf
                        return typeof(obj.id) !== "undefined" && checkMarks[obj.id];
                    } else {
                        //traverse children
                        for (i in obj.items) {
                            if (! isChecked(obj.items[i])) {
                                return false;
                            }
                        }
                        return true;
                    }
                }
                $scope.checked = function (item) {
                    return isChecked(item);
                };

                function setItemCheck (obj, newState) {
                    var i;
                    if ($scope.hasChildren(obj)) {
                        for (i in obj.items) {
                            setItemCheck(obj.items[i], newState);
                        }
                    } else {
                        checkMarks[obj.id] = newState;
                    }
                }
                $scope.selectItem = function (obj) {
                    var newState = !isChecked(obj);
                    setItemCheck(obj, newState);

                    return false;
                };

                function saveResult(obj, result) {
                    var i;
                    if ($scope.hasChildren(obj)) {
                        for (i in obj.items) {
                            saveResult(obj.items[i], result);
                        }
                    } else {
                        result["" + obj.id] = checkMarks[obj.id];
                    }
                }
                $scope.confirmMulti = function () {
                    var result = {};
                    saveResult($scope.options,result);
                    $scope.toggleDrop();
                    $scope.handleRes({res:result});
                };

                function addChk(chks, item) {
                    var i;
                    if (typeof(item) !== "undefined" && $scope.hasChildren(item)) {
                        for (i in item.items) {
                            addChk(chks,item.items[i]);
                        }
                    } else {
                        chks[item.id] = (typeof(item.checked) !== "undefined" && item.checked);
                    }
                }
                function initChks(items) {
                    console.log("initChks ",items)
                    var chks = {}, i;
                    if (typeof(items) !== "undefined") {
                        for (i in items) {
                            addChk(chks,items[i]);
                        }
                    }
                    return chks;
                }
                var params = {}
                if ($stateParams['city'] ){
//
                    angular.forEach($stateParams['city'].split(","), function(c) {
                        params[c] = true;

                    });
                    var checkMarks = params;
                } else {
                    var checkMarks = initChks($scope.options.items);
                }

                console.log("checkMarks1",checkMarks)
//                $scope.showList = function(item){
//                    console.log("item",item);
//                    if (item.show){
//                        item.show = !;
//                    }
//
//                }
//                $scope.testValue = 12;
//                angular.forEach($scope.options.items,function(item){
//                    angular.forEach(item.items, function(city){
//                        console.log("city",isChecked(city))
//                        if (isChecked(city)){
//                            $scope.newTest.push(city.id);
//                        }
////
//
//                    })
//                })
                console.log("$scope.newTest2",$scope.newTest)
                if ($location.path() == '/search' && $scope.opened == false){
                    var cityArray = '';
                    angular.forEach($scope.newTest,function(vel){
                        if (cityArray == ''){
                            cityArray = vel
                        }else{
                            cityArray = cityArray + "," + vel
                        }
                    })
                }

                $scope.mouse = false;
                $scope.click = function (e) {
                    if ($scope.opened == true && $scope.mouse == false){
                        $scope.toggleDrop();
                    }
                };

                $scope.$on('handleBroadcastCityClose', function(val,total) {
                    if ($scope.opened == true && $scope.mouse == false && total){
                        $scope.toggleDrop();
                    }
                });


                $scope.$on('handleClickOutside', function(val1, value) {
                    if ($scope.opened == true && $scope.mouse == false){
                        $scope.toggleDrop();
                    }
                })

            }],
            templateUrl: '/assets/layouts/ng-tree-btn.html'
        }
    }])

