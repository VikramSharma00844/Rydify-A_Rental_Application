import {Outlet,useLocation} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import PublicNavbar from "../components/PublicNavbar.jsx";
import Footer from "../components/Footer.jsx";
import ScriptLoader from "../utils/ScriptLoader.jsx"

function PublicLayout() {
    const location = useLocation();
    return (
        <>
            {/*<ScriptLoader/>*/}
            <ScriptLoader key={location.pathname}/>

            <PublicNavbar/>
            <Outlet/>
            <Footer/>

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}

export default PublicLayout;