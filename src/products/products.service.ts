import { Injectable } from "@nestjs/common";
import { Product } from "./product.model";
const fs=require('fs')
@Injectable()
export class ProductsService {
   private products: Product[] = [];

    insertProduct(
        productName:string, 
        productDescription: string,
        productPrice: number){
        const prodId = this.products.length +1;
        const getdate= new Date();
        const date ={
            month:getdate.toLocaleString("en-US",{month: "long"}),
            day : getdate.toLocaleString("en-US", { day: "2-digit" }),
            year : getdate.getFullYear()
        }
        const newProduct = new Product(prodId,productName,productDescription,productPrice);
        this.products.push(newProduct);
        fs.writeFileSync('src/products/data.json',JSON.stringify(this.products));
        return {date,newProduct};

    }
}