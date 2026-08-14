import React from 'react';
import './CartItem.css';

import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {

    const dispatch = useDispatch();

    // Lấy danh sách sản phẩm từ Redux
    const cartItems = useSelector(
        (state) => state.cart.items
    );

    // Tính tổng tiền của toàn bộ giỏ hàng
    const totalAmount = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    // Tăng số lượng
    const handleIncrease = (item) => {

        dispatch(
            updateQuantity({
                id: item.id,
                quantity: item.quantity + 1
            })
        );

    };

    // Giảm số lượng
    const handleDecrease = (item) => {

        if (item.quantity > 1) {

            dispatch(
                updateQuantity({
                    id: item.id,
                    quantity: item.quantity - 1
                })
            );

        } else {

            // Nếu quantity = 1 thì xóa sản phẩm
            dispatch(removeItem(item.id));

        }

    };

    // Xóa sản phẩm
    const handleRemove = (item) => {

        dispatch(removeItem(item.id));

    };

    // Checkout
    const handleCheckout = () => {

        alert('Coming Soon');

    };

    return (
        <div className="cart-page">

            {/* ================= NAVBAR ================= */}

            <div className="cart-navbar">

                <h2>
                    Paradise Nursery
                </h2>

                <div>

                    <button
                        onClick={onContinueShopping}
                        className="continue-shopping-nav"
                    >
                        Plants
                    </button>

                </div>

            </div>


            {/* ================= CART TITLE ================= */}

            <div className="cart-container">

                <h1>
                    Shopping Cart
                </h1>


                {/* ================= EMPTY CART ================= */}

                {cartItems.length === 0 ? (

                    <div className="empty-cart">

                        <h2>
                            Your cart is empty
                        </h2>

                        <button
                            onClick={onContinueShopping}
                            className="continue-shopping-button"
                        >
                            Continue Shopping
                        </button>

                    </div>

                ) : (

                    <>

                        {/* ================= CART ITEMS ================= */}

                        <div className="cart-items">

                            {cartItems.map((item) => (

                                <div
                                    className="cart-item"
                                    key={item.id}
                                >

                                    {/* Product image */}

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />


                                    {/* Product information */}

                                    <div className="cart-item-info">

                                        <h2>
                                            {item.name}
                                        </h2>

                                        <p>
                                            Unit Price: $
                                            {item.price.toFixed(2)}
                                        </p>


                                        {/* Quantity */}

                                        <div className="quantity-controls">

                                            <button
                                                onClick={() =>
                                                    handleDecrease(item)
                                                }
                                            >
                                                −
                                            </button>

                                            <span>
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    handleIncrease(item)
                                                }
                                            >
                                                +
                                            </button>

                                        </div>


                                        {/* Delete */}

                                        <button
                                            onClick={() =>
                                                handleRemove(item)
                                            }
                                            className="delete-button"
                                        >
                                            Delete
                                        </button>

                                    </div>


                                    {/* Total cost for this plant */}

                                    <div className="cart-item-total">

                                        <p>
                                            Total
                                        </p>

                                        <strong>
                                            $
                                            {(
                                                item.price *
                                                item.quantity
                                            ).toFixed(2)}
                                        </strong>

                                    </div>

                                </div>

                            ))}

                        </div>


                        {/* ================= CART SUMMARY ================= */}

                        <div className="cart-summary">

                            <h2>
                                Cart Summary
                            </h2>

                            <p>
                                Total Items:{' '}
                                {cartItems.reduce(
                                    (total, item) =>
                                        total + item.quantity,
                                    0
                                )}
                            </p>

                            <h2>
                                Total Amount: $
                                {totalAmount.toFixed(2)}
                            </h2>


                            {/* Checkout */}

                            <button
                                onClick={handleCheckout}
                                className="checkout-button"
                            >
                                Checkout
                            </button>


                            {/* Continue Shopping */}

                            <button
                                onClick={onContinueShopping}
                                className="continue-shopping-button"
                            >
                                Continue Shopping
                            </button>

                        </div>

                    </>

                )}

            </div>

        </div>
    );
}

export default CartItem;