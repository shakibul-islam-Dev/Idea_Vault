"use client";

import { useState } from "react";
import { Button, Card, Form, Input } from "@heroui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "../../lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password");
        setIsLoading(false);
      } else {
        toast.success("Welcome back!");
        router.push(callbackUrl);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
      // Do not turn off loading state here; let the page transition naturally
    } catch (err) {
      toast.error("Google sign-in failed.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center p-4 bg-background text-foreground">
      <ToastContainer position="top-center" autoClose={3000} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 shadow-xl border border-default-100 flex flex-col gap-4">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold tracking-tight">Login</h2>
            <p className="text-small text-default-500 mt-1">
              Welcome back! Please enter your details.
            </p>
          </div>

          <Form
            className="flex flex-col gap-4"
            onSubmit={onSubmit}
            validationBehavior="native"
          >
            <div className="w-full flex flex-col gap-1">
              <label className="text-small font-medium text-default-700">
                Email
              </label>
              <Input
                required
                name="email"
                type="email"
                placeholder="john@example.com"
                variant="bordered"
                fullWidth
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-small font-medium text-default-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline transition-all"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                required
                name="password"
                type="password"
                placeholder="••••••••"
                variant="bordered"
                fullWidth
              />
            </div>

            <Button
              type="submit"
              color="primary"
              className="w-full font-semibold mt-2"
              isLoading={isLoading}
            >
              Sign in
            </Button>

            <div className="flex items-center my-2 w-full">
              <div className="flex-1 border-t border-default-200"></div>
              <span className="px-3 text-xs text-default-400 uppercase">
                Or
              </span>
              <div className="flex-1 border-t border-default-200"></div>
            </div>

            <Button
              type="button"
              variant="bordered"
              onPress={handleGoogleSignIn}
              className="w-full font-medium"
              isLoading={isGoogleLoading}
              startContent={!isGoogleLoading && <FcGoogle size={20} />}
            >
              Sign in with Google
            </Button>
          </Form>

          <p className="text-center text-small text-default-500 mt-2">
            Don&apos;t have an account?{" "}
            <Link
              href="/registration"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
