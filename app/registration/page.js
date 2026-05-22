"use client";

import { useState } from "react";
import { Button, Card, Input, Form } from "@heroui/react";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authClient } from "@/lib/auth-client";

export default function Registration() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("mail");
    const password = formData.get("pass");
    const firstName = formData.get("first");
    const lastName = formData.get("last");
    const image = formData.get("img");

    try {
      const { error } = await authClient.signUp.email({
        email: email,
        password: password,
        name: `${firstName} ${lastName}`,
        image: image || null,
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password");
        setLoading(false);
      } else {
        toast.success("Account Created Successfully!");
        router.push(callbackUrl);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    } catch (err) {
      console.error(err);
      toast.error("Google sign-up failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 transition-colors duration-300">
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />

      <Card className="p-8 w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col gap-4 transition-colors">
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
          <p className="text-small text-slate-500 dark:text-slate-400 mt-1">
            Get started by creating your new account
          </p>
        </div>

        <Form
          className="flex flex-col gap-4"
          onSubmit={submit}
          validationBehavior="native"
        >
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-1">
              <label className="text-small font-medium text-slate-700 dark:text-slate-300">
                First Name <span className="text-danger">*</span>
              </label>
              <Input
                name="first"
                placeholder="John"
                required={true}
                variant="bordered"
                fullWidth
                className={{
                  input: "text-slate-900 dark:text-slate-100",
                  inputWrapper:
                    "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-transparent",
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-small font-medium text-slate-700 dark:text-slate-300">
                Last Name <span className="text-danger">*</span>
              </label>
              <Input
                name="last"
                placeholder="Doe"
                required={true}
                variant="bordered"
                fullWidth
                className={{
                  input: "text-slate-900 dark:text-slate-100",
                  inputWrapper:
                    "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-transparent",
                }}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-small font-medium text-slate-700 dark:text-slate-300">
              Image URL (Optional)
            </label>
            <Input
              name="img"
              placeholder="https://example.com/avatar.jpg"
              variant="bordered"
              fullWidth
              className={{
                input: "text-slate-900 dark:text-slate-100",
                inputWrapper:
                  "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-transparent",
              }}
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-small font-medium text-slate-700 dark:text-slate-300">
              Email <span className="text-danger">*</span>
            </label>
            <Input
              name="mail"
              type="email"
              placeholder="john@example.com"
              required={true}
              variant="bordered"
              fullWidth
              className={{
                input: "text-slate-900 dark:text-slate-100",
                inputWrapper:
                  "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-transparent",
              }}
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-small font-medium text-slate-700 dark:text-slate-300">
              Password <span className="text-danger">*</span>
            </label>
            <Input
              name="pass"
              type="password"
              placeholder="••••••••"
              required={true}
              variant="bordered"
              fullWidth
              className={{
                input: "text-slate-900 dark:text-slate-100",
                inputWrapper:
                  "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-transparent",
              }}
            />
          </div>

          <Button
            type="submit"
            color="primary"
            isLoading={loading}
            className="w-full font-bold mt-2"
          >
            Continue
          </Button>
        </Form>

        <div className="flex items-center my-2 w-full">
          <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
          <span className="px-3 text-xs text-slate-400 uppercase">Or</span>
          <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
        </div>

        <Button
          type="button"
          variant="bordered"
          className="w-full text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors"
          onPress={handleGoogleSignUp}
          isDisabled={loading}
        >
          <FaGoogle /> Continue with Google
        </Button>

        <p className="text-slate-600 dark:text-slate-400 text-sm text-center mt-2">
          Already have an account?{" "}
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
