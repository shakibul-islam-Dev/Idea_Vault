"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="flex flex-col md:flex-row w-full max-w-262.5 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden min-h-162.5">
        {/* Left: Form Section */}
        <div className="w-full md:w-[50%] p-10 lg:p-16 flex flex-col justify-center">
          <div className="max-w-95 mx-auto w-full">
            <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
              WELCOME BACK
            </h2>
            <p className="text-gray-400 font-medium mb-10">
              Welcome back! Please enter your details.
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-5 h-14 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em]">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••"
                  className="w-full px-5 h-14 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-gray-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between pb-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-md border-gray-300 text-red-500 focus:ring-red-500 cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm font-bold text-gray-800 hover:text-red-500 transition-colors"
                >
                  Forgot password
                </a>
              </div>

              <div className="space-y-4">
                <button className="w-full h-14 bg-[#EF4444] text-white font-bold rounded-2xl shadow-lg shadow-red-200 hover:shadow-red-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                  Sign in
                </button>

                <button className="w-full h-14 bg-white border-2 border-gray-100 text-gray-700 font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-200 active:scale-[0.98] transition-all duration-200">
                  <FcGoogle size={24} />
                  Sign in with Google
                </button>
              </div>
            </form>

            <div className="mt-12 text-center text-sm">
              <span className="text-gray-400 font-medium">
                Don&apos;t have an account?{" "}
              </span>
              <a
                href="#"
                className="text-[#EF4444] font-bold hover:underline ml-1"
              >
                Sign up for free!
              </a>
            </div>
          </div>
        </div>

        {/* Right: Visual Section */}
        <div className="hidden md:flex flex-1 bg-[#121212] relative overflow-hidden items-center justify-center p-12">
          {/* Decorative Glows */}
          <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-red-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-red-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>

          <div className="relative z-10 text-center flex flex-col items-center">
            <div className="w-16 h-1 bg-red-500 mb-8 rounded-full"></div>
            <h3 className="text-white text-3xl font-extrabold mb-4 tracking-tight">
              Master Your Ideas
            </h3>
            <p className="text-gray-400 max-w-70 leading-relaxed font-medium">
              Join thousands of creators who organize their thoughts and turn
              concepts into reality.
            </p>
          </div>

          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: `url("https://www.transparenttextures.com/patterns/carbon-fibre.png")`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
