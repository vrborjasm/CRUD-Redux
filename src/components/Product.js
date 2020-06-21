import React from 'react';
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {deleteProductAction, getEditProductAction} from '../actions/productActions'
import Swal from 'sweetalert2';

const Product = ({product}) => {
    const { name, price, id } = product  

    const dispatch = useDispatch();
    const history = useHistory();

    const confirmDeleteProduct = id => {    
        Swal.fire({
            title: 'Estas seguro?',
            text: "No podras recuperar el producto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                dispatch(deleteProductAction(id));
            }
          })

        
    }

    const editRedirect = product => {
        dispatch( getEditProductAction(product) );
        history.push(`/products/edit/${product.id}`);
    }

    return ( 
        <tr>
            <td>{name}</td>
            <td><span className="font-weight-bold">$ {price}</span></td>
            <td className="acciones">
                <button
                type="button"
                onClick={ () => editRedirect(product) }
                className="btn btn-primary mr-2"
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmDeleteProduct(id)}
                >Eliminar</button>
            </td>
        </tr>
     );
}
 
export default Product;