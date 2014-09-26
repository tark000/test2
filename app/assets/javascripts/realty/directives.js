angular.module('Search', [])
    .directive('selectBind',['$state','$stateParams','$log','Search',function ($state,$stateParams,$log,Search) {
        return {
            restrict: "A",
            scope:true,
            link: function (scope, el, attrs) {
                scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                    $log.debug('newValue =', newValue);
                    $log.debug('oldValue =', oldValue);

                    if(!angular.equals(oldValue, newValue) && $state.current.name!='index'){
                        var params = {}
                        //Search.setList(attrs.ngModel,newValue);
                        //var t = Search.getList();
                        params[attrs.ngModel] = newValue.id;
                        $state.go('search',params);
                    }

                    //if(typeof(v.type) != "undefined" || v!="" || v!=0){
                        //var params = []
                        //Search.setList(attrs.ngModel,v.id);

                        /*angular.forEach(v, function(value, key){
                            //params.push(value.id);
                            Search.setList(attrs.ngModel,value.id)
                            $log.debug("value", value);
                        });*/

                        //Search.setList(attrs.ngModel,params.join(','));
                        //var t = Search.getList();
                        //$state.go('search',t);

                        //$log.debug('params = ' + params.join(','));
                        //$log.debug('service =', t);
                    //}

                });
            }
        }
    }])
    .directive('inputBind', ['$state','$stateParams','$log',function ($state,$stateParams,$log) {
        return {
            restrict: "C",
            scope:true,
            link: function (scope, el, attrs) {
                el.bind('change', function (event) {

                    $log.debug("scope", scope);
                    //console.log("attrs", attrs);
                    //console.log("attrs param", attrs.value);
                    /* if(angular.isDefined(attrs.value)){
                     scope.$emit("search_change",{ model: attrs.ngModel, value: attrs.value})
                     }*/
                    if($state.current.name!='advert' ){
                        var params = {};
                        params[attrs.ngModel]=scope[attrs.ngModel];
                        params['page']=0;
                        scope.$apply(function () {
                            $state.go('search',params);
                        })
                    }
                })
            }
        }
    }])
    .directive('inputRadio', ['$state','$stateParams','$log',function ($state,$stateParams,$log) {
        return {
            restrict: "C",
            scope:true,
            link: function (scope, el, attrs) {
                el.bind('change', function (event) {
                    console.log("work223")
                    $log.debug("scope1", scope);

                    console.log("attrs", attrs);
                    console.log("attrs param", attrs.value);
                    /* if(angular.isDefined(attrs.value)){
                     scope.$emit("search_change",{ model: attrs.ngModel, value: attrs.value})
                     }*/
                    if($state.current.name!='adverts'   ){
                        var params = {};
                        params[attrs.ngModel]=attrs.value;

                        console.log("params", params);
                        scope.$apply(function () {
                            $state.go('search',params);
                        })
                    }
                })
            }
        }
    }])
    .directive('inputCheckbox ', ['$state','$stateParams','$log',function ($state,$stateParams,$log) {
        return {
            restrict: "C",
            scope:true,
            link: function (scope, el, attrs) {
                el.bind('change', function (event) {

                    $log.debug("scope1", scope);

                    console.log("attrs", attrs);
                    console.log("attrs param", attrs.value);
                    /* if(angular.isDefined(attrs.value)){
                     scope.$emit("search_change",{ model: attrs.ngModel, value: attrs.value})
                     }*/
                    if(($state.current.name=='show'  || $state.current.name=='search') ){
                        var params = {};
                        params[attrs.ngModel]=attrs.value;

                        console.log("params", params);
                        scope.$apply(function () {
                            $state.go('search',params);
                        })
                    }
                })
            }
        }
    }])
    .directive('documentClick', ['$document', '$parse',function ($document, $parse) {

        var linkFunction = function ($scope, $element, $attributes) {
            console.log("work")
            var scopeExpression = $attributes.documentClick;
            var invoker = $parse(scopeExpression);

            $document.on('click', function (event) {

                $scope.$apply(function () {
                    invoker($scope, { $event: event });
                });

            });

        };

        return linkFunction;

    }])
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]).directive('numbersOnly', function(){
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {
                    // this next if is necessary for when using ng-required on your input.
                    // In such cases, when a letter is typed first, this parser will be called
                    // again, and the 2nd time, the value will be undefined
                    if (inputValue == undefined) return ''
                    var transformedInput = inputValue.replace(/[^0-9]/g, '');
                    if (transformedInput!=inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    })
    .directive('uiPagination',['$location', function ($location) {
        return {
            restrict: 'EA',
            replace: true,
            scope:true,
            template:
                '<div>' +
                    '<ul class="pagination">' +
                    '<li ng-class="{disabled: firstPage()}" ng-click="goToFirstPage()">' +
                    '<a><i class="icon-step-backward"></i></a>' +
                    '</li>' +
                    '<li ng-class="{disabled: !hasPrev()}" ng-click="prev()">' +
                    '<a><i class="arrow"></i></a>' +
                    '</li>' +
                    '<li ng-repeat="page in pages"' +
                    'ng-class="{active: isCurrent(page)}"' +
                    'ng-click="setCurrent(page)"' +
                    '>' +
                    '<a>{{page}}</a>' +
                    '</li>' +
                    '<li ng-class="{disabled: !hasNext()}" ng-click="next()">' +
                    '<a><i class="icon-caret-right"></i></a>' +
                    '</li>' +
                    '<li ng-class="{disabled: lastPage()}" ng-click="goToLastPage()">' +
                    '<a><i class="icon-step-forward"></i></a>' +
                    '</li>' +
                    '</ul>' +
                    '</div>',
            scope: {
                cur: '=',
                total: '=',
                display: '@'
            },
            link: function (scope, element, attrs) {

                console.log("scope total", scope.total);

                var calcPages = function () {
                    var display = +scope.display;
                    var delta = Math.floor(display / 2);
                    scope.start = scope.cur - delta;
                    if (scope.start < 1) {
                        scope.start = 1;
                    }
                    scope.end = scope.start + display - 1;
                    if (scope.end > scope.total) {
                        scope.end = scope.total;
                        scope.start = scope.end - (display - 1);
                        if (scope.start < 1) {
                            scope.start = 1;
                        }
                    }

                    scope.pages = [];
                    console.log("scope end", scope.end);
                    for (var i = scope.start; i <= scope.end; ++i) {
                        scope.pages.push(i);
                    }
                };
                scope.$watch('cur', calcPages);
                scope.$watch('total', calcPages);
                scope.$watch('display', calcPages);

                scope.isCurrent = function (index) {
                    //console.log("index page", index);
                    return scope.cur == index;
                };

                scope.setCurrent = function (index) {
                    console.log("set  index page", index);
                    $location.search('page',index)
                    scope.cur = index;
                };

                scope.hasPrev = function () {
                    return scope.cur > 1;
                };
                scope.prev = function () {
                    if (scope.hasPrev()) scope.cur--;
                };

                scope.hasNext = function () {
                    return scope.cur < scope.total;
                };
                scope.next = function () {
                    if (scope.hasNext()) scope.cur++;
                };

                scope.firstPage = function () {
                    return scope.start == 1;
                };
                scope.goToFirstPage = function () {
                    if (!scope.firstPage()) scope.cur = 1;
                };
                scope.lastPage = function () {
                    return scope.end == scope.total;
                };
                scope.goToLastPage = function () {
                    if (!scope.lastPage()) scope.cur = scope.total;
                };
            }
        };
    }]);