


export type Transaction_type = 'sale' | 'purchase'

export default class Transaction {
  [x: string]: any;
  id?: string;
  user_id: string;
  type: Transaction_type;
  date: string;

  constructor({ id, user_id, type, date, details }: { id: string, user_id: string, type: Transaction_type, date: string, details: any[] }) {
    this.id = id;
    this.user_id = user_id;
    this.type = type;
    this.date = date;
  }
}