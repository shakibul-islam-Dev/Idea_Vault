"use client";

import { useState } from "react";
import { Button, Card, Form, Input } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

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
        callbackUrl,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password");
        setIsLoading(false);
      } else {
        toast.success("Welcome back!");
        router.push(callbackUrl);
        router.refresh();
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
        callbackUrl,
      });
    } catch (err) {
      toast.error("Google sign-in failed.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-background text-foreground">
      <ToastContainer position="top-center" autoClose={2000} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 shadow-xl border border-default-200">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Login</h2>
            <p className="text-default-500 mt-1">
              Welcome back! Please enter your details.
            </p>
          </div>

          <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="john@example.com"
              variant="bordered"
            />

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-small font-medium">Password</span>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                variant="bordered"
              />
            </div>

            <Button
              type="submit"
              color="primary"
              className="w-full font-semibold"
              isLoading={isLoading}
            >
              Sign in
            </Button>

            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-default-200"></div>
              <span className="text-xs text-default-400">OR</span>
              <div className="flex-1 h-px bg-default-200"></div>
            </div>

            <Button
              className="flex items-center"
              variant="bordered"
              onPress={handleGoogleSignIn}
            >
              <FcGoogle size={20} />
              Sign in with Google
            </Button>
          </Form>

          <p className="text-center text-small text-default-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href={`/registration?callbackUrl=${encodeURIComponent(callbackUrl)}`}
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
