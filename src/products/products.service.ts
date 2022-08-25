import { Injectable } from "@nestjs/common";
import { Signup } from "./product.model";
@Injectable()
export class ProductsService {
   private products: Signup[] = [];

    insertProduct(userUsername:string,userPassword: string,userName: string){
        const prodId = Math.random().toString();
        const newProduct = new Signup(prodId,userUsername,userPassword,userName);
        this.products.push(newProduct);
        return newProduct;

    }
}