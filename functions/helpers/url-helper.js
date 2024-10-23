/*
    Builds Query String based on JavaScript Object.
*/
export const queryStringBuilder = (jObj) => {
    let queryString = Object.keys(jObj).map((key) => { 
            if (Array.isArray(jObj[key])) { 
                return jObj[key].map((item, index) => { 
                return encodeURIComponent(key) + "[" + index + "]=" + encodeURIComponent(item); }).join("&");
            } 
            else { 
                return encodeURIComponent(key) + "=" + encodeURIComponent(jObj[key])
            }
        }).join("&");

    return `?${queryString}`;
}