import {combineReducers} from 'redux';
import { mainReducer } from './reducer/mainReducer';


export default combineReducers({
    main: mainReducer
});
