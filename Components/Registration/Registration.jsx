"use client";
import { FaGoogle } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const Registration = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="flex w-full max-w-5xl bg-[#1e1e1e] rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
        {/* Left Side - Abstract Illustration */}
        <div className="hidden lg:flex w-1/3 bg-black relative p-12 overflow-hidden border-r border-gray-800">
          <div className="absolute inset-0 opacity-20">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 800"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 800 Q 100 400 400 200 T 800 0"
                stroke="white"
                fill="transparent"
                strokeWidth="0.5"
              />
              <path
                d="M0 750 Q 150 350 450 150 T 850 -50"
                stroke="white"
                fill="transparent"
                strokeWidth="0.5"
              />
              <path
                d="M0 700 Q 200 300 500 100 T 900 -100"
                stroke="white"
                fill="transparent"
                strokeWidth="0.5"
              />
            </svg>
          </div>
          <span className="text-blue-500 text-sm font-semibold relative z-10">
            Sign up
          </span>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-2/3 bg-[#1e1e1e] p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-white text-3xl font-bold mb-2">
              Set up your account
            </h1>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry.
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="VJ"
                  className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition"
                />
                <input
                  type="text"
                  placeholder="Rathod"
                  className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <input
                type="image"
                placeholder="Image Url"
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition"
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition"
              />

              <div className="flex items-center space-x-2 py-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-0 w-4 h-4"
                />
                <label htmlFor="terms" className="text-gray-400 text-sm">
                  Confirm Password
                </label>
              </div>

              <button className="w-full bg-[#4f81c7] hover:bg-[#3d6eb3] text-white font-medium py-3 rounded-md transition duration-300">
                Continue
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-4 bg-[#1e1e1e] text-gray-500 tracking-wider">
                  Or
                </span>
              </div>
            </div>

            {/* Google Login Option */}
            <button className="w-full bg-white hover:bg-gray-100 text-black font-bold py-3 rounded-md transition duration-300 flex items-center justify-center space-x-3 shadow-md">
              <FaGoogle className="text-xl text-[#ea4335]" />
              <span>Continue with Gmail</span>
            </button>

            <div className="mt-8 text-center border-t border-gray-800 pt-6">
              <p className="text-gray-400 text-sm">
                Already have an account?
                <a
                  href="#"
                  className="text-blue-500 font-medium hover:underline ml-1 inline-flex items-center"
                >
                  Sign in <HiArrowRight className="ml-1" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
