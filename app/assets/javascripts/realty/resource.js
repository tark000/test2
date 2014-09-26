angular.module('realty').factory('Current',['$http','$log',function($http,$log) {
    var Current = {}
    Current.auth = false;
    Current.user = '';
    $http.get('/service/current/submissions').success(function(data){
        console.log("data",data )
        if(data === 'null'){
            Current.auth = false;
            $log.debug("Current.auth", data);

        }else{

            Current.auth = true;

            $log.debug("data resource user", data == null);
            $log.debug("data resource user", data);

            Current.user = data;

        }

    });
    return Current;

}]);




angular.module('realty').service('Search', ['$log',function($log){
    var List = {};

    function setList(item,value) {
        List[item]=value;
        $log.debug("search value", value);
    };

    function getList(){
        return List;
    }

    return {
        setList: setList,
        getList: getList
    }

}]);




angular.module('realty').factory('OptionsCreate', ['Operation','Category','Region','Street',
    'BusinessCenterClass','City','CurrencyUser','District','Door','FlatType',
    'FloorType','HouseMaterial','HouseType','MetroStation','PurpouseLand','RoomsType','StateRepair',
    function (Operation,Category,Region,Street,BusinessCenterClass,City,
              CurrencyUser,District,Door,FlatType,FloorType,HouseMaterial,HouseType,MetroStation,PurpouseLand,RoomsType,StateRepair) {
        var resource = {
            operations: Operation.query({}),
            categories: Category.query({}),
            regions: Region.query({}),
            //streets: Street.query({}),
            business_center_classes: BusinessCenterClass.query({}),
            cities: City.query({}),
            currency_users: CurrencyUser.query({}),
            //districts: District.query({}),
            doors: Door.query({}),
            flat_types: FlatType.query({}),
            floor_types: FloorType.query({}),
            house_materials: HouseMaterial.query({}),
            house_types: HouseType.query({}),
            metro_stations: MetroStation.query({}),
            purpouse_lands: PurpouseLand.query({}),
            rooms_types: RoomsType.query({}),
            state_repairs: StateRepair.query({})

        }

        return resource

    }]);

angular.module('realty').factory('Options', ['Operation','Category','City','MetroStation','Region',
    function (Operation,Category,City,MetroStation,Region) {


   var resource = {
       operations: Operation.query({}),
       categories: Category.query({}),
       cities: City.query({}),
       metro_stations: MetroStation.query({}),
       regions: Region.query({})
   }

    return resource
}]);

angular.module('realty').factory('Layout', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/layouts', name: 'layout'});
}]);

angular.module('realty').factory('Movie', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/movies', name: 'movie', enableRootWrapping: false,pluralName: 'adv'});
}]);

angular.module('realty').factory('Advert', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/products', name: 'advert', enableRootWrapping: false,pluralName: 'adv'});

}]);

angular.module('realty').factory('AdvertEdit', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/products', name: 'advert', enableRootWrapping: false,pluralName: 'adv'});

}]);
/*
 angular.module('realty').factory('AdvertEdit', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {
 console.log("run adverts",this);
 var resource = AdvertEdit
 var resource=  cachingRailsResourceFactory({url: '/service/products/:id/edit', id: 'advert', enableRootWrapping: false,pluralName: 'adv'});


 }]);
 */


angular.module('realty').factory('Operation', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/operation_types', name: 'operation'});
}]);

angular.module('realty').factory('Category', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/categories', name: 'category'});
}]);

angular.module('realty').factory('Region', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/regions', name: 'region'});
}]);

angular.module('realty').factory('AdvertImage', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/product_images', name: 'advert_image'});
}]);

angular.module('realty').factory('Street', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    var  resource =  cachingRailsResourceFactory({url: '/service/streets', name: 'street'});

    resource.findBySolr = function (city) {
        return resource.query({search: city});
    };

    return resource;

}]);


angular.module('realty').factory('BusinessCenterClass', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/business_center_classes', name: 'business_center_class'});
}]);

angular.module('realty').factory('City', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    var resource =  cachingRailsResourceFactory({url: '/service/cities', name: 'city'});

    resource.findByRegion = function (region) {
        return resource.query({region_id:region});
    };

    return resource;
}]);

angular.module('realty').factory('CurrencyUser', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/currency_users', name: 'currency_user'});
}]);

angular.module('realty').factory('District', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    var resource =  cachingRailsResourceFactory({url: '/service/districts', name: 'district'});

    resource.findByCity = function (city) {
        return resource.query({city_id:city});
    };

    return resource;
}]);

angular.module('realty').factory('Door', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/doors', name: 'door'});
}]);

angular.module('realty').factory('FlatType', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/flat_types', name: 'flat_type'});
}]);

angular.module('realty').factory('FloorType', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/floor_types', name: 'floor_type'});
}]);

angular.module('realty').factory('HouseMaterial', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/house_materials', name: 'house_material'});
}]);

angular.module('realty').factory('HouseType', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/house_types', name: 'house_type'});
}]);

angular.module('realty').factory('MetroStation', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/metro_stations', name: 'metro_station'});
}]);

angular.module('realty').factory('PurpouseLand', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/purpouse_lands', name: 'purpouse_land'});
}]);

angular.module('realty').factory('Region', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/regions', name: 'region'});
}]);

angular.module('realty').factory('RegionSearch', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/regions/search', name: 'region'});
}]);

angular.module('realty').factory('RoomsType', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/rooms_types', name: 'rooms_type'});
}]);

angular.module('realty').factory('StateRepair', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/state_repairs', name: 'state_repair'});
}]);


angular.module('realty').factory('Email', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {
    return cachingRailsResourceFactory({url: '/service/emails', name: 'email'});
}])

angular.module('realty').factory('Notariat', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {
    return cachingRailsResourceFactory({url: '/service/notariats', name: 'notariat'});
}])

angular.module('realty').factory('Management', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {
    return cachingRailsResourceFactory({url: '/service/managements', name: 'management'});
}])

angular.module('realty').factory('Lawyer', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {
    return cachingRailsResourceFactory({url: '/service/lawyers', name: 'lawyer'});
}])


angular.module('realty').factory('Comment', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {

    return cachingRailsResourceFactory({url: '/service/comments', name: 'comment'});
}]);



angular.module('realty').factory('Blog', ['cachingRailsResourceFactory', function (cachingRailsResourceFactory) {
    return cachingRailsResourceFactory({url: '/service/blog_themes', name: 'blog'});
}])

angular.module('realty').factory('NewAdvert', ['railsResourceFactory', function (railsResourceFactory) {
    return railsResourceFactory({
        url: '/service/managements/new_adverts',
        name: 'new_advert'
    });
}]);



