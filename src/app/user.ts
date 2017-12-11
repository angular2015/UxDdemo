export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public con_password: string,
    public task: string,
    public date: Date,


  ) { }
}
