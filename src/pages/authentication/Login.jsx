import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (username !== "admin") {
      setError("Username is wrong");
      return;
    }

    if (password !== "admin123") {
      setError("Password is wrong");
      return;
    }

    // ✅ success
    setError("");
    localStorage.setItem("isLoggedIn", "true"); // optional
    navigate("/dashboard");
  };

  const goToForgotPassword = () => {
    navigate("/forget-password"); // ✅ redirect to login
  };






  return (
    <main className="flex h-screen w-full items-center justify-center">

      {/* Header */}








      {/* Card */}
      <div className="block-form space-y-5 w-3/12">

        <div className="mb-6">
          <h2 className="text-xl font-bold">Secure Sign In</h2>
          <p className="text-sm text-gray-500">
            Enter your credentials to access the terminal.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>

          {/* Username */}
          <div>
            <label className="text-xs font-bold uppercase text-on-surface-variant">
              Username
            </label>






            <div className="relative mt-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                person
              </span>

              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-3 block-input  bg-surface-container-low focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-1">
            <div className="flex justify-between">
              <label className="text-xs font-bold uppercase text-on-surface-variant">
                Password
              </label>
              <p className="text-xs font-bold uppercase cursor-pointer" onClick={goToForgotPassword}>Forgot password</p>
            </div>

            <div className="relative mt-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                lock
              </span>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-3 block-input  bg-surface-container-low focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* ❌ Error Message */}
          {error && (
            <p className="text-red-500 text-sm mb-0">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="btn-primary-packages w-full justify-center mt-5"
          >
            Initialize Session
          </button>

        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Need help? <span className="text-blue-500">Contact Support</span>
        </div>
      </div>

    </main>
  );
}