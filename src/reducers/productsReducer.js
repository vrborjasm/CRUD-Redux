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

const initialState = {
    products: [],
    error: null,
    loading: false,
    deleteProduct: null,
    productEdit: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_PRODUCT:
        case START_PRODUCTS_DOWNLOAD:
        case START_EDIT_PRODUCT:
            return {
                ...state,
                loading: action.payload
            }
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload]
            }
        case ADD_PRODUCT_ERROR:
        case PRODUCTS_DOWNLOAD_ERROR:
        case DELETE_PRODUCT_ERROR:
        case EDIT_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case PRODUCTS_DOWNLOAD_SUCCESS:
        return {
            ...state,
            loading: false,
            error: false,
            products: action.payload
        }
        case DELETE_PRODUCT:
            return {
                ...state,
                deleteProduct: action.payload               
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.filter( product => product.id !== state.deleteProduct),
                deleteProduct: null
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                productEdit: action.payload
            }
        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                productEdit: null,
                products: state.products.map( product => product.id === action.payload.id ? product = action.payload : product )        
            }
        default:
            return state;
    }
}