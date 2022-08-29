import { Injectable,NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

const fs=require('fs')
@Injectable()
export class ProductsService {
   private products: Product[]=this.loadNewData();

    insertProduct(
        productName:string, 
        productDescription: string,
        productPrice: number){
        this.products=this.loadNewData();
        const prodId = this.products.length +1;
        // const getdate= new Date();
        // const date ={
        //     month:getdate.toLocaleString("en-US",{month: "long"}),
        //     day : getdate.toLocaleString("en-US", { day: "2-digit" }),
        //     year : getdate.getFullYear()
        // }
        const newProduct = new Product(prodId,productName,productDescription,productPrice);
        this.products.push(newProduct);
        fs.writeFileSync('src/products/data.json',JSON.stringify(this.products));
        return {newProduct};

    }
    getProducts(){
        this.products=this.loadNewData();
        return [...this.products];
    }

    getSingleProduct(productId: Number) {
        this.products=this.loadNewData();
        const product = this.products.find((prod) => prod.prodId == productId);   
        return{...product };
    }

    updateName(productId: number,productName: string){
        this.products=this.loadNewData();
        const [product, index] = this.findProduct(productId);
        this.products[index].productName=productName;
        fs.writeFileSync('src/products/data.json',JSON.stringify(this.products));
    }
    updateDescription(productId: number,productDescription: string){
        this.products=this.loadNewData();
        const [product, index] = this.findProduct(productId);
        this.products[index].productDescription=productDescription;
        fs.writeFileSync('src/products/data.json',JSON.stringify(this.products));
    }
    updatePrice(productId: number,productPrice: number){
        this.products=this.loadNewData();
        const [product, index] = this.findProduct(productId);
        this.products[index].productPrice=productPrice;
        fs.writeFileSync('src/products/data.json',JSON.stringify(this.products));
    }

    private findProduct(id:number): [Product, number]{
        const productIndex = this.products.findIndex(prod=> id == prod.prodId);
        const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException('Could not find product');
        }
        return [product, productIndex];
    }

    private loadNewData(){
        const getdata = fs.readFileSync("src/products/data.json");
        // console.log(getdata);
        const dataBuffer = getdata.toString();
        // console.log(dataBuffer);
        try {
            return JSON.parse(dataBuffer || '')
        } catch (error) {
            return [];
        }

        
    }
}