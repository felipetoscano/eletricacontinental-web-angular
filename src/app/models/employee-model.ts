export class EmployeeModel {
    id?: number;
    firstName: String;
    lastName: String;
    cellphone: String;
    email: String;

    constructor() {
        this.id = undefined;
        this.firstName = '';
        this.lastName = '';
        this.cellphone = '';
        this.email = '';
    }
}