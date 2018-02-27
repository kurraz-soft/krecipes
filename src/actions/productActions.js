export function createProduct(recipe_id, name) {
    return {
        type: 'CREATE_PRODUCT',
        name: name.trim(),
        recipe_id: recipe_id,
    };
}

export function deleteProduct(id, recipe_id) {
    return {
        type: 'DELETE_PRODUCT',
        id: id,
        recipe_id: recipe_id,
    };
}