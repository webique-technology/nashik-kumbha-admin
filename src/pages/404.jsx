import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 overflow-hidden relative">

            {/* Background Blobs */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="relative z-10 max-w-2xl mx-auto px-6">

                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 text-center shadow-2xl">

                    {/* 404 Text */}
                    <h1 className="text-8xl md:text-9xl font-black text-white tracking-wider">
                        404
                    </h1>

                    {/* Divider */}
                    <div className="w-24 h-1 bg-blue-400 mx-auto my-6 rounded-full"></div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Oops! Lost in the Journey
                    </h2>

                    <p className="text-gray-300 text-lg leading-relaxed max-w-lg mx-auto">
                        The page you're trying to reach doesn't exist,
                        has been moved, or the URL might be incorrect.
                    </p>

                    {/* Illustration */}
                    <div className="my-10">
                        <div className="text-8xl animate-bounce">
                            🤖
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">

                        <Link
                            to="/dashboard"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105"
                        >
                            <FaArrowLeft />
                            Back to Dashboard
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="px-6 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 transition-all duration-300"
                        >
                            Go Back
                        </button>

                    </div>

                </div>

                {/* Footer Text */}
                <p className="text-center text-gray-400 mt-6 text-sm">
                    Mahakumbh Tours & Travels Admin Panel
                </p>

            </div>

        </div>
    );
}