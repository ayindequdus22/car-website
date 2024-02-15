import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  cartProducts,
  decreaseItemQty,
  selectTotalAmount,
  setGetTotals,
  increaseItemQty,
  removeItem,
  upDateItemQty,
  setClearCartItems,
  selectTotalQTY,
} from "../../store/cartSlice";
import "./cart.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [increasedQty,setIncreasedQty] = useState('')
  const dispatch = useDispatch();
  const cartItems = useSelector(cartProducts);
  const totalAmount = useSelector(selectTotalAmount);
  const totalQTY = useSelector(selectTotalQTY);
  // console.log(cartItems.length);
  useEffect(() => {
    dispatch(setGetTotals());
  }, [cartItems, dispatch]);
  return (
    <>
      {cartItems.length === 0 ? (
        "p"
      ) : (
        <>
          <div className="cartContainer">
            <div className="necessities">
              <p>
                <Link to={"/"}>Home</Link>{" "}
                <div className="fa fa-chevron-right"></div>{" "}
                <Link to={"/cart"}>Shopping Cart</Link>
              </p>
              <div className="cartHeader df-jsb-ac">
                <Link to={"/"} className="">
                  <div className="fa fa-arrow-left"></div>
                  <span style={{paddingLeft:"1rem"}}>Continue Shopping</span>
                </Link>
                <div className="clearBtn">
                  <button onClick={() =>dispatch(setClearCartItems())}>
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="cartCont">
              <div className="cartItemContainer">
                {cartItems.map((cartItem) => {
                  let newPrice = (
                    cartItem.price * cartItem.cartQuantity
                  ).toFixed(2);
               
                  return (
                    <>
                      <div className="cartItem" key={cartItem.id}>
                        <div className="image">
                          <img src={cartItem.image} alt="" />
                        </div>
                        <div style={{ padding: "" }}>
                          <p style={{ fontSize: "2rem" }}>{cartItem.name}</p>
                        </div>
                        <div className="changes">
                          <button
                            onClick={() => {
                              dispatch(decreaseItemQty(cartItem));
                              toast("Wow so easy!");
                            }}
                          >
                            -
                          </button>
                          <input
                            onChange={(event) => {setIncreasedQty(event.target.value)}}
                            type="text"
                            onSubmit={() => {
                              dispatch(upDateItemQty({ cartItem }));
                            }} disabled
                            value={cartItem.cartQuantity}
                          />
                          <button
                            onClick={() => dispatch(increaseItemQty(cartItem))}
                          >
                            +
                          </button>
                        </div>
                        <div className="details">
                          <p>{newPrice}</p>
                          <p>
                            {cartItem.price.toFixed(2)} x{" "}
                            {cartItem.cartQuantity} items
                          </p>
                        </div>
                        <div className="remove">
                          <button
                            onClick={() => dispatch(removeItem(cartItem))}
                          >
                            Remove Item
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>

              <div className="checkOut">
                <div className="orderHeader df-jsb-ac">
                  <p>Order Summary </p>
                  <p>{totalQTY} items</p>
                </div>
                <div className="df-jsb-ac subtotal">
                  <p>Subtotal</p>
                  <p>{totalAmount}</p>
                </div>
                <div className="df-jsb-ac subtotal">
                  <p>Discount</p>
                  <p>10%</p>
                </div>
                <div className="df-jsb-ac subtotal">
                  <p>Total</p>
                  <p>{(totalAmount - totalAmount / 10).toFixed(2)}</p>
                </div>
                <div className="deliveryCharges">
                  <p>Excluding delivery charge</p>
                </div>

                <div className="dfAc checkOutBtnContainer">
                  <button className="btn">Continue to Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
