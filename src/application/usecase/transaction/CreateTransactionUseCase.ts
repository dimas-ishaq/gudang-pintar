import Transaction from "../../../domain/entities/Transaction";
import TransactionRepository from "../../../domain/repositories/TransactionRepository";


export default class CreateTransactionUseCase {

  constructor(private transactionRepository: TransactionRepository) { }

  async execute(transaction: Transaction): Promise<Transaction> {
    return await this.transactionRepository.create(transaction)
  }
}