import { Controller, Post , Body } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('signup')
export class ProductsController { 
    constructor(private readonly productsService: ProductsService) {


    }
    @Post()
    addUser(
        @Body('Username') userUsername:string, 
        @Body('Password') userPassword: string,
        @Body('Name') userName: string): 
        any {
        const generatedId= this.productsService.insertProduct(userUsername,userPassword,userName);
        return generatedId;

    }

}