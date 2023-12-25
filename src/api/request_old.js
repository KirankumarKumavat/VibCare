import axios from 'axios';
import _ from 'lodash';
import { constants } from '../config';
import notifications from '../config/notifications';
import { showSimpleAlert, StorageService } from '../utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('access-token')
        if (value !== null) {
            return value
            // value previously stored
        }
    } catch (e) {
        // error reading value
    }
}

// 7 second timeout
const timeout = () =>
    new Promise(resolve => {
        const timestamp = +new Date();
        setTimeout(() => {
            resolve({ timeout: true, elapsed: +new Date() - timestamp });
        }, 20 * 1000);
    });

const getHeaders = () => {
    return (
        {
            'Content-type': 'application/json',
            'Platform': constants.isIOS ? 'iphone' : 'android',
            'App_version': constants.AppVersion,
            'Authorization': constants.auth_token,
            'Accept': '*/*'
        }
    )
};

const newHeaders = (token) => {
    return (
        {
            'content-type': 'application/json',
            'app_version': constants.AppVersion,
            'authorization': 'Bearer ' + token,
            'Accept': '*/*'
        }
    )
};

const updateAuthToken = async (request, headers) => {

    let refresh_token = await StorageService.getItem('refresh-token');
    let refreshToken = await r.post('refreshtoken', { refresh_token });

    if (!refreshToken) { return false; }
    refreshToken = await refreshToken.json();

    if (refreshToken.refresh_token) {
        StorageService.saveItem('refresh-token', refreshToken.refresh_token);
        return await buildRequest(
            request.endpoint,
            headers,
            request.params
        );
    }
};


const refreshTokenCall = async (request, method) => {
    let refresh_token = await StorageService.getItem('refresh-token');
    let refreshToken = await r.post(`${constants.apiCustomerVersion}/refreshtoken`, { refresh_token });
    if (!refreshToken) { return false; }
    refreshToken = await refreshToken.json();
    if (refreshToken.refresh_token) {
        StorageService.saveItem('refresh-token', refreshToken.refresh_token);
        StorageService.saveItem('access-token', refreshToken.access_token);
        if (request && method == 'GET') {
            let response = await r.get(request.endpoint, undefined);
            return response;
        }
        else if (request && method == 'POST') {
            let response = await r.post(request.endpoint, { ...request.params } || {});
            return response;
        } else {
            return true;
        }
    }
    return false;
};

/**
 * Validates server response
 * @param {promise} response server response
 * @param {object} options onSuccessMessage, onErrorMessage, ignoreAuth
 */
const validateResponse = async (
    response,
    {
        onErrorMessage = 'Server error: ',
        ignoreAuth = false,
        getTextResponse = false,
        returnErrorResponse = false,
    } = {},
    source,
    request,
    method
) => {
    const t = new Date();
    let token = await StorageService.getItem('access-token');
    const headers = newHeaders(token);
    const race = await Promise.race([response, timeout()]);

    console.log('racerace', race);
    console.log('race.status',race.status);

    if (race.timeout) {
        notifications.errors.timedOut();
        // json() stub
        race.json = () => new Promise(r => r(false));
        race.text = () => new Promise(r => r(false));
        if (source) source.cancel('time out');
        return false;
    }

    if (race.status === 500) {
        // race.json = () => new Promise(r => r({ errors: ['Server error'] }));
        notifications.errors.serverDown();
        if (returnErrorResponse) return response;
        return false;
    }
    
    if (race.status === 208) {
        showSimpleAlert('User Already Reported')
    }
    if (race.status === 400) {
        showSimpleAlert('Bad Request')
    }
    if (race.status === 500) {
        showSimpleAlert('Internal Server Error')
    }
    if (race.status === 401 && !ignoreAuth) {
        return await refreshTokenCall(request, method);
    }


    // handle errors by default
    if (getTextResponse) {
        const responseText = race.data;
        race.text = () => new Promise(r => r(responseText));
    } else {
        let responseJson;
        if (race.data) {
            responseJson = race.data;
        } else {
            return true;
        }
        console.log("%c Response::", 'background: #222; color: #bada55', responseJson);
        // TODO: remove json polyfill, rm json calls throughout app
        race.json = () => new Promise(r => r(responseJson));
        const errors = responseJson.code === 0 && responseJson.message;
        if (errors && errors.length) {
            if (onErrorMessage) {
                notifications.error(`${responseJson.message}`);
            }
            if (returnErrorResponse) return response;
            return false;
        }
    }
    return race;
};

const buildRequest = async (endpoint, params = {}, options = undefined) => {
    console.log("%c REQUEST::", 'background: #222; color: #bada55', { url: `${constants.APIBaseUrl}/${endpoint}`, ...params });
    if (endpoint == `${constants.apiCustomerVersion}/generatetoken`) {
        const headers = getHeaders();

        const source = axios.CancelToken.source();
        const request = { endpoint, params: params.data };
        console.log("url ---->", `${constants.APIBaseUrl}/${endpoint}`);
        console.log("headers ---->", headers);
        const state = await NetInfo.fetch();
        if (state.isConnected === false) {
            notifications.error("Please check your internet connectivity!");
            return false
        }
        return validateResponse(
            axios({
                url: `${constants.APIBaseUrl}/${endpoint}`,
                headers,
                ...params,
            }),
            options,
            source,
            request,
            params.method
        );
    } else {
        let token = await StorageService.getItem('access-token');
        const headers = newHeaders(token);

        const source = axios.CancelToken.source();
        const request = { endpoint, params: params.data };
        console.log("headers ---->", `${constants.APIBaseUrl}/${endpoint}`);
        console.log("params ----> ", params);
        const state = await NetInfo.fetch();
        if (state.isConnected === false) {
            notifications.error("Please check your internet connectivity!");
            return false
        }
        return validateResponse(
            axios({
                url: `${constants.APIBaseUrl}/${endpoint}`,

                headers,
                ...params,
                responseType: _.get(options, 'getTextResponse') ? 'text' : 'json',
                validateStatus: status => true,
                cancelToken: source.token,
            }),
            options,
            source,
            request,
            params.method
        );
    }
};

const get = (endpoint, params, options = undefined) =>
    buildRequest(
        endpoint,
        {
            method: 'GET',
            data: params,
        },
        options,
    );

const post = (endpoint, params, options = undefined) =>
    buildRequest(
        endpoint,
        {
            method: 'POST',
            data: params && JSON.stringify(params),
        },
        options,
    );

const put = (endpoint, params, options = undefined) =>
    buildRequest(
        endpoint,
        {
            method: 'PUT',
            data: params,
        },
        options,
    );

const deleteRequest = (endpoint, params = {}, options = undefined) =>
    buildRequest(
        endpoint,
        {
            method: 'DELETE',
            data: params,
        },
        options,
    );

const r = {
    get,
    post,
    put,
    delete: deleteRequest,
    validateResponse,
    refreshTokenCall,
};

export { getHeaders };

export default r;