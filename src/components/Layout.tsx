import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "./Header";
import Banner from "./Banner";

export const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Banner/>
                <Outlet />
            </main>
        </>
    )
}
