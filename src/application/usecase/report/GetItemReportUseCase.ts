import ItemRepository from "../../../domain/repositories/ItemRepository";





export default class GetItemReportUseCase {
  constructor(private itemRepository: ItemRepository) { }

  async execute(id: string) {
    return await this.itemRepository.findByIdTransaction(id)
  }
}