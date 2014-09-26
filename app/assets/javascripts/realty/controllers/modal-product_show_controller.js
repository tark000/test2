angular.module('realty').controller('ModalAdvertShowController',['$scope','$q','$stateParams','$state',
    'OneAdvert','$log','$modalInstance',
    function($scope, $q,$stateParams, $state,OneAdvert,$log,$modalInstance){


        $scope.advert = OneAdvert;
        // initial image index
        $scope._Index = 0;


        // if a current image is the same as requested image
        $scope.isActive = function (index) {

            return $scope._Index === index;
        };
        // show prev image
        $scope.showPrev = function () {

            $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.slides.length - 1;

        };

        // show next image
        $scope.showNext = function () {
            $scope._Index = ($scope._Index < $scope.slides.length - 1) ? ++$scope._Index : 0;
        };



        // show a certain image
        $scope.showPhoto = function (index) {
            $scope._Index = index;
        };

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



        }

        var index = $stateParams['index'];
        console.log("indes",index)
        if (index != null && +index && index >= 0 && index < $scope.slides.length){
            $scope._Index = parseFloat($stateParams['index']);

        } else {
            $scope._Index = 0;
        }

        $scope.cancel = function () {
            $stateParams['index'] = null;
            $state.go('show',$stateParams).then(function(){
                $modalInstance.close();
            });
        };

    }])