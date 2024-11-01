import Item from "../entities/Item";
import Transaction from "../entities/Transaction";

interface TransactionResult {
  transactions: Transaction;
  items: Item;
}

interface Report {
  start_date: string,
  end_date: string,
  type: string
}
export default interface TransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  findAll(): Promise<TransactionResult>;
  findByQuery(report: Report): Promise<any>;
  findByCategoryName(category_name: string): Promise<any>;
}