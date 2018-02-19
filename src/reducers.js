import { combineReducers } from 'redux';
import recipesReducer from './reducers/recipesReducer';
import productsReducer from "./reducers/productsReducer";

export default function reducers () {
    return combineReducers({
        recipes: recipesReducer,
        products: productsReducer,
    });
}