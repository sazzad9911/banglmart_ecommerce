import { useState } from "react";
import { motion } from "framer-motion";
import { postApi } from "../../apis";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    Swal.fire({
      title: "Please Check Your Email",
      text: formData.email,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reset Password",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        postApi(
          "/auth/resetEmail",
          {
            email: formData.email,
          },
          null
        )
          .then((r) => {
            setIsLoading(false);

            Swal.fire({
              title: r.data.message,
              text: "Please Check Your Email and Rest Your Password",
              icon: "success",
              // showCancelButton: true,
              confirmButtonColor: "#3085d6",
              // cancelButtonColor: '#d33',
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/");
              }
            });
          })
          .catch((error) => {
            setIsLoading(false);
            setErrorMessage(error?.response?.data?.message);
          });
      }
    });
  };
  return (
    <div className="w-full max-w-md p-6 bg-BackgroundColor rounded-md shadow-lg m-4 ld:m-0 mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
      {errorMessage && (
        <div
          className="bg-[#fdd5d5] border-l-4 border-[#ff8383] text-[#ff2b2b] p-4 mb-4"
          role="alert"
        >
          <p>{errorMessage}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label className="block font-medium mb-2 text-TextColor">Email</label>
        <input
          type="email"
          name="email"
          className="input input-bordered w-full pr-10 mb-4"
          placeholder="Enter your Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          type="submit"
          className="bg-MainColor mt-4 text-CardColor shadow-lg shadow-MainColorHover rounded-md p-2 w-full hover:bg-MainColorHover"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-bars loading-xs "></span>
          ) : (
            "Enter"
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default ForgotPassword;
