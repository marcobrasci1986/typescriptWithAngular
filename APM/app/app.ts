module app {
    var main = angular.module('productManagement',
        ['ngRoute',
            'productResourceMock',
            'services']);

    main.config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider:ng.route.IRouteProvider):void {

        $routeProvider
            .when('/productList', {
                templateUrl: 'app/views/products/productListView.html',
                controller: 'ProductListController as vm'
            })
            .when('/productDetail/:productId', {
                templateUrl: 'app/views/products/productDetailView.html',
                controller: 'ProductDetailController as vm'
            })
            .otherwise('/productList');
    }
}
