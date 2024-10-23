import fetch from "node-fetch";
import { requestHeaders } from "../helpers/nexudus-helper";

/*
    Sets subscriber record and takes into consideration if they have already subscribed previously.
*/
export const setSubscriber = async (businessId, groupIds, name, emailAddress, companyName, visitReason, isActive = true) => {
    // A check for an existing subscriber is required in order to allow a user to be subscribed
    // to more than one subscription group.
    const existingSubscriber = await getSubscriberByEmail(emailAddress);

    if (existingSubscriber === null) {
        return await upsertSubscriber(businessId, groupIds, name, emailAddress, companyName, visitReason, isActive);
    }
    else {
        // Ensure the users previous subscriptions are parsed when record is updated.
        groupIds.push(...existingSubscriber.Groups);

        return await upsertSubscriber(businessId, groupIds, name, emailAddress, companyName, visitReason, isActive, existingSubscriber.Id);
    }
}

/*
    Get subscriber record by Email Address.
*/
export const getSubscriberByEmail = async (emailAddress) => {
    const searchResponse = await fetch(`https://spaces.nexudus.com/api/content/newslettersubscribers?page=1&size=1&NewsLetterSubscriber_Email=${emailAddress}`, {
        method: "GET",
        headers: requestHeaders
    });

    const searchData = await searchResponse.json();

    if (searchData === undefined || searchData.Records.length === 0) {
        return null;
    }

    const subscriberByIdResponse = await fetch(`https://spaces.nexudus.com/api/content/newslettersubscribers/${searchData.Records[0].Id}`, {
        method: "GET",
        headers: requestHeaders
    });

    return await subscriberByIdResponse.json();
}

/*
    Creates or updates a subscriber record.
    The 'id' parameter needs to be present in order for an update to be performed.
*/
const upsertSubscriber = async (businessId, groupIds, name, emailAddress, companyName, visitReason, isActive = true, id = 0) => {
    const requestBody = {
        Id: id > 0 ? parseInt(id) : null,
        BusinessId: parseInt(businessId),
        Groups: groupIds,
        Name: name,
        Email: emailAddress,
        CompanyName: companyName,
        VisitReason: visitReason,
        Active: isActive
    };

    const response = await fetch("https://spaces.nexudus.com/api/content/newslettersubscribers", {
        method: id > 0 ? "PUT" : "POST",
        body: JSON.stringify(requestBody),
        headers: requestHeaders
    });

    const data = await response.json();

    if (data === undefined || !data.WasSuccessful) {
        return null;
    }
    
    return data.Value;
}