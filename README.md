# Nexudus API - Netlify Functions #

## Setup ##

### Netlify CLI ###

If running this project for the first time, the Netlify CLI will need to be installed first. This is will only need to be done once.

```
npm install -g netlify-cli
```

To test the serverless functions locally, the `netlify dev` command needs to be run in your project's main folder. This starts a local server.

All functions can be found at `http://localhost:8888/api/{function-name}`.

### NPM Dependencies ###

```
npm install node-fetch
```

## Nexudus API Authentication ##

All connections to the Nexudus CRM API will be carried out through the platforms [Basic Authentication](https://developers.nexudus.com/reference/basic-authentication) process, which requires the User Name and Password.

These values will be stored in Environment Variables:

```
NEXUDUS_USERNAME="username"
NEXUDUS_PASSWORD="password"
```

When running the serverless functions locally, a `.env` file will need to be added to the root of the project containing the above contents.

## Serverless Functions Use ##

### Add Newsletter Subscriber ###

**Request URL Endpoint:** `/api/add-newsletter-subscriber`  
**Method:** POST  

**Example Request Body:**

```
{
    "business_id": 1234567890,
    "group_ids": [
        1234567890
    ],
    "name": "Full Name",
    "email_address": "test@test.com",
    "company_name": "SSB Ltd",
    "visit_reason": "N/A"
}
```

**Success Response:** 200. The ID of the record created will be provided.  

```
200:

{
    "id": 12345678
}
```

**Unsuccessful Response:** 400 for invalid request, or 500 if a record could not be created in Nexudus.  

```
400:

{
    "error_message": "Invalid request. No JSON was provided."
}

400 - Missing Business ID:

{
    "error_message": "Business ID is required.",
    "error_field": "business_id"
}

400 - Missing Group IDs:

{
    "error_message": "An array of To Group IDs is required.",
    "error_field": "group_ids"
}

400 - Missing Name:

{
    "error_message": "Name is required.",
    "error_field": "name"
}

400 - Missing Email Address:

{
    "error_message": "Email Address is required.",
    "error_field": "email_address"
}

500:

{
    "error_message": "Unable to send request."
}
```