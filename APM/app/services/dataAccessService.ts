/// <reference path="../../../typings/tsd.d.ts" />

module app.services {
    import IProduct = app.domain.IProduct;
    interface IDataAccessService {
        getProductResource(): ng.resource.IResourceClass<IProductResource>;

    }
    interface IProductResource extends ng.resource.IResource<IProduct> {

    }
    export class DataAccessService implements IDataAccessService {

        static $inject = ["$resource"]
        constructor(private $resource: ng.resource.IResourceService){

        }

        getProductResource(): ng.resource.IResourceClass<IProductResource>{
            return this.$resource('/api/products/:productId');
        }

    }
    // Register service in angular module
    angular
        .module("services")
        .service("dataAccessService", DataAccessService)

}