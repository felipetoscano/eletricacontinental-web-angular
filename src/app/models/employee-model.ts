export class EmployeeModel {
    id: number;
    firstName: String;
    lastName: String;
    cellphone: String;
    email: String;

    constructor(id: number, firstName: String, lastName: String, cellphone: String, email: String) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.cellphone = cellphone;
        this.email = email;
    }
}