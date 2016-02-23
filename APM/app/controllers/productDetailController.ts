module app.controllers {
    import IProduct = app.domain.IProduct;
    import DataAccessService = app.services.DataAccessService;
    import IRouteParamsService = angular.route.IRouteParamsService;

    interface IProductDetailModel {
        title: string;
        product: IProduct;
    }

    interface IProductParams extends IRouteParamsService {
        productId: number;
    }

    class ProductDetailController implements IProductDetailModel {
        title:string;
        product:IProduct;

        static $inject = ['$routeParams','dataAccessService'];

        constructor(private $routeParams:IProductParams,
                    private dataAccessService:DataAccessService) {
            this.title = "Product Detail";

            var productResource = dataAccessService.getProductResource();
            productResource.get({
                productId: $routeParams.productId
            }, (data:IProduct) => {
                this.product = data;
            });
        }
    }
    angular
        .module('productManagement')
        .controller('ProductDetailController', ProductDetailController);
}