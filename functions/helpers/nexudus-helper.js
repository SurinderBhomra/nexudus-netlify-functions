const bufferedCredentials = new Buffer.from(`${process.env.NEXUDUS_USERNAME}:${process.env.NEXUDUS_PASSWORD}`).toString('base64');

export const requestHeaders = {
    "Authorization": `Basic ${bufferedCredentials}`,
    "accept": "application/json", 
    "content-type": "application/json"
}