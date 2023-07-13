


export interface IAdmin {
    phoneNumber: string;
    role: 'admin';
    password: string;
    name: {
        firstName: string;
        lastName: string;
    };
    firstName: string;
    lastName: string;
    address: string;

}
