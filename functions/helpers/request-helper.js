/*
    Checks if a JSON string is valid.
*/
export const isValidJson = (jsonStr) => {
    if (jsonStr === undefined || jsonStr.length === 0) {
        return false;
    }

    try {
        JSON.parse(jsonStr);
    } 
    catch (e) {
        return false;
    }
    
    return true;
}