

export default class Product {
  id?: string;
  name: string;
  category_id: string;
  category_name?: string;
  price: number;
  stock: number;
  description: string;
  created_at: string;
  updated_at: string;

  constructor({ id, name, category_id, category_name, price, stock, description, created_at, updated_at }: {
    id: string,
    name: string,
    category_id: string,
    category_name: string,
    price: number,
    stock: number,
    description: string,
    created_at: string,
    updated_at: string,
  }) {
    this.id = id;
    this.name = name;
    this.category_id = category_id;
    this.category_name = category_name;
    this.price = price;
    this.stock = stock;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at
  }


}