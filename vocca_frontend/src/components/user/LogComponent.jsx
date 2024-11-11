import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as Tooltip from "@radix-ui/react-tooltip";
import { logout } from "../../redux/userSlice";

const LogComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    dispatch(logout());
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={user ? handleLogout : handleLogin}
            className="flex items-center space-x-2 px-2 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            {/* UserCircle icon is hidden on small devices */}
            <UserCircle className="hidden sm:block h-5 w-5" />
            <span className="text-sm sm:text-base md:text-lg">
              {user ? "Log out" : "Log in"}
            </span>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg"
            sideOffset={5}
          >
            {user ? `${user.name}` : "Please login"}
            <Tooltip.Arrow className="fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default LogComponent;
