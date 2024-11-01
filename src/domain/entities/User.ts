export default class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;

  constructor({ id, name, email, password, role }: { id: string, name: string, email: string, password: string, role: string }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
