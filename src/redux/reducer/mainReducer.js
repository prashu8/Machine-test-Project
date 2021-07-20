import { FAV_ARRAY_FAILURE, FAV_ARRAY_REQUEST, FAV_ARRAY_SUCCESS, SEARCH_ARRAY_FAILURE, SEARCH_ARRAY_REQUEST, SEARCH_ARRAY_SUCCESS, SHOW_ARRAY_FAILURE, SHOW_ARRAY_REQUEST, SHOW_ARRAY_SUCCESS } from "../action/action-type";


const initialState = {
    isLoading: false,
    badArrayList: "",
    favoriteArray: []
}




export const mainReducer = (state = initialState, action) => {
    switch (action.type) {

        case SHOW_ARRAY_REQUEST:
            return { ...state, isLoading: true }
        case SHOW_ARRAY_SUCCESS:
            return { ...state, isLoading: false, badArrayList: action.payload, }
        case SHOW_ARRAY_FAILURE:
            return { ...state, isLoading: false }



        case FAV_ARRAY_REQUEST:
            return { ...state, isLoading: true }
        case FAV_ARRAY_SUCCESS:
            return { ...state, isLoading: false, favoriteArray: action.payload, }
        case FAV_ARRAY_FAILURE:
            return { ...state, isLoading: false }


        case SEARCH_ARRAY_REQUEST:
            return { ...state, isLoading: true }
        case SEARCH_ARRAY_SUCCESS:
            return { ...state, isLoading: false, }
        case SEARCH_ARRAY_FAILURE:
            return { ...state, isLoading: false }


        default:
            return state
    }
}