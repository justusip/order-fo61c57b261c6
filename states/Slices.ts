import {createSlice} from "@reduxjs/toolkit";
import {CatalogItem} from "../types/CatalogItem";

const makeSlice = <T>(name: string, initialVal: T) =>
    createSlice({
        name,
        initialState: {
            value: initialVal,
        },
        reducers: {
            set: (state, action) => {
                state.value = action.payload;
            },
        },
    });

const curPage = makeSlice<number>("curPage", 0);
export const setCurPage = curPage.actions.set;

const catalog = makeSlice<CatalogItem[]>("catalog", [
    {
        name: "Sushi",
        price: 5.99,
        img: "/img/1.jpg"
    },
    {
        name: "Rendang",
        price: 9.99,
        img: "/img/2.jpg"
    },
    {
        name: "Ramen",
        price: 8.99,
        img: "/img/3.jpg"
    },
    {
        name: "Tom Yam Goong",
        price: 4.99,
        img: "/img/4.jpg"
    },
    {
        name: "Kebab",
        price: 5.99,
        img: "/img/5.jpg"
    },
    {
        name: "Peking Duck",
        price: 8.99,
        img: "/img/6.jpg"
    },
    {
        name: "Steak and Kidney Pie",
        price: 12.99,
        img: "/img/7.jpg"
    },
    {
        name: "Apfelstrudel",
        price: 8.99,
        img: "/img/8.jpg"
    },
    {
        name: "Pizza",
        price: 4.99,
        img: "/img/9.jpg"
    }
]);
export const setScale = catalog.actions.set;

const cart = makeSlice<[]>("cart", []);
export const setCart = cart.actions.set;

export default {
    curPage: curPage.reducer,
    catalog: catalog.reducer,
    cart: cart.reducer
};


