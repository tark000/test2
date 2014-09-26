angular.module('realty').config(['$locationProvider',function($locationProvider) {
    return $locationProvider.html5Mode(true);

}]);
angular.module('realty').config(['$httpProvider',function($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

}]);

angular.module('realty').config(['$routeProvider','$stateProvider','$urlRouterProvider',
    function($routeProvider,$stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise("/adverts");

        $stateProvider
            .state("default", {
                abstract: true, // root route
                views: {
                    "footer": {
                        controller: "InfoController",
                        templateUrl: "/assets/layouts/_footer.html"

                    },
                    "top": {
                        controller: "InfoController",
                        templateUrl: "/assets/layouts/_top_bar.html"

                        //templateUrl: "/assets/layouts/_top_bar.html"
                    },
                    "": {
                        controller: "ApplicationController",
                        templateUrl: "/assets/layouts/default.html"
                    },"search_mobile":{
                        controller: "SearchAdvertController",
                        templateUrl: "/assets/layouts/search_mobile.html"
                    },
                    "info":{
                        controller: "InfoController",
                        templateUrl: "/assets/layouts/info.html"
                    }
                }
            })
            .state("index",{
                parent: "default",
                url:"/adverts?page&new&sort&solr",
                views:{
                    "search_main":{
                        controller: "SearchAdvertController",
                        templateUrl: "/assets/layouts/search.html"
                    },
                    "index_main":{
                        controller: "IndexController",
                        templateUrl: function ($stateParams){
                            if($stateParams["map"]==='1'){
                                return "/assets/products/map.html"
                            }else{
                                return "/assets/products/index.html"
                            }
                        }

                    }
                }

            }).state("search",{
                parent: "default",
                url: '/search?category&operation&living&price_min&price_max&by_all&skip&take&page&page_count&map&city&limit&marking&area_min&area_max&commission&favorites&sort&solr&metro&free',
                views:{
                    "search_left":{
                        controller: "SearchAdvertController",

                        templateUrl: "/assets/layouts/search_left.html"
                    },

                    "index":{
                        controller: "IndexController",
                        templateUrl: function ($stateParams){
                            if($stateParams["map"]==='1'){
                                return "/assets/products/map.html"
                            }else{
                                return "/assets/products/index_main.html"
                            }

                        }

                    }
                }
            }).state("show",{
                parent:"default",
                url:"/adverts/:id?index",
                resolve: {
                    OneAdvert: ['Advert','$stateParams',
                        function( Advert,$stateParams){

                            return Advert.get($stateParams['id']);
                        }]
                },
                views:{
                    "search_left":{
                        controller: "SearchAdvertController",

                        templateUrl: "/assets/layouts/search_left.html"
                    },
                    "show":{
                        controller:"ProductShowController",
                        templateUrl: "/assets/products/show.html"
                    }


                }
            })

            .state("show.map",{
                url:'',
                views:{
                    "map":{
                        templateUrl: "/assets/products/show.map.html"
                    }

                }

            })
            .state("new",{
                parent:"default",
                url:"/adverts_new?type",
                views:{
                    "new":{
                        controller:"CreateAdvertController",
                        //templateUrl: "/assets/products/form.html.haml"
                        templateUrl: function($stateParams){
                            console.log("stateparams1",$stateParams);
                            if(angular.isDefined($stateParams['type'])){
                                if($stateParams['type']==='true'){
                                    return "/assets/products_old/form_civil.html"
                                }
                                if($stateParams['type']==='false'){
                                    return "/assets/products_old/form_comm.html"
                                }
                                if($stateParams['type']===null){
                                    return "/assets/products_old/form.html"
                                }
                            }


                        }
                    }

                }
            })
            .state("edit",{
                parent:"default",
                url:"/adverts/:id/edit?living",

                views:{
                    "new":{
                        controller:"EditAdvertController",
                        //templateUrl: "/assets/products/form.html.haml"
                        templateUrl: function($statParams){
                            if($statParams['living']==='true'){
                                return "/assets/products_old/form_civil.html"
                            }
                            if($statParams['living']==='false'){
                                return "/assets/products_old/form_comm.html"
                            }
                             console.log("stateparams2",$statParams)
                        }
                    }
                }
            })
            .state("image", {
                url: "/adverts/:id?index",
                onEnter: ['$stateParams', '$state', '$modal','$log',
                    function($stateParams, $state, $modal,$log) {
                        var modalInstance =  $modal.open({
                            templateUrl:'/assets/products/image.html',
                            controller:"ModalProductShowController",
                            resolve: {
                                OneAdvert: ['Advert','$stateParams',
                                    function( Advert,$stateParams){
                                        console.log("index route",$stateParams);
                                        return Advert.get($stateParams['id']);
                                    }]

                            }
                        })
                        modalInstance.result.then(function (selectedItem) {
                            $state.go($state.current.name);
                        }, function () {
                            $stateParams['index'] = null;
                            $state.go('show',$stateParams); //return to parent state
                        });
                    }]
            }).state("notariat",{
                parent: "default",
                url:"/notariat",
                resolve: {
                    OneNotariat: ['Notariat','$stateParams',
                        function( Notariat,$stateParams){
                            return Notariat.get();
                        }]
                },
                views:{
                    "search_left":{
                        controller: "SearchAdvertController",

                        templateUrl: "/assets/layouts/search_left.html"
                    },
                    "show":{
                        controller:"NotariatController",
                        templateUrl: "/assets/notarius/notarius.html"
                    }


                }

            })
            .state("management",{
                parent: "default",
                url:"/management",
                resolve: {
                    OneManagement: ['Management','$stateParams',
                        function( Management,$stateParams){
                            return Management.get();
                        }]
                },
                views:{
                    "search_left":{
                        controller: "SearchAdvertController",

                        templateUrl: "/assets/layouts/search_left.html"
                    },
                    "show":{
                        controller:"ManagemenController",
                        templateUrl: "/assets/managements/management.html"
                    }


                }

            }).state("lawyer",{
                parent: "default",
                url:"/lawyer",

                views:{
                    "search_left":{
                        controller: "SearchAdvertController",

                        templateUrl: "/assets/layouts/search_left.html"
                    },
                    "show":{
                        controller:"LawyerController",
                        templateUrl: "/assets/lawyers/lawyer.html"
                    }


                }

            }).state("sign_in",{
                parent: "default",
                url: "/sign_in",
                views: {
                    "index":{
                        controller:  "RegistrationController",
                        templateUrl: "/assets/layouts/sign_in.html"
                    }
                }
            }).state("sign_up",{
                parent: "default",
                url: "/sign_up",
                views: {
                    "index":{
                        controller:  "RegistrationController",
                        templateUrl: "/assets/layouts/registration.html"
                    }
                }
            }).state("blogs",{
                parent:"default",
                url:"/blogs/:id",
                resolve: {
                    OneBlog: ['Blog','$stateParams',
                        function( Blog,$stateParams){
                            return Blog.get($stateParams['id']);
                        }]
                },
                views:{
                    "search_left":{
                        controller: "SearchProductController",

                        templateUrl: "/assets/layouts/search_left.html"
                    },
                    "show":{
                        controller:"BlogShowController",
                        templateUrl: "/assets/lawyers/show_blog.html"
                    }


                }
            })
//            .state('admin', {
//                url: "/admin",
//                controller: function($route,$location) {
//                    $location.path("/admin");
//                    $route.reload();
//                }
//            })




    }])

