import { setSubscriber } from "./providers/nexudus-newsletter-provider";
import { isValidJson } from "./helpers/request-helper"

exports.handler = async (event, context) => {
  const jsonRequest = event.body;

  if (!isValidJson(jsonRequest)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error_message: "Invalid request. No JSON was provided."
      })
    }
  }

  const jsonRequstObj = JSON.parse(jsonRequest);

  if (jsonRequstObj.business_id === undefined || jsonRequstObj.business_id === "") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error_message: "Business ID is required.",
        error_field: "business_id"
      })
    }
  }

  if (jsonRequstObj.name === undefined || jsonRequstObj.name === "") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error_message: "Name is required.",
        error_field: "name"
      })
    }
  }

  if (jsonRequstObj.email_address === undefined || jsonRequstObj.email_address === "") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error_message: "Email Address is required.",
        error_field: "email_address"
      })
    }
  }

  if (jsonRequstObj.group_ids === undefined || jsonRequstObj.group_ids.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error_message: "An array of To Group IDs is required.",
        error_field: "group_ids"
      })
    }
  }

  const setSubscriberResponse = await setSubscriber(jsonRequstObj.business_id,
                                                    jsonRequstObj.group_ids,
                                                    jsonRequstObj.name,
                                                    jsonRequstObj.email_address,
                                                    jsonRequstObj.company_name,
                                                    jsonRequstObj.visit_reason);

  if (setSubscriberResponse !== null) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        id: setSubscriberResponse.Id
      })
    }
  }
  else {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error_message: "Unable to send request."
      })
    }
  }
}