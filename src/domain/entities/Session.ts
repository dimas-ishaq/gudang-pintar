

export default class Session {
  id?: string;
  user_id: string;
  refresh_token: string;
  role: string

  constructor({ id, user_id, refresh_token, role }: { id: string, user_id: string, refresh_token: string, role: string }) {
    this.id = id;
    this.user_id = user_id;
    this.refresh_token = refresh_token;
    this.role = role;
  }
}