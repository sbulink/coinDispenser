export class UserStore {
    id: number | undefined;
    firstname: String = "";
    lastname: String = "";
    email: String = "";
  
    public getFirstName(): String {
      return this.firstname;
    }
    public getLastName(): String {
      return this.lastname;
    }
    public getEmail(): String {
      return this.email;
    }
  
    public setFirstName(name: String) {
      this.firstname = name;
    }
  
    public setLastName(name: String) {
      this.lastname = name;
    }
  
    public setEmail(email: String) {
      this.email = email;
    }
  }
  