import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // 👉 you can add API call here later
        alert("Recovery link sent to: " + email);
    };

    const goToLogin = () => {
        navigate("/login"); // ✅ redirect to login
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-container-lowest p-6">
            <div className="w-full max-w-md block-form space-y-5">

                {/* Brand */}


                {/* Heading */}
                <div className="space-y-2 mb-10">
                    <h2 className="text-2xl font-extrabold">
                        Forgot Password?
                    </h2>
                    <p className="text-sm text-gray-500">
                        Enter your admin email to receive a recovery link.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-bold uppercase mb-2 text-gray-500">
                            Admin Email Address
                        </label>

              


                        <div className="relative mt-1">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                mail
                            </span>

                            <input
                                name="username"
                                 value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@globalconcierge.com"
                                className="w-full pl-10 pr-4 py-3 block-input  bg-surface-container-low focus:ring-2 focus:ring-blue-200"
                            />
                        </div>




                    </div>

                    {/* Actions */}
                    <div className="space-y-4">

                        <button
                            type="submit"
                            className="btn-primary-packages w-full justify-center hover:scale-[1.02] transition cursor-pointer"
                        >
                            Send Recovery Link →
                        </button>

                        <button
                            type="button"
                            onClick={goToLogin}
                            className="login-blank-btn cursor-pointer"
                        >
                            <span className="material-symbols-outlined">
                                keyboard_backspace
                            </span>
                            Back to Login
                        </button>

                    </div>
                </form>

                {/* Footer */}
                {/* <div className="mt-12 pt-6 border-t text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined">lock</span>
                        <div>
                            <div className="font-bold uppercase">
                                Security Protocol
                            </div>
                            <div>256-bit encrypted authentication</div>
                        </div>
                    </div>
                </div> */}

            </div>
        </div>
    );
}