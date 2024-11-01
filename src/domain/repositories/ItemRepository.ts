import Item from "../entities/Item";


export default interface ItemRepository {
  create(item: Item): Promise<Item>;
  findByIdTransaction(id: string): Promise<any>;
}