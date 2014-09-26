angular.module('FileUpload', [])
    .directive('fileUpload',[ function () {
        return {
            scope: true,        //create a new scope
            link: function (scope, el, attrs) {
                el.bind('change', function (event) {
                    var files = event.target.files;
                    //iterate files since 'multiple' may be specified on the element
                    for (var i = 0;i<files.length;i++) {
                        //emit event upward
                        scope.$emit("fileSelected", { file: files[i], model:attrs.ngModel });
                    }
                });
            }
        };
    }])
    .directive('additionalFileUpload', [function () {
        return {
            scope: true,        //create a new scope
            link: function (scope, el, attrs) {
                el.bind('change', function (event) {
                    var files = event.target.files;
                    //iterate files since 'multiple' may be specified on the element
                    for (var i = 0;i<files.length;i++) {
                        console.log("files[i]",files[i])
                        //emit event upward
                        scope.$emit("additional_files", { file: files[i],model:attrs.ngModel,index:i });
                    }
                });
            }
        };
    }]);








//http://shazwazza.com/post/Uploading-files-and-JSON-data-in-the-same-request-with-Angular-JS