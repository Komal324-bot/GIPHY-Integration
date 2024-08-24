import "@/styles/globals.css";
import { AuthUserProvider } from "@/Firebase/auth";
import Head from "next/head";
export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>GIF Integration</title>
            </Head>
            <AuthUserProvider>
            <Component {...pageProps} />
            </AuthUserProvider>
            
        </>
    );
}
