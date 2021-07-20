import axios from "axios";
import { BASEURL, FAV_ARRAY_FAILURE, FAV_ARRAY_REQUEST, FAV_ARRAY_SUCCESS, SEARCH_ARRAY_FAILURE, SEARCH_ARRAY_REQUEST, SEARCH_ARRAY_SUCCESS, SHOW_ARRAY_FAILURE, SHOW_ARRAY_REQUEST, SHOW_ARRAY_SUCCESS } from "./action-type";
import NetInfo from "@react-native-community/netinfo";




export function breakingBadList() {
    return async dispatch => {
        dispatch({ type: SHOW_ARRAY_REQUEST });
        try {
            var mainURL = BASEURL + '/api/characters';
            var response = await axios({
                method: 'get',
                url: mainURL,
            })

            response = response.data;

            // console.log("breakingBadList redux Response : ", response);


            dispatch({ type: SHOW_ARRAY_SUCCESS, payload: response });
            return { breakingBadListSuccess: true, data: response };

        } catch (e) {
            console.log("transaction error : ", e);
            dispatch({ type: SHOW_ARRAY_FAILURE });
            return { breakingBadListSuccess: false, data: { message: "Please check your internet connection!" } };
        }
    }
}




export function searchList(body) {
    return async dispatch => {
        dispatch({ type: SEARCH_ARRAY_REQUEST });
        try {
            var mainURL = BASEURL + '/api/characters';
            console.log("BASEURL, body", mainURL, body);
            var response = await axios({
                method: 'get',
                url: mainURL,
                params: body
            })

            response = response.data;

            console.log("searchList redux Response : ", response);


            dispatch({ type: SEARCH_ARRAY_SUCCESS, payload: response });
            return { searchListSuccess: true, data: response };

        } catch (e) {
            dispatch({ type: SEARCH_ARRAY_FAILURE });
            return { searchListSuccess: false, data: { message: "Please check your internet connection!" } };
        }
    }
}





export function favArray(data) {
    return async dispatch => {
        dispatch({ type: FAV_ARRAY_REQUEST });
        try {
            const response = await NetInfo.fetch();
            if (response.isConnected) {
                dispatch({ type: FAV_ARRAY_SUCCESS, payload: data });
                return { favouriteSuccess: true, payload: data };
            } else {
                dispatch({ type: FAV_ARRAY_FAILURE });
                return { favouriteSuccess: false };
            }
        } catch (e) {
            dispatch({ type: FAV_ARRAY_FAILURE });
            return { favouriteSuccess: false };
        }
    }
}
