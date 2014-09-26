angular.module('realty').controller('EditAdvertController',['$scope','OptionsCreate', 'Advert','Operation','Category','Region',
    '$q','$stateParams','$state','$http', 'Street', 'AdvertImage', 'City','AdvertEdit','Layout','Movie','District',
    function($scope,OptionsCreate, Advert,Operation,Category,Region,$q,$stateParams,$state,$http,Street,AdvertImage,City,AdvertEdit,Layout,Movie,District){
        $scope.downloadAnimation = false;
        //console.log("stateparams",$stateParams['id']);
        $scope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        var options = OptionsCreate;

        //USE THEN FOR OPTIONS!
        $scope.select2opts1 = {
            //allowClear: true,
            width: '100%',
            placeholder: 'qq'
        }

        $scope.select2opts3 = {
            allowClear: true,

            width: '100%',
            placeholder: 'qq'

        };
        $scope.select2opts2 = {
            allowClear: true,
            data: '',
            width: '100%',
            placeholder: 'qq',
            minimumInputLength: 3,
            ajax:{
                url: "/service/streets",
                data: function (term, page) {
                    if(angular.isDefined($scope.AdvertForm.city_id)){
                        return {search:term, city:$scope.AdvertForm.city_id};
                    }
                },
                results: function (data, page) {
                    console.log("data streets", angular.toJson(data.streets))
                    return {results: data.streets};
                }
            },
            formatResult: function(data){return data.id,data.name},
            formatSelection: function(data){return data.name}
        };


        $scope.$watch("AdvertForm.region_id",function(newValue){
            // console.log("newvalue",newValue)
            if((angular.isNumber(parseInt(newValue))) && !angular.equals(newValue,'')  ){
                City.findByRegion(newValue).then(function(data){

                    $scope.cities = data.cities;
                })
            }
        });

        $scope.$watch("AdvertForm.city_id",function(newValue, oldValue){
            if((angular.isNumber(parseInt(newValue))) && !angular.equals(newValue,'')  ){
                District.findByCity(newValue).then(function(data){
                    $scope.districts  = data;
                })
                if (newValue != oldValue){
                    $scope.downloadAnimation = true;
                    Street.query({city: newValue}).then(function(data){
//                        console.log("street data",data)
                        $scope.streets = data;
                        $scope.downloadAnimation = false;
                     })
                }
            }
        });

        options.regions.then(function(data){

            $scope.regions =data;
        })
        options.cities.then(function(data){
            //console.log("cities",angular.toJson(data))
            $scope.cities =data.cities;
        })
        options.operations.then(function(data){
            $scope.operations = data.operation_types;
        })

        options.metro_stations.then(function(data){
            $scope.metro_stations =data;
        })

         options.business_center_classes.then(function(data){
            $scope.business_center_classes =data.business_center_classes;
        })

        $scope.categories = options.categories.then(function(data){
            $scope.categories = data.categories;
        })

        $scope.house_types = options.house_types.then(function(data){
//            console.log("house_types",data)
            $scope.house_types = data;
        })

        $scope.house_materials = options.house_materials.then(function(data){
//            console.log("house_materials",data)
            $scope.house_materials = data;
        })

        $scope.flat_types = options.flat_types.then(function(data){
            $scope.flat_types = data;
        })

        $scope.floor_types = options.floor_types.then(function(data){
            $scope.floor_types = data;
        })

        $scope.state_repairs = options.state_repairs.then(function(data){

            $scope.state_repairs = data;
        })

        options.currency_users.then(function(data){
            $scope.currency_users = data
        })

        AdvertEdit.nestedUrl = function (advertId) {
            return '/service/products/' + advertId + '/edit';
        };

        AdvertEdit.query = function (advertId) {
            return AdvertEdit.$get(AdvertEdit.nestedUrl(advertId));
        };

        var advert = AdvertEdit.query($stateParams['id']);
        advert.then(
            function(data){

                //console.log("advert ",angular.toJson( data));
//                $scope.videos = data.movies;

                data.movies.forEach(function(vid) {
                    $scope.videos.push({ value:vid.video, new:false, id:vid.id});
                });

                data.images.forEach(function(image){
                    $scope.images.push({'url': image.image.medium.url, 'id': image.id });
                });

                data.layouts.forEach(function(image){
                    $scope.layouts.push({'url': image.image.medium.url, 'id': image.id });
                });





                $scope.advert = data,
                console.log("$scope.advert",$scope.advert.street_id)
                    //$scope.city = data.city;

                    //var street_id =  $scope.AdvertForm['street_id'];



                    angular.extend($scope.AdvertForm,data);

                $scope.AdvertForm.currentImage = data.photo.photo.medium.url;
                $scope.currentLayout = data.layout.layout.medium.url;

                if (data.price != data.all_price){
                    $scope.AdvertForm.price_bt = 1;
                }
//                Street.query({city: $scope.advert.city_id}).then(function(data){
//                    console.log("street data",data)
//                    $scope.streets = data;
//                })
//                console.log("data",angular.toJson(data));
//                console.log("$scope.AdvertForm",angular.toJson($scope.AdvertForm));
                //angular.extend($scope.AdvertForm.city,data.city);

                /*$scope.AdvertForm = {
                 admin: data.admin.toString(),
                 living: data.living.toString(),
                 operation: data.operationType.id,
                 region:data.city.regionId,
                 //city: data.city.id,
                 category: data.category.id


                 };*/

            },
            function(data){

            })
        $scope.submit=function(){
            Advert.get($stateParams['id']).then(
                function(advert){
                    //
                    if (advert.title != $scope.AdvertForm.title){
                        $stateParams['id'] = advert.id;
                    }
                    angular.extend(advert,$scope.AdvertForm);
//                    console.log("AdvertForm",advert);
                    if ($scope.AdvertForm.price_bt == 1){
                        advert.all_price = $scope.AdvertForm.area * $scope.AdvertForm.price;
                    }else{
                        advert.all_price = $scope.AdvertForm.price;
                        console.log("price1",$scope.AdvertForm.price )
                        console.log("price2",$scope.AdvertForm.area )
                        console.log("price3",advert.price )
                        if ($scope.AdvertForm.area > 0){
                            console.log("price1",$scope.AdvertForm.price )
                            console.log("price2",$scope.AdvertForm.area )
                            console.log("price3",advert.price )
                            advert.price = $scope.AdvertForm.price/$scope.AdvertForm.area;
                        }

                    }
                    console.log("advert.title",advert.title);
                    console.log("AdvertForm.title",$scope.AdvertForm.title);

//
                    advert.update();

                    $scope.videos.forEach(function(vid) {
                        if (vid.new == true){
                            var new_movie = new Movie();
                            new_movie.video = vid.value;
                            new_movie.advert_id = $scope.advert.id;
                            new_movie.save();
                        }

                    });

                  /*
                    angular.extend(advert,$scope.AdvertForm);
                    console.log("price", $scope.AdvertForm.price);
                    //advert.street_id = $scope.AdvertForm['street'].id
                    advert.update();
                    //console.log("advert", angular.toJson(advert));*/

                    $state.transitionTo('show',$stateParams)
                })
        }


        $scope.$on("additional_files", function (event, args) {
            $scope.downloadAnimation = true;
//            console.log('additional imgaes event',angular.toJson(event))
//            console.log('additional imgaes eargs',angular.toJson(args))
//            console.log("additional plans", angular.toJson(args))
            $scope.$apply(function(){
                console.log("test count 11111")
                console.log("args.file1",args.file)
                console.log("$scope.files222",$scope.files)
                $scope.files.push(args.file);
                console.log("$scope.files222",$scope.files)
//                console.log("$stateParams['id']",angular.toJson($stateParams));
                if(angular.isDefined($stateParams['id'])){
                    if(angular.equals(args.model,'layouts')){
                        var add_image = new Layout();
                    }
                    if(angular.equals(args.model,'images')){
                        var add_image = new AdvertImage();
                    }
//                    add_image.advert_id =  $stateParams['id'];
                    add_image.advert_id =  $scope.advert.id;
                    //console.log("advert", angular.toJson($scope.advert));
                    //console.log("add_image", angular.toJson(add_image));

                    add_image.create().then(
                        function(data){
                            $scope.downloadAnimation = true;

                            $scope.save_additional(data['id'],args.model)
                                .then(function(data){
                                    index = 0
                                    $scope.files = []
                                    if(angular.equals(data.config.data.model,'images')){
                                        $scope.images.push({'url': data.data.additionlal_image.image.medium.url, 'id': data.data.id });

                                    }
                                    if(angular.equals(data.config.data.model,'layouts')){
                                        $scope.layouts.push({'url': data.data.additionlal_layout.image.medium.url, 'id': data.data.id});

                                    }
                                    $scope.downloadAnimation = false;
                                })

                        })

                }
            })

        })
        $scope.images = [];
        $scope.files = [];
        $scope.layouts = [];

        $scope.$on("fileSelected", function (event, args) {
            console.log("fileSelected params", angular.toJson(args))
            $scope.$apply(function () {
                //add the file object to the scope's files collection
                // console.log("fileSelected params", angular.toJson(args))



                $scope.files[0] = args.file
                $scope.downloadAnimation = true;
                $scope.save($stateParams['id'],args.model)
                    .then(
                    function(data, status, headers, config){
                        console.log("image1",data.data.photo.medium.url );
                        if(angular.equals(data.config.data.model,'photo')){
                            console.log("image2",data.data.photo.medium.url );
                            $scope.setCurrentImageMain(data.data.photo.medium.url);
                        }
                        if(angular.equals(data.config.data.model,'layout')){
                            $scope.setCurrentLayoutMain(data.data.layout.medium.url);
                        }
                        $scope.downloadAnimation = false;
                    },
                    function(data){
                        console.log("error",angular.toJson(data));
                    }
                )


            });
        });


        $scope.save = function(id,model) {

            console.log("save model", angular.toJson(model))
            console.log("$scope.files", $scope.files)
            var save_promise=  $http({
                method: 'PUT',
                url: "/service/products/"+id,
                headers: { 'Content-Type': undefined },
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("model", data.model);

                    console.log("append file",angular.toJson(data.files[data.files.length - 1]));
                    formData.append("image", data.files[data.files.length - 1]);

                    return formData;
                },
                data: { model: model, files: $scope.files }
            });

            return save_promise;
        };
        var index = 0;
        $scope.save_additional = function(id,model) {
            console.log("plan model", angular.toJson(model))


            console.log("index", index)
            if(angular.equals(model,'images')){
                var url = '/service/product_images/';
            }
            if(angular.equals(model,'layouts')){
                var url = '/service/layouts/';
            }
            var save_additional_promise=  $http({
                method: 'PUT',
                url: url+id,
                headers: { 'Content-Type': undefined },
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("model", angular.toJson(data.model));

                    console.log("append file",angular.toJson(data.files[data.files.length - 1]));
                    formData.append("image", data.files[index]);
                    index += 1;
                    console.log("index2", index)
                    return formData;
                },

                data: { model: model, files: $scope.files }

            });

            return save_additional_promise;
        };


        $scope.videos = [];

        $scope.addVideo = function() {
            $scope.videos.push({ value:'', new:true});
        };

        $scope.removeVideo = function(video, index) {
            if (video.new == false){
                Movie.get(video.id).then(function (vid) {
                    vid.delete();
                });
            }
            $scope.videos.splice(index, 1);
        };

        $scope.removeImage = function(id, index, model) {
            if (model == 1){
                AdvertImage.get(id).then(
                    function(data){
                        //console.log("id",angular.toJson(index));
                        data.remove();
                    }
                )
                $scope.images.splice(index, 1);
            }else{
                Layout.get(id).then(
                    function(data){
                        //console.log("id",angular.toJson(index));
                        data.remove();
                    }
                )
                $scope.layouts.splice(index, 1);
            }
        };

        $scope.setCurrentLayoutMain = function (img) {
            //console.log("set currentImage as function",img);
            $scope.currentLayout = img;
        };

        $scope.setCurrentImageMain = function (img) {

            $scope.AdvertForm.currentImage = img;
        };



        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };



        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };
    }])