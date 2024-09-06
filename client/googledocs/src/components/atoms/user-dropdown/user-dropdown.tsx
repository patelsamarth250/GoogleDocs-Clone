import { useContext, useRef, useState, useEffect } from "react";
import { ToastContext } from "../../../contexts/toast-context";
import useAuth from "../../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import useRandomBackground from "../../../hooks/use-random-background";
import { CSSTransition } from "react-transition-group";
import "./UserDropDown.css"; // Make sure to import the CSS file

const UserDropDown = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { backgroundColor } = useRandomBackground();
  const dropdownRef = useRef(null);
  const { success } = useContext(ToastContext);
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutUser = async () => {
    // console.log("clicked")
    await logout();
    success("Successfully logged out!");
    navigate("/login");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropDown(!showDropDown)}
        className={`${backgroundColor} w-8 h-8 text-white font-semibold flex justify-center items-center rounded-full ring-2 flex-shrink-0 uppercase`}
      >
        {email !== null && email[0]}
      </button>
      <CSSTransition
        nodeRef={dropdownRef}
        in={showDropDown}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <div
          ref={dropdownRef}
          className="absolute top-full mt-1 right-0 z-10 w-24 bg-white py-2 rounded-sm shadow-lg border"
        >
          <button
            onClick={logoutUser}
            className="w-full text-black hover:bg-gray-100 text-sm text-center"
          >
            Logout
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};

export default UserDropDown;
