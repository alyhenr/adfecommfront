export const TAX_PERCENTAGE = 2;

export const truncateText = (text: string, maxSize: number = 150) : string => {    
    return text.length > maxSize ? text.slice(0, maxSize - 3) + "..." : text
}

export const formatPhoneNumber = (phone : string) : string => {
    const cleanedPhone: string= phone.replace("(", "").replace(")", "").replace("-","")

    return cleanedPhone.length > 2 
        ? "(" + cleanedPhone.slice(0,2) + ")" 
            + (cleanedPhone.length >= 11 
                ? cleanedPhone.slice(2,7) + "-" + cleanedPhone.slice(7,11)
                : cleanedPhone.slice(2))
    : phone
}

export const validateLocalStoredItems = (item: string) : boolean =>  {
    switch (item) {
        case "cartItems":
            return true;
        case "loggedInUser":
            return true;
        default:
            return false;
    }
}

export const calculateTax = (totalPrice: number) : number => {
    return totalPrice * (TAX_PERCENTAGE / 100);
}