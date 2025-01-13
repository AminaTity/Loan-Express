
export default abstract class Utils {

    // Check if an email is valid or not
    static isEmailValid(email: string): boolean {
        const emailRegex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,6}$");
        return emailRegex.test(email);
    };
}