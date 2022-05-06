import {useDispatch, useSelector} from "react-redux";
import Quantity from "./Quantity";
import {setCart, setCurPage} from "../states/Slices";
import {useMemo} from "react";
import CartItem from "../types/CartItem";
import {CatalogItem} from "../types/CatalogItem";
import update from "immutability-helper";

const Cart = () => {
    const catalog: CatalogItem[] = useSelector((state: any) => state.catalog.value);
    const cart: CartItem[] = useSelector((state: any) => state.cart.value);
    const dispatch = useDispatch();

    const aggregatedCart = useMemo<(CartItem & CatalogItem)[]>(() => cart.map(c => ({
        ...c,
        ...catalog.find(o => o.name === c.name)!!
    })), [cart, catalog]);

    const total = aggregatedCart.reduce((prev, o) => prev + o.price, 0);

    return <>
        <div className={"header"}>
            <div className={"generic-btn back-btn"}
                 onClick={() => {
                     dispatch(setCurPage(0));
                     console.log("[BACK] clicked.");
                 }}>
                ←
            </div>
            MY CART
            <button className={"generic-btn rect-btn"}
                    onClick={() => {
                        dispatch(setCart([]));
                        console.log("[RESET] clicked.");
                    }}>
                RESET
            </button>
        </div>
        <div className={"panel"}>
            <div className={"table-header"}>Products added to your cart</div>
            <div className={"table"}>
                <div className={"table-row table-header"}>
                    <div></div>
                    <div>Product Info</div>
                    <div>Quantity</div>
                    <div>Price</div>
                </div>
                {
                    aggregatedCart.length == 0 &&
                    <div className={"table-row"}>
                        <div></div>
                        <div>Your cart is empty.</div>
                        <div></div>
                        <div></div>
                    </div>
                }
                {
                    aggregatedCart.map((item, i) =>
                        <div className={"table-row"} key={i}>
                            <button className={"generic-btn remove-btn"}
                                    onClick={() => {
                                        dispatch(setCart(
                                            update(cart, {$splice: [[i, 1]]})
                                        ));
                                        console.log("[DELETE ITEM] clicked.");
                                    }}
                            >⛔️
                            </button>
                            <div>
                                <img className={"table-thumbnail"} src={item.img}/>
                                <div className={"table-title"}>{item.name}</div>
                            </div>
                            <div>
                                <Quantity value={item.quantity}
                                          setValue={(value: number) => {
                                              dispatch(setCart(
                                                  update(cart, {[i]: {quantity: {$set: value}}})
                                              ));
                                              console.log("[QUANTITY CHANGE] clicked.");
                                          }}/>
                            </div>
                            <div>{item.price.toFixed(2)}€</div>
                        </div>)
                }
                <div className={"table-row table-footer"}>
                    <div></div>
                    <div></div>
                    <div>
                        <div style={{color: "#888", marginRight: "8px"}}>Subtotal</div>
                        {cart.length} Items
                    </div>
                    <div>{total.toFixed(2)}€</div>
                </div>
            </div>
        </div>
        <div className={"footer"}>
            <button className={"generic-btn rect-btn rect-btn-positive btn-positive"}
                    onClick={() => console.log("[PAY NOW] clicked.")}
                    disabled={cart.length === 0}>
                PAY NOW
            </button>
        </div>
    </>;
};
export default Cart;
