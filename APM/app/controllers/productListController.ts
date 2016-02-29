module app.controllers {

    interface IProductListModel {
        title:string;
        showImage: boolean;
        products: app.domain.IProduct [];
        toggleImage(): void;
    }

    class ProductListController implements IProductListModel {
        title:string;
        showImage:boolean;
        products:app.domain.IProduct [];

        static $inject=['dataAccessService'];
        constructor(private dataAccessService: app.services.DataAccessService) {
            this.title = "Product list marco";
            this.showImage = false;
            this.products = [];

            var productResource = dataAccessService.getProductResource();
            productResource.query((data: app.domain.IProduct[]) => {
                this.products = data;
            });

        }

        toggleImage():void {
            this.showImage = !this.showImage;
        }
    }
    // Add controller to main angular module
    angular
        .module('productManagement')
        .controller('ProductListController', ProductListController)
}

