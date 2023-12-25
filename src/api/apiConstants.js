import { Platform } from '../utils/importLibrary'
/**
 * Error code found in app
 */
const errorCodes = {
   TIMEOUT: "111",
   BAD_REQUEST: 400,
   INTERNAL_SERVER_ERROR: 500,
   ALREADY_REPORTED: 208,
   USER_CREATED: 201,

   INVALID_APP_VERSION: 304,
   TOKEN_EXPIRED: 401,
   INVALID_TOKEN: 403,
   USER_DELETED: 405,
   USER_BLOCKED: 406,
   USER_UNSUBSCRIBE: 426,
}

/**
 * all url used in app
 */
// https://arthcrm.com:2087/Items/GetAllTherapeutic
const apiUrl = {
   // SERVER_API_URL: "http://3.140.166.216:3000/api/v1/", ////Live url
   SERVER_API_URL: "https://arthcrm.com:2087/",
}

/**
 * web pages urls in app
 */

const webPageUrls = {
   refresh_token: "Authorization:@#Slsjpoq$S1o08#MnbAiB%UVUV&Y*5EU@exS1o!08L9TSlsjpo#FKDFJSDLFJSDLFJSDLFJSDQY",
   privacyPolicyUrl: "",
   termsAndConditionUrl: "",
}


const apiConfigs = {
   ...errorCodes,
   ...apiUrl,
   ...webPageUrls,
}

export default apiConfigs;