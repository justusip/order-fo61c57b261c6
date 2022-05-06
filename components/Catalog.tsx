import {useDispatch, useSelector} from "react-redux";
import {setCart, setCurPage} from "../states/Slices";
import {CatalogItem} from "../types/CatalogItem";
import CartItem from "../types/CartItem";
import update from 'immutability-helper';
import classNames from "classnames";

const Catalog = () => {
    const catalog: CatalogItem[] = useSelector((state: any) => state.catalog.value);
    const cart: CartItem[] = useSelector((state: any) => state.cart.value);
    const dispatch = useDispatch();

    const addItem = (name: string) => {
        dispatch(setCart(update(cart, {$push: [{name, quantity: 1}]})));
    };

    return <>
        <div className={"header"}>
            PRODUCT LIST
            <button className={"generic-btn rect-btn"}
                    onClick={() => {
                        dispatch(setCurPage(1));
                        console.log("[CART] clicked.");
                    }}>
                CART
                <div className={"badge"}><span>{cart.length}</span></div>
            </button>
        </div>
        <div className={"grid"}>
            {
                catalog.map((item, i) =>
                    <button key={i}
                            className={"item generic-btn"}
                            onClick={() => {
                                addItem(item.name);
                                console.log("[ADD ITEM] clicked.");
                            }}
                            disabled={cart.find(o => item.name === o.name) != null}>
                        <div className={"item-thumbnail"} style={{backgroundImage: `url(${item.img})`}}/>
                        <div className={"item-title"}>{item.name}</div>
                        <div className={"item-price"}>{item.price.toFixed(2)}€</div>
                    </button>)
            }
        </div>
    </>;
};
export default Catalog;
