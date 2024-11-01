import TransactionRepository from "../../../domain/repositories/TransactionRepository";

interface Report {
  start_date: string,
  end_date: string,
  type: string
}


export default class GetTransactionReportUseCase {

  constructor(private transactionRepository: TransactionRepository) { }
  async execute(report: Report): Promise<any> {
    return await this.transactionRepository.findByQuery(report)
  }
}