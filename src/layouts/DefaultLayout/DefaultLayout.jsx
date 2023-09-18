import { useRef } from "react";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { onToTop } from "../../assets";

function DefaultLayout({ route, children }) {
  const scrollToRef = useRef();

  const handleOnScroll = () => {
    scrollToRef.current.scrollIntoView();
  };
  return (
    <div ref={scrollToRef}>
      <Header />
      <div className="pt-[76px]">
        {children}
        {route.layout !== "notFooter" ? (
          <button
            onClick={handleOnScroll}
            className="fixed bottom-8 right-8 z-10 rounded-full bg-gradient-to-t from-green-300 to-sky-300 w-6 h-12 flex justify-center items-center hover:scale-125"
          >
            {/* <FontAwesomeIcon
              className="animate-bounce text-sm"
              icon={faArrowUp}
            /> */}
            <img src={onToTop} alt="" />
          </button>
        ) : (
          <></>
        )}
      </div>
      {route.layout !== "notFooter" ? <Footer /> : <></>}
    </div>
  );
}
export default DefaultLayout;
