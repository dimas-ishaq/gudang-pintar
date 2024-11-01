import TransactionRepository from "../../../domain/repositories/TransactionRepository";

export default class GetStockReportUseCase {
  constructor(private transactionRepository: TransactionRepository) { }
  async execute(category_name: string) {
    return await this.transactionRepository.findByCategoryName(category_name)
  }
}