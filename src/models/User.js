// Created by Anna McColl 25-04-23
// Model for User objects sent from back end.

class User{
    constructor(id, username, email){
        this.id = id;
        this.username = username;
        this.email = email;
    }
}

export default User;