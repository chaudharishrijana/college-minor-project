import React, {useEffect, useState} from 'react';
import {IoPricetags} from 'react-icons/io5';
import {LiaPaintBrushSolid} from 'react-icons/lia';
import {FaRegUser} from 'react-icons/fa';
import {AiOutlineClose} from 'react-icons/ai';
import CartCard from './CartCard';
import {toast} from "react-toastify";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [grossTotal, setGrossTotal] = useState(0);
    const [netTotal, setNetTotal] = useState(0);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    useEffect(() => {
        document.title = 'Cart';
        // Calculate gross total
        const total = cartItems.reduce((acc, item) => acc + item.price, 0);
        setGrossTotal(total);

        // Calculate net total
        setNetTotal(total);
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const removeFromCart = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    async function handleCheckout() {
        try {
            const res = await fetch('http://localhost:3000/orders/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!res.ok) {
                throw new Error('Failed to add order');
            }

            const orderData = await res.json();

            if (orderData?.id > 1) {
                await Promise.all(cartItems.map(async (item) => {
                    const itemRes = await fetch('http://localhost:3000/orderItems/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            order_id: orderData.id,
                            artwork_id: item.id,
                        })
                    });

                    if (!itemRes.ok) {
                        throw new Error('Failed to add order item');
                    }

                    return itemRes.json();
                }));
            }

            toast(`Order Placed Successfully.`);
            localStorage.removeItem('cartItems');
            window.location.href = '/me';
        } catch (error) {
            console.error('Error handling checkout:', error.message);
            // Handle error silently or display an error message to the user
        }
    }

    return (
        <div className={`min-h-[750px]`}>
            {!cartItems.length > 0 && <div className={`h-[700px] text-2xl flex justify-center items-center`}>
                Cart Empty.
            </div>}
            {cartItems.length > 0 && <>
                <p className="text-2xl font-semibold py-3">Cart</p>
                <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-4">
                        {cartItems.map((item, index) => (
                            <CartCard item={item} key={index} removeFromCart={removeFromCart}/>
                        ))}
                    </div>
                    <div className="text-right flex flex-col max-h-[750px]">
                        <p>
                            Gross Total: <span className="font-semibold">Rs.{grossTotal}</span>
                        </p>
                        <p className="mt-auto text-xl font-semibold">Net total: Rs.{netTotal}</p>
                        <button
                            onClick={handleCheckout}
                            className={`border-2 border-rose-500 mt-12 py-1.5 rounded-2xl font-bold text-rose-500 hover:bg-rose-100 transition`}>Checkout
                        </button>
                    </div>
                </div>
            </>}
        </div>
    );
}

export default Cart;
