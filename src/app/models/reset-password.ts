export class ResetPassword {
    constructor
        (
            email?: string,
            password?: string,
            confirmPassword?: string,
    ) {
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
    public email: string;
    public password: string;
    public confirmPassword: string;
}