angular.module('realty').controller('ManagemenController', ['$scope','$log','$state','OneManagement','$sce','Category',
    'NewAdvert','$timeout','$upload','$http',
    function ($scope,$log,$state,OneManagement,$sce,Category,NewAdvert,$timeout,$upload,$http) {
        $scope.management = OneManagement;
        $scope.dataUrls = []
        $scope.text = $sce.trustAsHtml($scope.management.text)

        Category.query().then(function(data){
            $scope.categories = data.categories;
        });
        $scope.flor = "/"

        $scope.sendMessage = false;
        $scope.errorMessage1 = false;
        $scope.errorMessage2 = false;

        $scope.downloadAnimation = false;

        $scope.send = function() {
            randNumber = (Math.random()*100000000).toFixed(0)

            if ($scope.signUpForm.$valid ) {
                if ($scope.captcha == $scope.val1 + $scope.val2){
                    console.log("good")

                    if ($scope.dataUrls.length > 0){
                        console.log("> 0")
                        $scope.downloadAnimation = true;
                        angular.forEach($scope.dataUrls, function(v,i) {

                            if (i == $scope.dataUrls.length - 1){

                                $scope.start(i, randNumber,true);
                            } else {
                                $scope.start(i, randNumber,false);
                            }
                        });

                    } else {
                        sendEmail ();
                    }





                } else {
                    $scope.errorMessage2 = true;
                    $timeout(function() {
                        $scope.errorMessage2 = false;
                    }, 5000);
                }

            } else {

                $scope.errorMessage1 = true;
                $timeout(function() {
                    $scope.errorMessage1 = false;
                }, 5000);
                $scope.submitted = true;
                if ($scope.submitted && $scope.signUpForm.category == undefined){
                    $('.select2-container').addClass('errorinput');
                    $('.select2-choice').css("background-color",'#FFDDDD');
                }
            }
        }
        function sendEmail (){
            NewAdvert.query({address:$scope.address,category:$scope.signUpForm.category,flor:$scope.flor,enter:$scope.enter,
                goal:$scope.goal, area:$scope.area,phone:$scope.phone,email:$scope.email,video:$scope.video, rand:randNumber});
            $scope.address = ""
            $scope.signUpForm.category = ""
            $scope.flor = "/"
            $scope.enter = ""
            $scope.goal = ""
            $scope.area = ""
            $scope.phone = ""
            $scope.email = ""
            $scope.video = ""
            $scope.downloadAnimation = false;
            $scope.sendMessage = true;
            $timeout(function() {
                $scope.sendMessage = false;
            }, 5000);
        }

        //captcha

        $scope.val1 = Math.floor((Math.random() * 10) + 1);
        $scope.val2 = Math.floor((Math.random() * 10) + 1);



        //files
        $scope.fileReaderSupported = window.FileReader != null;
        $scope.uploadRightAway = true;
        $scope.changeAngularVersion = function() {
            window.location.hash = $scope.angularVersion;
            window.location.reload(true);
        };
        $scope.hasUploader = function(index) {
            return $scope.upload[index] != null;
        };
//        $scope.abort = function(index) {
//            $scope.upload[index].abort();
//            $scope.upload[index] = null;
//        };

        $scope.abort = function(index) {
            console.log("index",index)
            $scope.selectedFiles.splice(index, 1);
            $scope.dataUrls.splice(index, 1);
            size ();
        };
        $scope.angularVersion = window.location.hash.length > 1 ? window.location.hash.substring(1) : '1.2.0';
        $scope.selectedFiles = [];


        $scope.onFileSelect = function($files) {


            $scope.progress = [];
            if ($scope.upload && $scope.upload.length > 0) {
                for (var i = 0; i < $scope.upload.length; i++) {
                    if ($scope.upload[i] != null) {
                        $scope.upload[i].abort();
                    }
                }
            }
            $scope.upload = [];
            $scope.uploadResult = [];
            $scope.maxSizeError = false;
            angular.forEach($files, function(v) {

                if ((($scope.totalSize + v.size)/1048576).toFixed(2) > 15){
                    $scope.maxSizeError = true;
                    $timeout(function() {
                        $scope.maxSizeError = false;
                    }, 5000);

                } else {
                    $scope.selectedFiles.push(v);
                    size ();
                }


            });



            $scope.dataUrls = [];
            for ( var i = 0; i < $scope.selectedFiles.length; i++) {
                var $file = $scope.selectedFiles[i];
                if (window.FileReader && $file.type.indexOf('image') > -1) {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL($scope.selectedFiles[i]);
                    var loadFile = function(fileReader, index) {
                        fileReader.onload = function(e) {
                            $timeout(function() {
                                $scope.dataUrls[index] = e.target.result;
                            });
                        }
                    }(fileReader, i);
                }

//                $scope.progress[i] = -1;
//                if ($scope.uploadRightAway) {
//                    $scope.start(i);
//                }
            }
        };

        function size (){
            $scope.totalSizeMb = 0;
            $scope.totalSize = 0;
            angular.forEach($scope.selectedFiles, function(v) {
                $scope.totalSize += v.size;

            });
            $scope.totalSizeMb = ($scope.totalSize/1048576).toFixed(2)
        }


        $scope.start = function(index, randNumber,last) {

            $scope.progress[index] = 0;
            $scope.errorMsg = null;
            $scope.upload[index] = $upload.upload({
                url : '/service/managements/save_images',
                method: $scope.httpMethod,
                headers: {'my-header': 'my-header-value'},
                data : {
                    myModel : $scope.dataUrls[index],
                    rand : randNumber
                },
                formDataAppender: function(fd, key, val) {
                    if (angular.isArray(val)) {
                        angular.forEach(val, function(v) {
                            fd.append(key, v);
                        });
                    } else {
                        fd.append(key, val);
                    }
                },
                /* transformRequest: [function(val, h) {
                 console.log(val, h('my-header')); return val + 'aaaaa';
                 }], */
                file: $scope.selectedFiles[index],
                fileFormDataName: 'myFile'
            }).then(function(response) {
                    $scope.uploadResult.push(response.data);
                    if (last == true){
                        console.log("last",last)
                        sendEmail ();
                    }
                }, function(response) {
                    if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
                }, function(evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                }).xhr(function(xhr){
                    xhr.upload.addEventListener('abort', function() {console.log('abort complete')}, false);
                });
        };


    }]);