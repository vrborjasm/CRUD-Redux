import React, {Fragment, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsAction } from '../actions/productActions';
import Product from './Product';

const Products = () => {
    
    const dispatch = useDispatch();

    const products = useSelector( state => state.products.products);
    const error = useSelector( state => state.products.error);
    const loading = useSelector( state => state.products.loading);

    useEffect(() => {
        const getProducts = () => dispatch( getProductsAction() );
        getProducts();
        // eslint-disable-next-line
    },[]);
    
    return ( 
        <Fragment>
            <h2 className="text-center my-5">Listado de Productos</h2>
            { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null }
            { loading ? <p className="text-center">Cargando...</p> : null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { products.length === 0 ? 'No hay productos' : (
                        products.map( product => (
                            <Product 
                                key={product.id}
                                product={product}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
     );
}
 
export default Products;