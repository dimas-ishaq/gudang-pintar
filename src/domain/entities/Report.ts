

export default class Report {
  start_date: string;
  end_date: string;
  transaction_type: string;
  transactions: any[];

  constructor({ start_date, end_date, transaction_type, transactions }: { start_date: string, end_date: string, transaction_type: string, transactions: any[] }) {
    this.start_date = start_date;
    this.end_date = end_date;
    this.transaction_type = transaction_type;
    this.transactions = transactions
  }
}