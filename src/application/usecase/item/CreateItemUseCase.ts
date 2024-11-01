import Item from "../../../domain/entities/Item";
import ItemRepository from "../../../domain/repositories/ItemRepository";



export default class CreateItemUseCase {

  constructor(private itemRepository: ItemRepository) { }
  async execute(item: Item): Promise<Item> {
    return await this.itemRepository.create(item)
  }
}