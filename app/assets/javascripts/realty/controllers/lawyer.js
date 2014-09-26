angular.module('realty').controller('LawyerController', ['$scope','$log','$state','Lawyer','Blog',
    function ($scope,$log,$state,Lawyer,Blog) {


        Lawyer.query().then(function(data){
            console.log("lawyers",data)
            $scope.lawyers = data;
        });

        Blog.query({}).then(function(data){
            $scope.blogs = data.blog_themes;
        });

    }]);



angular.module('realty').controller('BlogShowController', ['$scope','$log','OneBlog','Comment','$stateParams','$anchorScroll','$timeout','$rootScope',
    function ($scope,$log,OneBlog,Comment,$stateParams,$anchorScroll,$timeout,$rootScope) {

        $anchorScroll();

        $scope.blog = OneBlog;



        $scope.errorMessage = false;
        $scope.showMessage = false;

        Comment.query($stateParams).then(function(data){
            $scope.comments = data;
            console.log("$scope.comments", $scope.comments);
        });

        $scope.newComment = {}
        $scope.newComment.phone = "";
        $scope.newComment.name = "";
        $scope.create = function(name,phone){
            console.log("$scope.phone",$scope.phone)

            console.log("$scope.name",$scope.name)



//            console.log("$scope.product.id", $scope.blog.id);
//            console.log("current.user.first_commen",$rootScope.current.user.first_commen)
            if ($scope.newComment.$valid){
                console.log("valid")

                if ($scope.captcha == $scope.val1 + $scope.val2){
                    console.log("$scope.phone",angular.toJson($scope.newComment.phone))
                    console.log("$scope.name",angular.toJson($scope.newComment.name))
                    new Comment({text: $scope.newCommentBody, blog_theme_id: $scope.blog.id, name: $scope.name, phone: $scope.phone }).create().then(function(data){
                    console.log(" data", data);
//                    $scope.comments.push(data);

                    });
                    $scope.newCommentBody = '';
                    $scope.name = '';
                    $scope.phone = '';
                    $scope.showMessage = true;
                    $timeout(function() {
                        $scope.showMessage = false;
                    }, 10000);
                } else {
                    $scope.errorMessage = true;
                    $timeout(function() {
                        $scope.errorMessage = false;
                    }, 5000);
                }
            } else {
                $scope.submitted = true;
            }



        }


        $scope.deleteComment = function(comment,index){
            comment.remove().then(function(data){
                console.log("destroy",data)

                $scope.comments.splice( index, 1 );


            });

        }


        $scope.buttonDisable = true;

        //check comment length < 2
        $scope.$watch('newCommentBody', function(newVal, oldVal) {

            if(angular.isDefined(newVal)){
                if (newVal.length < 2){
                    $scope.buttonDisable = true;
                } else{
                    $scope.buttonDisable = false;
                }
            }
        });


        //captcha

        $scope.val1 = Math.floor((Math.random() * 10) + 1);
        $scope.val2 = Math.floor((Math.random() * 10) + 1);

    }]);