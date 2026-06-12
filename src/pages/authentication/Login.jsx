import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/axiosInstance'; // Import your custom instance
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user types
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Send request to your login endpoint
      const response = await api.post('/admin/login', {
        username: formData.username,
        password: formData.password
      });

      // console.log("admin credentials:", response);

      // 2. Extract token (adjust based on your API structure)
      const { token } = response.data;

      // 3. Store the token for the Axios interceptor to use
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");

      // 4. Redirect
      navigate("/dashboard");
    } catch (err) {
      // Handle errors (Interceptors handle global 401s, but we handle local UI feedback here)
      const message = err.response?.data?.message || "Authentication failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const goToForgotPassword = () => {
    navigate("/forget-password");
  };

  return (
    <main className="flex h-screen w-full items-center justify-center bg-surface-container-lowest">
      <div className="block-form space-y-5 w-full max-w-md p-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Secure Sign In</h2>
          <p className="text-sm text-gray-500">
            Enter your credentials to access the terminal.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Username */}
          <div>
            <label className="text-xs font-bold uppercase text-gray-600">Username</label>
            <div className="relative mt-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">person</span>
              <input
                // required
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-3 block-input bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between">
              <label className="text-xs font-bold uppercase text-gray-600">
                Password
              </label>

              {/* <p
                className="text-xs font-bold uppercase text-blue-600 cursor-pointer hover:underline"
                onClick={goToForgotPassword}
              >
                Forgot password
              </p> */}
            </div>

            <div className="relative mt-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                lock
              </span>

              <input
                // required
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full pl-10 pr-12 py-3 block-input bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`btn-primary-packages w-full py-3 flex justify-center items-center font-bold cursor-pointer text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </span>
            ) : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500 cursor-pointer">
          <a href="https://mahakumbhtourstravelsnashik.com/sa" target="_blank">www.mahakumbhtourstravelsnashik.com</a>
        </div>
      </div>
    </main>
  );
}