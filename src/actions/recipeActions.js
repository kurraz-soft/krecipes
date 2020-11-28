export function deleteRecipe(id) {
    return {
        type: 'DELETE_RECIPE',
        payload: id,
    }
}

export function searchRecipe(search) {
    return {
        type: 'SEARCH_RECIPE',
        payload: search,
    }
}

export function editNameRecipe(id, name) {
    return {
        type: 'EDIT_NAME_RECIPE',
        id: id,
        name: name.trim(),
    }
}

export function createRecipe(id, name) {
    return {
        type: 'CREATE_RECIPE',
        name: name.trim(),
        id: id,
    }
}

export function loadLocalData(history) {
    return {
        type: 'LOAD_LOCAL_DATA',
        history: history,
    }
}

export function saveRecipeProducts(id, products) {
    return {
        type: 'SAVE_RECIPE_PRODUCTS',
        id: id,
        products: products,
    }
}

/**
 * Sets price to recipes product collection
 *
 * @param name
 * @param recipe_id
 * @param price
 * @returns {{type: string, id: *, recipe_id: *, price: *}}
 */
export function setDefaultProductPrice(name, recipe_id, price) {
    return {
        type: 'SET_DEFAULT_PRODUCT_PRICE',
        name: name.trim(),
        recipe_id: recipe_id,
        price: price,
    }
}

export function setRecipeProductActivity(recipe_id, product_id,is_active) {
    return {
        type: 'SET_RECIPE_PRODUCT_ACTIVITY',
        recipe_id: recipe_id,
        product_id: product_id,
        is_active: is_active,
    }
}

/*
export function toggleAddItemMode() {
    return {
        type: 'TOGGLE_ADD_ITEM_MODE',
    }
}*/
