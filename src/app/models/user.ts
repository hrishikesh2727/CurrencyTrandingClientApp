export class User {
    constructor
    (
        username?: string,
        firstName?: string,
        lastName?: string,
        email?: string,
        password?: string,
        active?: string
     )
     {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.active = active;
     }
     public username: string;
     public firstName: string;
     public lastName: string;
     public email: string;
     public password: string;
     public active: string;
}
