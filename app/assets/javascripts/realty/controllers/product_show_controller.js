

angular.module('realty').controller('ProductShowController',['railsResourceFactory','$rootScope', '$scope','$q','$stateParams','$state','$http',
    'OneAdvert','$location','$sce','$cookieStore','$modal','$anchorScroll','$log',
    function(railsResourceFactory,$rootScope,$scope, $q,$stateParams, $state,$http,OneAdvert,$location,$sce,$cookieStore,$modal,$anchorScroll,$log){

        //console.log("stateparams",$stateParams);
        //$scope.selected = '1';
        $scope.ContactForm = {};
        $scope.sendMail = true;

        $scope.advert = OneAdvert;
        $scope.urlAbsol = $location.absUrl();
        $anchorScroll();

        var portBrake = $location.port() != '' ?  ":" : ""
        $scope.url = $location.protocol() + "://" + $location.host() + portBrake + $location.port();


        $rootScope.$broadcast("UpdateSearchForm", {
            category : $stateParams['category'],
            map :$stateParams['map'],
            operation:$stateParams['operation'],
            living: $stateParams['living'],
            city: $stateParams['city']

        });

        if($scope.advert.longitude){
            $scope.options = {
                map: {
                    center: new google.maps.LatLng($scope.advert.latitude, $scope.advert.longitude),
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.TERRAIN
                },
                markers: {
                    icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png'
                }
            }

            $scope.markers = [{

                location: {
                    lat: $scope.advert.latitude,
                    lng: $scope.advert.longitude
                }
            }]

            $scope.selected = function(value){
                if(value === 'second'){
                   // alert('second');
                    window.setTimeout(function(){
                        $scope.options.map.center =  new google.maps.LatLng($scope.advert.latitude, $scope.advert.longitude);
                        $scope.$broadcast('gmMapResize', 'myMapOne');
                        $log.info("map resize!");
                        $scope.options.map.zoom = 16;
                        //var a = new google.maps.LatLng($scope.advert.latitude, $scope.advert.longitude);
                        //$scope.latlngbounds.extend(a);
                    },10);
                }
            }

           /* $scope.$watch('selected', function (oldValue,newValue) {

                $log.debug("oldvalue watch", oldValue);
                $log.debug("newValue watch", newValue);
                window.setTimeout(function(){
                    $scope.options.map.center =  new google.maps.LatLng($scope.advert.latitude, $scope.advert.longitude);
                    $scope.$broadcast('gmMapResize', 'myMapOne');
                    $log.info("map resize!");
                    //var a = new google.maps.LatLng($scope.advert.latitude, $scope.advert.longitude);
                    //$scope.latlngbounds.extend(a);
                },100);
            })*/
        }



        $scope.show = function(value){
            if (value  == 0 || value  == null){
                return "false";
            }else {
                return "true";
            }
        }


        $scope.setCurrentImage = function (image) {

            $scope.currentImage = image.medium.url;
        };

        $scope.setCurrentImageMain = function (img) {

            $scope.currentImage = img.image;
        };



        $scope.send = function(){
            Create = railsResourceFactory({
                url: '/service/contacts/mail',
                name: 'contact'
            });
            Create.query($scope.ContactForm).then(function(data){
                console.log("create data",angular.toJson(data));
                if (data == "true"){
                    $scope.message = "Ваше сообщение отправлено!";
                    $scope.sendMail = false;
                }else{
                    console.log("create data",angular.toJson(data));
                    $scope.message = "Ошибка!";
                }
            })
        }

        $scope.videoTab = $sce.trustAsHtml($scope.advert.video);


        //slider
        $scope._Index = 0;
        // if a current image is the same as requested image
        $scope.isActive = function (index) {
            return $scope._Index === index;
        };
        // show prev image
        $scope.showPrev = function () {
            $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.slides.length - 1;
            $scope.smallImage();
        };

        // show next image
        $scope.showNext = function () {
            $scope._Index = ($scope._Index < $scope.slides.length - 1) ? ++$scope._Index : 0;
            $scope.smallImage();
        };




        $scope.showPrevTwo = function () {
            if ($scope._Index == 0){
                $scope._Index = $scope.slides.length -2;
            } else if ($scope._Index == 1){
                $scope._Index = $scope.slides.length -1;
            } else {
                $scope._Index = $scope._Index - 2;
            }
            $scope.smallImage();
        };

        // show next image
        $scope.showNextTwo = function () {
            console.log($scope._Index );
            console.log($scope.slides.length - 1);
            console.log($scope._Index == $scope.slides.length - 1);
            if ($scope._Index == $scope.slides.length - 1){
                $scope._Index = 1;
            } else if ($scope._Index == $scope.slides.length - 2){
                $scope._Index = 0;
            } else {
                $scope._Index = $scope._Index + 2;
            }
            $scope.smallImage();
        };

        // show a certain image
        $scope.showPhoto = function (index) {
            $scope._Index = index;
        };

        $scope.showImageId = function(id){
            $scope._Index = id;
        }

        $scope.smallImage = function(){
            if ($scope._Index == 0){
                $scope.image1 = $scope.slides.length - 2;
                $scope.image2 = $scope.slides.length - 1;
                $scope.image3 = 0;
                $scope.image4 = 1;
                $scope.image5 = 2;
            } else if ($scope._Index == 1){
                $scope.image1 = $scope.slides.length - 1;
                $scope.image2 = 0;
                $scope.image3 = 1;
                $scope.image4 = 2;
                $scope.image5 = 3;
            } else if ($scope._Index == $scope.slides.length - 1){
                $scope.image1 = $scope.slides.length - 3;
                $scope.image2 = $scope.slides.length - 2;
                $scope.image3 = $scope.slides.length -1;
                $scope.image4 = 0;
                $scope.image5 = 1;
            } else if ($scope._Index == $scope.slides.length - 2){
                $scope.image1 = $scope.slides.length - 4;
                $scope.image2 = $scope.slides.length - 3;
                $scope.image3 = $scope.slides.length - 2;
                $scope.image4 = $scope.slides.length -1;
                $scope.image5 = 0;
            } else {
                $scope.image1 = $scope._Index - 2;
                $scope.image2 = $scope._Index - 1;
                $scope.image3 = $scope._Index;
                $scope.image4 = $scope._Index + 1;
                $scope.image5 = $scope._Index + 2;
            }

        }




        $scope.slides = [];

        if(angular.isDefined($scope.advert.images)){

            $scope.slides.push({
                imageSlider: $scope.advert.sliderImage,
                imageSmall: $scope.advert.smallSlider,
                imageFull: $scope.advert.sliderFull,
                text: ''
            });
            $scope.advert.images.forEach(function(image) {
                // console.log("img",angular.toJson(image.image));
                $scope.slides.push({
                    imageSlider: image.image.slider_fit.url,
                    imageSmall: image.image.small_slider.url,
                    imageFull: image.image.url,
                    text: ''
                });
            });
            $scope.smallImage();


        }


        //layouts
        $scope._IndexL = 0;
        // if a current image is the same as requested image
        $scope.isActiveL = function (index) {
            return $scope._IndexL === index;
        };
        // show prev image
        $scope.showPrevL = function () {
            $scope._IndexL = ($scope._IndexL > 0) ? --$scope._IndexL : $scope.layouts.length - 1;
            $scope.smallImageL();
        };

        // show next image
        $scope.showNextL = function () {
            $scope._IndexL = ($scope._IndexL < $scope.layouts.length - 1) ? ++$scope._IndexL : 0;
            $scope.smallImageL();
        };




        $scope.showPrevTwoL = function () {
            if ($scope._IndexL == 0){
                $scope._IndexL = $scope.layouts.length -2;
            } else if ($scope._IndexL == 1){
                $scope._IndexL = $scope.layouts.length -1;
            } else {
                $scope._IndexL = $scope._IndexL - 2;
            }
            $scope.smallImageL();
        };

        // show next image
        $scope.showNextTwoL = function () {
            if ($scope._IndexL == $scope.layouts.length - 1 ){
                $scope._IndexL = 1;
            } else if ($scope._IndexL == $scope.layouts.length - 2){
                $scope._IndexL = 2;
            } else {
                $scope._IndexL = $scope._IndexL + 2;
            }
            $scope.smallImageL();
        };

        // show a certain image
        $scope.showPhotoL = function (index) {
            $scope._IndexL = index;
        };

        $scope.showImageIdL = function(id){
            $scope._IndexL = id;
        }

        $scope.smallImageL = function(){
            if ($scope._IndexL == 0){
                $scope.image1L = $scope.layouts.length - 2;
                $scope.image2L = $scope.layouts.length - 1;
                $scope.image3L = 0;
                $scope.image4L = 1;
                $scope.image5L = 2;
            } else if ($scope._IndexL == 1){
                $scope.image1L = $scope.layouts.length - 1;
                $scope.image2L = 0;
                $scope.image3L = 1;
                $scope.image4L = 2;
                $scope.image5L = 3;
            } else if ($scope._IndexL == $scope.layouts.length - 1){
                $scope.image1L = $scope.layouts.length - 3;
                $scope.image2L = $scope.layouts.length - 2;
                $scope.image3L = $scope.layouts.length -1;
                $scope.image4L = 0;
                $scope.image5L = 1;
            } else if ($scope._IndexL == $scope.layouts.length - 2){
                $scope.image1L = $scope.layouts.length - 4;
                $scope.image2L = $scope.layouts.length - 3;
                $scope.image3L = $scope.layouts.length - 2;
                $scope.image4L = $scope.layouts.length -1;
                $scope.image5L = 0;
            } else {
                $scope.image1L = $scope._IndexL - 2;
                $scope.image2L = $scope._IndexL - 1;
                $scope.image3L = $scope._IndexL;
                $scope.image4L = $scope._IndexL + 1;
                $scope.image5L = $scope._IndexL + 2;
            }

        }

        $scope.layouts = [];
        if($scope.advert.layoutSliderImage){

            $scope.layouts .push({
                imageSlider: $scope.advert.layoutSliderImage,
                imageSmall: $scope.advert.layoutSmallSlider,
                imageFull: $scope.advert.layoutSliderFull,
                text: ''
            });
            $scope.advert.layouts.forEach(function(image) {
                // console.log("img",angular.toJson(image.image));
                $scope.layouts .push({
                    imageSlider: image.image.slider_fit.url,
                    imageSmall: image.image.small_slider.url,
                    imageFull: image.image.url,
                    text: ''
                });
            });
            $scope.smallImageL();


        }



        //slider end

        var array = $cookieStore.get('favorites');
        var index = array.indexOf($scope.advert.id);
        if (index > -1) {
            $scope.advert.inBasket = true;
        } else {
            $scope.advert.inBasket = false;
        }

        $scope.addFavorite = function(){
            console.log("add",$scope.advert.id )
            $scope.advert.inBasket = true;
            $rootScope.$broadcast('handleAddFavorite',$scope.advert);

        }

        $scope.removeFavorite = function(){
            console.log("remove",$scope.advert.id);
            $scope.advert.inBasket = false;
            $rootScope.$broadcast('handleRemoveFavorite',$scope.advert);

        }


        //modal window

        $scope.openModal = function(){
//            $state.go('request');

            var modalInstance =  $modal.open({
                templateUrl:'/assets/layouts/modal.html',
                controller:"RequestController"
            })
            modalInstance.result.then(function (selectedItem) {
                $log.debug("this", this)
                $state.go($state.current.name);
//                            $state.go($state.current.name);
            }, function () {
                $state.go($state.current.name);
//                            $state.go('index'); //return to parent state
            });
        }


        $scope.edit = function(){
            console.log("living", $scope.advert.living)
            $stateParams['living'] = $scope.advert.living;
            $state.go('edit',$stateParams);
//            if ($scope.advert.living == true){
//                $location.search('living',true)
//            } else{
//                $location.search('living',false)
//            }

        }


//        newsletter
        $scope.sendNewsletter = function(){
            $http({
                url: '/contact_us/newsletter?id=' + $scope.advert.id,
                method: "POST"
            }).success(function(data){

                    console.log("success",data)

                    $scope.showNewsletter = true;
                    $timeout(function() {
                        $scope.showNewsletter = false;
                    }, 3000);
                });
        }

    }])
