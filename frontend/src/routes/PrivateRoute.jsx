import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login", { state: { from: location } });
  };
  if (!user) {
    return (
      <div>
        <progress className="progress w-full"></progress>
        <div className="flex justify-center">
          <button className="btn btn-success text-CardColor" onClick={handleLogin}>
            Please login to continue
          </button>
        </div>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
