

export default class Inventory {
  id?: string;
  name: string;
  stock: number;

  constructor({ id, name, stock }: { id: string, name: string, stock: number }) {
    this.id = id;
    this.name = name;
    this.stock = stock;
  }
}