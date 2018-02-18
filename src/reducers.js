import { combineReducers } from 'redux';
import recipesReducer from './reducers/recipesReducer';

export default function reducers () {
    return combineReducers({
        recipes: recipesReducer,
    });
}