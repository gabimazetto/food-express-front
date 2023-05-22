import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Toaster } from "react-hot-toast";
import { Footer } from "../../components/Footer/Footer";


export function Root() {
    
    return (
        <>
            <Header />
            <main>
                <Outlet/>
            </main>
            <Toaster/>
            <Footer/>
        </>
    )
} 