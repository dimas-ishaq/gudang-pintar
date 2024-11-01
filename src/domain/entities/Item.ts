

export default class Item {
  id?: string;
  transaction_id: string;
  product_id: string;
  quantity: number;
  price: number;

  constructor({ id, transaction_id, product_id, quantity, price }: {
    id: string, transaction_id: string, product_id: string, quantity: number, price: number
  }) {
    this.id = id;
    this.transaction_id = transaction_id;
    this.product_id = product_id;
    this.quantity = quantity;
    this.price = price;
  }
}