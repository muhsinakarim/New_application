import { Controller, Post , Body } from "@nestjs/common";
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
        return generatedId;

    }

}