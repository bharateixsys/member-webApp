
// pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import '../styles/globals.css'
import '@progress/kendo-theme-bootstrap/dist/all.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ToastProvider from "../services/ToastProvider";
const publicRoutes = ["/login", "/register","/forgotpassword"]; // routes that don’t need auth

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token && !publicRoutes.includes(router.pathname)) {
            router.replace("/login");
        }
    }, [router]);

    //return <Component {...pageProps} />;
    return (
        <>
            <ToastProvider />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;

