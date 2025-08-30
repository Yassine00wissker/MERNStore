import { useSelector,useDispatch } from "react-redux";
import { RemoveFromCart, UpdateQty, ClearCart } from "../cart/CartSlice";

function CartPage() {
    const { cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="container mt-4">
            <h2>My Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul className="list-group">
                    {cartItems.map(item => (
                        <li key={item.id} className="list-group-item">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>{item.name}</h5>
                                    <p>Price: ${item.price}</p>
                                    <div className="input-group">
                                        <button className="btn btn-outline-secondary" onClick={() => dispatch(UpdateQty({ id: item.id, qty: item.qty - 1 }))}>-</button>
                                        <input type="text" className="form-control" value={item.qty} readOnly />
                                        <button className="btn btn-outline-secondary" onClick={() => dispatch(UpdateQty({ id: item.id, qty: item.qty + 1 }))}>+</button>
                                    </div>
                                </div>
                                <button className="btn btn-danger" onClick={() => dispatch(RemoveFromCart(item.id))}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {cartItems.length > 0 && (
                <div className="mt-4">
                    <button className="btn btn-danger" onClick={() => dispatch(ClearCart())}>Clear Cart</button>
                </div>
            )}
        </div>
    )
}

export default CartPage;