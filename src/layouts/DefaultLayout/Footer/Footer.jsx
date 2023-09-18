import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logo } from "../../../assets";
import {
  faFacebook,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className=" p-20 bg-slate-900 text-white">
      <nav className="flex px-6 justify-evenly ">
        <div className=" mr-20 flex flex-col justify-center">
          <img className="w-[160px] h-[160px] " src={logo} alt="" />
          <div>
            <FontAwesomeIcon
              onClick={() => {
                window.open("https://www.instagram.com/cog14t4/", "_blank");
              }}
              className="text-3xl p-2 m-1 cursor-pointer hover:translate-y-[-2px] hover:scale-105 hover:text-sky-100"
              icon={faInstagram}
            />
            <FontAwesomeIcon
              onClick={() => {
                window.open("https://www.facebook.com/cong14t4", "_blank");
              }}
              className="text-3xl p-2 m-1 cursor-pointer hover:translate-y-[-2px] hover:scale-105 hover:text-sky-100"
              icon={faFacebook}
            />
            <FontAwesomeIcon
              onClick={() => {
                window.open("https://github.com/ntcong1404", "_blank");
              }}
              className="text-3xl p-2 m-1 cursor-pointer hover:translate-y-[-2px] hover:scale-105 hover:text-sky-100"
              icon={faGithub}
            />
          </div>
        </div>

        <div className="">
          <p className="text-2xl font-bold">The Basics</p>
          <ul className="mt-6">
            <li className="p-1">
              <a className="hover:text-blue-400 " href="#">
                Introducing TMDB
              </a>
            </li>
            <li className="p-1">
              <a className="hover:text-blue-300 " href="#">
                Contact Us
              </a>
            </li>
            <li className="p-1">
              <a className="hover:text-blue-400 " href="#">
                Support Forums
              </a>
            </li>
            <li className="p-1">
              <a className="hover:text-blue-400 " href="#">
                API
              </a>
            </li>
            <li className="p-1">
              <a className="hover:text-blue-400 " href="#">
                System Status
              </a>
            </li>
          </ul>
        </div>
        <div className="">
          <p className="text-2xl font-bold">Get Involved</p>
          <ul className="mt-6">
            <li className="p-1">
              <a className="hover:text-blue-400 " href="#">
                Contribution Bible
              </a>
            </li>
            <li className="p-1">
              <a className="hover:text-blue-400 " href="#">
                Add New Movie
              </a>
            </li>
            <li className="p-1">
              <a className="hover:text-blue-400 " href="#">
                Add New TV Show
              </a>
            </li>
          </ul>
        </div>
        <div className="">
          <h className="text-2xl font-bold">Community</h>
          <ul className="mt-6">
            <li className="p-1">
              <a className="hover:text-blue-400 " href="#">
                Guidelines
              </a>
            </li>
            <li className="p-1">
              <a className="hover:text-blue-400 " href="#">
                Discussions
              </a>
            </li>
            <li className="p-1">
              <a className="hover:text-blue-400 " href="#">
                Leaderboard
              </a>
            </li>
            <li className="p-1">
              <a className="hover:text-blue-400 " href="#">
                Twitter
              </a>
            </li>
          </ul>
        </div>
        <div className="">
          <p className="text-2xl font-bold">Legal</p>
          <ul className="mt-6">
            <li className="p-1">
              <a className="hover:text-blue-400 " href="#">
                Terms of Use
              </a>
            </li>
            <li className="p-1">
              <a className="hover:text-blue-400 " href="#">
                API Terms of Use
              </a>
            </li>
            <li className="p-1">
              <a className="hover:text-blue-400 " href="#">
                Privacy Policy
              </a>
            </li>
            <li className="p-1">
              <a className="hover:text-blue-400 " href="#">
                DMCA Takedown Request
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
}
export default Footer;
