import { useSelector, useDispatch } from "react-redux";
import { RemoveFromCart, UpdateQty, ClearCart } from "../cart/CartSlice";
import { motion } from "framer-motion";
import { useState } from "react";

function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <motion.div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      initial={{ opacity: 0, y: 60 }}   // start invisible and pushed down
      animate={{ opacity: 1, y: 0 }}    // animate to visible and centered
      transition={{ duration: 1.5,}} // smoothness
    >
      <div className="container mt-4">
        <h2>My Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul className="list-group">
            {cartItems.map((item) => (
              <motion.li
                key={item.id}
                className="list-group-item"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{item.name}</h5>
                    <p>Price: ${item.price}</p>
                    <div className="input-group">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          dispatch(UpdateQty({ id: item.id, qty: item.qty - 1 }))
                        }
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="form-control"
                        value={item.qty}
                        readOnly
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          dispatch(UpdateQty({ id: item.id, qty: item.qty + 1 }))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(RemoveFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        )}

        {cartItems.length > 0 && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              className="btn btn-danger"
              onClick={() => dispatch(ClearCart())}
            >
              Clear Cart
            </button>
            <button
              className="btn btn-secondary ms-4 "
              onClick={() => dispatch(ClearCart())}
            >
              Buy All  
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default CartPage;
