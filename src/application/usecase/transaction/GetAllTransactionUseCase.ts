import Transaction from "../../../domain/entities/Transaction";
import TransactionRepository from "../../../domain/repositories/TransactionRepository";

interface TransactionResult {
  transactions: any;
  items: any;
}

export default class GetAllTransactionUseCase {

  constructor(private transactionRepository: TransactionRepository) { }
  async execute(): Promise<TransactionResult> {
    return await this.transactionRepository.findAll()
  }
}