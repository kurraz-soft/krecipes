export function createProduct(recipe_id, name) {
    return {
        type: 'CREATE_PRODUCT',
        name: name,
        recipe_id: recipe_id,
    };
}

export function changeProductName(id, name) {
    return {
        type: 'CHANGE_NAME_PRODUCT',
        id: id,
        name: name,
    };
}

export function deleteProduct(id, recipe_id) {
    return {
        type: 'DELETE_PRODUCT',
        id: id,
        recipe_id: recipe_id,
    };
}