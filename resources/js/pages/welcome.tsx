import { Link } from '@inertiajs/react';
import homeImg from './home.png';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                
                {/* Left Content */}
                <div className="space-y-6">
                    <h1 className="text-5xl font-bold text-red-600">
                        Task Manager
                    </h1>
                    <p className="text-lg text-gray-300">
                        Organize. Prioritize. Achieve.
                    </p>
                    <p className="text-sm text-gray-400">
                        A powerful and intuitive task management tool to help you track your daily tasks,
                        collaborate with your team, and boost productivity. Get started now to experience
                        a clutter-free way to manage work.
                    </p>

                    <div className="flex space-x-4">
                        <Link
                            href="/login"
                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition"
                        >
                            Log In
                        </Link>
                        <Link
                            href="/register"
                            className="border border-red-600 hover:bg-red-600 hover:text-white text-red-400 px-5 py-2 rounded-md transition"
                        >
                            Register
                        </Link>
                    </div>
                </div>

                {/* Right Visual */}
                <div className="flex justify-center">
                    <img
                       src={homeImg}

                        alt="Task Illustration"
                        className="max-w-full h-auto rounded-xl shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
}
