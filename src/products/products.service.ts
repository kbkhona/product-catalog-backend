import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto)
    // console.log('*******************************reached here')
    try{
      return await this.productsRepository.save(product);
    }
    catch(err){
      throw err;
    }
  }

  async findAll() {
    return await this.productsRepository.find();
  }

  async findOne(id: number) {
    return await this.productsRepository.findOne({
      where: {id}
    })
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    if(!product) throw new NotFoundException;
    
    Object.assign(product, updateProductDto)
    return await this.productsRepository.save(product)
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if(!product) throw new NotFoundException;

    return await this.productsRepository.remove(product)
  }
}
