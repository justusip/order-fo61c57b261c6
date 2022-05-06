import type {NextPage} from 'next';
import React from "react";
import Catalog from "../components/Catalog";
import Cart from "../components/Cart";
import {useSelector} from "react-redux";

const Home: NextPage = () => {
    const curPage: number = useSelector((state: any) => state.curPage.value);
    switch (curPage) {
        case 0:
            return <div className={"root"}>
                <div className={"wrapper"}>
                    <Catalog/>
                </div>
            </div>;
        case 1:
            return <div className={"root"}>
                <div className={"wrapper"}>
                    <Cart/>
                </div>
            </div>;
        default:
            return <div></div>;
    }
};

export default Home;
