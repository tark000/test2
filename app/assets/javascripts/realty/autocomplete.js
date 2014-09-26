angular.module('autoComplete', []).directive('autoComplete', ['$http', '$log','$rootScope', function($http, $log,$rootScope) {

    // by default do not format autocomplete data
    var defaultFormatter = function(data) {

        var list = [];
        //var users = data.user
        //var products = data.product;
        console.log("data", angular.toJson(data))
        data.product.forEach(function(entry) {
            console.log("entry", angular.toJson(entry))
//            console.log("entry", angular.toJson(entry.categories))
            var title = entry.title;
            if (title != null) {
                list.push({
//                    'title': '<span class = "autocomplite-text">' + entry.title + '</span>  <img class = "autocomplit-img" src = "' + entry.photo + '">',
                    'title': '<span class = "autocomplite-text">' + entry.title + '</span>  ',
                    'id': 1,
                    'url': '/adverts/' + entry.slug
                });
            }
        });
        return list
    };

    return {

        scope: {
            source: "@",
            // autocomplete url to call
            formatter: "=",
            // (optional) transform data returned before for passing to autocomplete
            callBack: "="
            // (optional) callback when user selects an item
        },

        link: function(scope, element, attrs) {
//            console.log("atr", attrs);
            var formatter = scope.formatter || defaultFormatter;

            gotoTo = function(url) {
                window.location = url;
            },

                select = function(event, ui) {

                    gotoTo(ui.item.url);
                };

            _renderItem = function(ul, item) {
                return $("<li>").data("item.autocomplete", item)
                    //.append(item.title )
                    .append('<a ><div class="triangle" ></div>' + item.title + '</a>').appendTo(ul);
            };


            var dataSource = function(term, responseCallBack) {
                console.log("term ", term)
                $rootScope.$broadcast('handleBroadcastAdvert',term);
//                $http.get('/api/products?search=' + term.term).then(function(products) {
//                    //console.log("products 1",angular.toJson(products));
//                    var data = {};
//                    data.product = products.data.adverts;
//                    responseCallBack(formatter(data));
//                });

            };
//
            element.autocomplete({
                source: dataSource,
                minLength: 2,
                select: select

            }).data("ui-autocomplete")._renderItem = _renderItem;

            //console.log("element", element.autocomplete);
        }
    };
}]);



