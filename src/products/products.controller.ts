import { Controller, Post , Body, Get, Param, Patch } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('product')
export class ProductsController { 
    constructor(private readonly productsService: ProductsService) {


    }
    @Post()
    addProduct(
        @Body('Name') productName:string, 
        @Body('Description') productDescription: string,
        @Body('Price') productPrice: number): 
        any {
        const generatedId= this.productsService.insertProduct(productName,productDescription,productPrice);
        return {id: generatedId};

    }
    @Get()
    getAllProducts(){
      return this.productsService.getProducts();  
    }

    @Get (':id')
    getProduct(@Param('id') prodId: number){
        return this.productsService.getSingleProduct(prodId);

    }
    @Patch(':id')
    updateProduct(
        @Param('id') prodId: number,
        @Body('Name') productName: string,
        @Body('Description') productDescription: string,
        @Body ('Price') productPrice:number)
        
        {
            this.productsService.updateName(prodId, productName);
            this.productsService.updateDescription(prodId, productDescription);
            this.productsService.updatePrice(prodId, productPrice);
            return "Update Successful";
        } 
    
}