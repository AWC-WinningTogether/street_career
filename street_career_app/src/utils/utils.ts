export const isValidNumber = (phone: string): boolean => {
    if (!phone) {
        return false;
    }
    return !!/\d{10}/.exec(phone);
}