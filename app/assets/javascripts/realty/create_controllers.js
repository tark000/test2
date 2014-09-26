angular.module('realty').controller('CreateAdvertController',['$scope','OptionsCreate', 'Advert','AdvertImage',
    '$q','$stateParams','$state','$http','Street','City','District','Layout','Movie',
    function($scope,OptionsCreate, Advert,AdvertImage,$q,$stateParams,$state,$http,Street,City,District,Layout,Movie){
        //$scope.AdvertForm = {};
        $scope.downloadAnimation = false;
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





        $scope.videos = [];
        $scope.addVideo = function() {
            $scope.videos.push({ value:''});

        };

        $scope.removeVideo = function(video, index) {
            console.log("index",angular.toJson(index));

            $scope.videos.splice(index, 1);


        };



        /*$scope.$on('add_video', function(event, args){

         var new_movie = new Movie();
         new_movie.video = args.value;
         new_movie.save().then(
         function(data){
         console.log("data id",angular.toJson(data['id']));
         console.log("data",angular.toJson(data));
         console.log("$stateParams",angular.toJson($stateParams));
         },function(data){
         console.log("data error",angular.toJson(data));
         })
         console.log("new_movie",angular.toJson(new_movie.id));
         })*/


        //TODO update image browser if change
        //TODO current_user.id to advert

        //$scope.AdvertForm = {};
        $scope.edit = function () {
            // Here we show off go's ability to navigate to a relative state. Using '^' to go upwards
            // and '.' to go down, you can navigate to any relative state (ancestor or descendant).
            // Here we are going down to the child state 'edit' (full name of 'contacts.detail.item.edit')
            $state.go('new', $stateParams);
        };

        $scope.templates = [{name: 'Тип недвижимости'},
            {
                name: 'Жилая недвижимость',
                living:1,
                url: '/assets/adverts_old/form_civil.html.haml'
            }
            ,
            {   name: 'Коммерческая недвижимость',
                living:0,
                url: '/assets/adverts_old/form_comm.html.haml'
            }];
        $scope.template = $scope.templates[0];

        var options  = OptionsCreate
        console.log("OptionsCreate",angular.toJson(Movie))
        $scope.select2opts1 = {
            allowClear: true,
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
                    return {results: data.streets};
                }
            },
            formatResult: function(data){return data.name},
            formatSelection: function(data){return data.name}
        };


        $scope.currentImage = "";
        $scope.files = [];
        $scope.images = [];
        $scope.layouts = [];
        $scope.cities = [];


        options.regions.then(function(data){
            $scope.regions =data;
        })
        options.operations.then(function(data){

            $scope.operations = data.operation_types;
        })
        $scope.categories = options.categories.then(function(data){
            $scope.categories = data.categories;
        })





        $scope.$watch("AdvertForm.region_id",function(newValue){
            console.log("newvalue",newValue)
            if((angular.isNumber(parseInt(newValue))) && !angular.equals(newValue,'')  ){
                City.findByRegion(newValue).then(function(data){
                    $scope.cities = data.cities;
                })


            }
        });


        $scope.$watch("AdvertForm.city_id",function(newValue, oldValue){
            console.log("city", newValue)
            if((angular.isNumber(parseInt(newValue))) && !angular.equals(newValue,'')  ){
                District.findByCity(newValue).then(function(data){
                    console.log("district data",data)
                    $scope.districts  = data;
                })
                $scope.downloadAnimation = true;
                Street.query({city: newValue}).then(function(data){
//                    console.log("street data",data)
                    $scope.streets = data;
                    $scope.downloadAnimation = false;
                })
            }
        });




        options.business_center_classes.then(function(data){
            $scope.business_center_classes = data.business_center_classes;
        })

        options.currency_users.then(function(data){
            $scope.currency_users = data
        })

        options.doors.then(function(data){
            $scope.doors =data;
        })
        options.floor_types.then(function(data){
            $scope.floor_types =data;
        })
        options.house_materials.then(function(data){
            $scope.house_materials =data;
        })

        options.house_types.then(function(data){
            $scope.house_types =data;
        })

        options.metro_stations.then(function(data){
            $scope.metro_stations =data;
        })

        options.purpouse_lands.then(function(data){
            $scope.purpouse_lands =data;
        })
        options.rooms_types.then(function(data){
            $scope.rooms_types =data;
        })

        options.state_repairs.then(function(data){
            $scope.state_repairs =data;
        })

        options.flat_types.then(function(data){
            $scope.flat_types =data;
        })

        var new_advert = new Advert();
        var check = 'false';

        $scope.FloorCheck =function(floors,floor){
            if(floors<floor){
                return  $scope.AdvertForm.floors = '';
            }
        }

        $scope.surrentImageMain = function (img) {
            //  console.log("set currentImage as function",img);
            $scope.AdvertForm.currentImage = img

        };
        $scope.setCurrentLayoutMain = function (img) {
            //console.log("set currentImage as function",img);
            $scope.currentLayout = img;
        };



        $scope.setCurrentImageMain = function (img) {

            $scope.AdvertForm.currentImage = img;
        };



        $scope.$on("additional_files", function (event, args) {
            $scope.downloadAnimation = true;

//            console.log('additional imgaes event',angular.toJson(event))
//            console.log('additional imgaes eargs',angular.toJson(args))
//            console.log("additional plans", angular.toJson(args))
            $scope.$apply(function(){
                console.log("count operation 1111111111")
                $scope.files.push(args.file);

                if(angular.isDefined($stateParams['id'])){
                    if(angular.equals(args.model,'layouts')){
                        var add_image = new Layout();
                    }
                    if(angular.equals(args.model,'images')){
                        var add_image = new AdvertImage();
                    }
                    add_image.advert_id =  $stateParams['id'];
//                    add_image.advertId =  $stateParams['id'];
                    add_image.create().then(
                        function(data){
                            $scope.downloadAnimation = true;
                            //console.log("create additional image",data['id']);
                            $scope.save_additional(data['id'],args.model)
                                .then(function(data){
                                    // console.log("images data", angular.toJson(data.config.data.model));
                                    // console.log("images", angular.toJson($scope.images))
                                    index = 0
                                    $scope.files = []
                                    if(angular.equals(data.config.data.model,'images')){
                                        $scope.images.push({'url': data.data.additionlal_image.image.medium.url, 'id': data.data.id });

                                    }
                                    if(angular.equals(data.config.data.model,'layouts')){
                                        $scope.layouts.push({'url': data.data.additionlal_layout.image.medium.url, 'id': data.data.id});

                                    }


                                })
                        })
                    $scope.downloadAnimation = false;
                }
            })
        })

        $scope.$on("fileSelected", function (event, args) {
            $scope.downloadAnimation = true;
            console.log("fileSelected params", angular.toJson(args))
            $scope.$apply(function () {
                //add the file object to the scope's files collection

                if(angular.isDefined(new_advert) && angular.equals(check,'false')){
                    new_advert.user_id = ''
                    new_advert.create().then(
                        function(data){
                            check = 'true';
                            $scope.downloadAnimation = true;
                            $stateParams['id'] =  data['id'];

                            $scope.files[0] = args.file
                            $scope.downloadAnimation = true;
//                            console.log("args.file",args.file)
//                            console.log("args.model",args.model)
                            $scope.save($stateParams['id'],args.model)
                                .then(
                                function(data, status, headers, config){
                                    console.log("data",data)
                                    if(angular.equals(data.config.data.model,'photo')){
                                        console.log("data.data.photo.medium.url",data.data);
                                        $scope.setCurrentImageMain(data.data.photo.medium.url);
                                    }
                                    if(angular.equals(data.config.data.model,'layout')){
                                        $scope.setCurrentLayoutMain(data.data.layout.medium.url);
                                    }
                                    $scope.downloadAnimation = false;
                                    $scope.files = [];
                                },
                                function(data){
                                    console.log("error",angular.toJson(data));
                                }
                            )
                        },
                        function(data){
                            console.log("error create advert",angular.toJson(data));
                        }
                    )
                }
                console.log("check second",check);
                if(angular.equals(check,'true')){
                    $scope.downloadAnimation = true;
                    $scope.files[0] = args.file
                    $scope.save($stateParams['id'],args.model)
                        .then(
                        function(data, status, headers, config){

                            if(angular.equals(data.config.data.model,'photo')){
                                console.log("data.data.photo.medium.url",data.data.photo.medium.url);
                                $scope.setCurrentImageMain(data.data.photo.medium.url);
                            }
                            if(angular.equals(data.config.data.model,'layout')){
                                $scope.setCurrentLayoutMain(data.data.layout.medium.url);
                            }
                            $scope.downloadAnimation = false;
                            $scope.files = [];
                        },
                        function(data){
                            console.log("error",angular.toJson(data));
                        }
                    )
                }

            });
        });

        $scope.save = function(id,model) {

            console.log("save model", angular.toJson(model))
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


        var index = 0
        $scope.save_additional = function(id,model) {
            console.log("plan model", angular.toJson(model))

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

                    // console.log("append file",angular.toJson(data.files[data.files.length - 1]));
                    formData.append("image", data.files[index]);
                    index += 1;
                    return formData;
                },

                data: { model: model, files: $scope.files }

            });
            return save_additional_promise;
        };


        $scope.submit=function(){
            console.log("advert form",angular.toJson( $scope.AdvertForm));

            Advert.get($stateParams['id']).then(
                function(advert){
                    $scope.AdvertForm.living = $stateParams['type'];
                    angular.extend(advert,$scope.AdvertForm);
                    console.log("AdvertForm",advert);
                    if ($scope.AdvertForm.price_bt == 1){
                        advert.all_price = $scope.AdvertForm.area * $scope.AdvertForm.price;
                    }else{
                        advert.all_price = $scope.AdvertForm.price;
                        advert.price = $scope.AdvertForm.price/$scope.AdvertForm.area;
                    }
                    console.log("advert",advert);
                    advert.update();

                    $scope.videos.forEach(function(vid) {
                        var new_movie = new Movie();
                        new_movie.video = vid.value;
                        new_movie.advert_id = $stateParams['id'];
                        new_movie.save();
                    });
                    /* advert.title =  $scope.AdvertForm.title
                     advert.living = $scope.template.living
                     advert.admin = $scope.AdvertForm.admin
                     advert.hotadv = $scope.AdvertForm.hotadv
                     advert.torg = $scope.AdvertForm.torg

                     *//* advert.operationTypeId =  $scope.AdvertForm.operation
                     advert.categoryId = $scope.AdvertForm.category
                     advert.streetId = $scope.AdvertForm.street.id
                     advert.businessCenterClassId = $scope.AdvertForm.business_center_class
                     advert.cityId = $scope.AdvertForm.city
                     advert.currencyUserId = $scope.AdvertForm.currency
                     advert.districtId = $scope.AdvertForm.district
                     advert.doorId = $scope.AdvertForm.door
                     advert.flatTypeId = $scope.AdvertForm.flat_type
                     advert.floorTypeId = $scope.AdvertForm.floor_type
                     advert.houseMaterialId = $scope.AdvertForm.house_material
                     advert.house_type_id = $scope.AdvertForm.houseType
                     advert.metroStationId = $scope.AdvertForm.metro_station
                     advert.purpouseLandId = $scope.AdvertForm.purpouse_land
                     advert.regionId = $scope.AdvertForm.region*//*
                     advert.room_type = $scope.AdvertForm.roomType
                     advert.state_repair = $scope.AdvertForm.state_repair
                     advert.life_area = $scope.AdvertForm.lifeArea
                     advert.area = $scope.AdvertForm.area
                     advert.kitchen = $scope.AdvertForm.kitchen
                     advert.ceill_height = $scope.AdvertForm.ceill_height
                     advert.floor = $scope.AdvertForm.floor
                     advert.floors = $scope.AdvertForm.floors
                     advert.description = $scope.AdvertForm.description
                     advert.house = $scope.AdvertForm.house
                     advert.landsize = $scope.AdvertForm.landsize
                     advert.rooms = $scope.AdvertForm.rooms
                     advert.wc_count = $scope.AdvertForm.wcCount
                     advert.commission = $scope.AdvertForm.commission

                     //console.log("advert before update", advert);

                     advert.update();
                     */
                    $state.transitionTo('show',$stateParams)
                }
            )
        }
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



    }])