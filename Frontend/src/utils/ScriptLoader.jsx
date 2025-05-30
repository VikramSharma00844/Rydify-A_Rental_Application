import { useEffect } from "react";

const ScriptLoader = () => {
    useEffect(() => {
        const scriptList = [

            "https://checkout.razorpay.com/v1/checkout.js",


            // "js2/jquery.js",
            // "js2/popper.min.js",
            // "js2/bootstrap.min.js",
            // "js2/jquery.fancybox.js",
            // "js2/owl.js",
            // "js2/wow.js",
            // "js2/appear.js",
            // "js2/mixitup.js",
            // "js2/script.js",
            // "js2/color-settings.js",


            // new
            "/js2/jquery-3.7.1.min.js",
            "/js2/popper.min.js",
            "/js2/bootstrap.min.js",
            "/js2/magnific-popup.min.js",
            "/js2/waypoints.min.js",
            "/js2/waypoints-sticky.min.js",
            "/js2/counterup.min.js",
            "/js2/isotope.pkgd.min.js",
            "/js2/imagesloaded.pkgd.min.js",
            "/js2/owl.carousel.min.js",
            "/js2/theia-sticky-sidebar.js",
            "/js2/lc_lightbox.lite.js",
            "/js2/swiper-bundle.min.js",
            "/js2/wow.min.js",
            "/js2/custom.js",
            "/js2/tickerNews.min.js",
            "/js2/moment.min.js",
            "/js2/bootstrap-datetimepicker.min.js",
            "/js2/jquery.mCustomScrollbar.concat.min.js"

        ];

        let index = 0;

        const loadNextScript = () => {
            if (index >= scriptList.length) return;

            const script = document.createElement("script");
            script.src = scriptList[index];
            script.async = false; // important to preserve order
            script.onload = () => {
                // console.log(`Loaded: ${scriptList[index]}`);
                index++;
                loadNextScript();
            };
            script.onerror = () => {
                // console.error(`Failed to load: ${scriptList[index]}`);
                index++;
                loadNextScript(); // continue even if one fails
            };

            document.body.appendChild(script);
        };

        loadNextScript();

        // Cleanup (optional): remove scripts on unmount
        return () => {
            const scripts = document.querySelectorAll("script");
            scriptList.forEach(src => {
                scripts.forEach(script => {
                    if (script.src.includes(src)) {
                        script.remove();
                    }
                });
            });
        };
    }, []);

    return null; // nothing to render
};

export default ScriptLoader;
