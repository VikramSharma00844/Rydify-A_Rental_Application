import axios from "axios";
import {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import DealerNavbar from "../components/DealerNavbar.jsx";
import Footer from "../components/Footer.jsx";
import {ToastContainer} from "react-toastify";
import {getCookie, server_url} from "../utils/script.jsx";

function DealerLayout() {
    const [renderComponent, setRenderComponent] = useState(false);

    const navigate = useNavigate();

    async function verifyToken(token) {
        const url = `${server_url}/dealer/verify-token`;
        let response = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // console.log(response.data);
        let {error} = response.data

        if(error) {
            setRenderComponent(false);
            navigate('/dealer-login');
        } else {
            setRenderComponent(true);
        }
    }

    useEffect(() => {
        const token = getCookie('dealerToken');
        // console.log(token)

        if (!token) {
            navigate('/dealer-login');
        } else {
            verifyToken(token)
        }
    }, [navigate]);

    return (
        <>
            {renderComponent &&
                <>
                    <DealerNavbar/>
                    <Outlet/>
                    <Footer/>
                </>
            }

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

export default DealerLayout;