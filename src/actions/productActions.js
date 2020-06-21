import {
    ADD_PRODUCT,
    ADD_PRODUCT_ERROR,
    ADD_PRODUCT_SUCCESS,
    START_PRODUCTS_DOWNLOAD,
    PRODUCTS_DOWNLOAD_SUCCESS,
    PRODUCTS_DOWNLOAD_ERROR,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
    EDIT_PRODUCT,
    START_EDIT_PRODUCT,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR
} from '../types';

import clientAxios from '../config/axios';
import Swal from 'sweetalert2';

export function newProductAction(product) {
    return async (dispatch) => {
        dispatch( addProduct() );

        try {
            await clientAxios.post('/products', product);
            dispatch( addProductSuccess(product) );
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch( addProductError(true) );
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const addProduct = () => ({
    type: ADD_PRODUCT,
    payload: true
})

const addProductSuccess = (product) => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
})

const addProductError = (state) => ({
    type: ADD_PRODUCT_ERROR,
    payload: state
})

export function getProductsAction() {
    return async (dispatch) => {
        dispatch( getProducts() );

        try {
            const resp = await clientAxios.get('/products');
            dispatch( getProductsSuccess(resp.data) )
        } catch (error) {
            console.log(error);
            dispatch( getProductsError() )
        }
    }
}

const getProducts = () => ({
    type: START_PRODUCTS_DOWNLOAD,
    payload: true
});

const getProductsSuccess = products => ({
    type: PRODUCTS_DOWNLOAD_SUCCESS,
    payload: products
});

const getProductsError = () => ({
    type: PRODUCTS_DOWNLOAD_ERROR, 
    payload: true
});

export function deleteProductAction(id) {
    return async (dispatch) => {
        dispatch( deleteProduct(id) );
        try {
            await clientAxios.delete(`/products/${id}`)
            dispatch( deleteProductSuccess());
            Swal.fire(
                'Eliminado!',
                'Tu producto fue eliminado.',
                'success'
              )
        } catch (error) {
            console.log(error);
            dispatch( deleteProductError() );
        }      
    }
}

const deleteProduct = id => ({
    type: DELETE_PRODUCT,
    payload: id
});

const deleteProductSuccess = () => ({
    type: DELETE_PRODUCT_SUCCESS
});

const deleteProductError = () => ({
    type: DELETE_PRODUCT_ERROR,
    payload: true
});

export function getEditProductAction(product) {
    return (dispatch) => {
        dispatch( getEditProduct(product) )
    }
}

const getEditProduct = product => ({
    type: EDIT_PRODUCT,
    payload: product
});

export function editProductAction(product) {
    return async (dispatch) => {
        dispatch( editProduct() );

        try {
            await clientAxios.put(`/products/${product.id}`, product);
            dispatch( editProductSuccess(product) );
        } catch (error) {
            dispatch( editProductError() );
        }
    }
}

const editProduct = () => ({
    type: START_EDIT_PRODUCT,
    payload: true
})

const editProductSuccess = product => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload: product
})

const editProductError = () => ({
    type: EDIT_PRODUCT_ERROR,
    payload: true
})