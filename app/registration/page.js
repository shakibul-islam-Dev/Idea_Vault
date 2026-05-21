// "use client";

// import { useState } from "react";
// import { Button, Card, Input, Form } from "@heroui/react";
// import Link from "next/link";
// import { FcGoogle } from "react-icons/fc";
// import { authClient } from "../../lib/auth-client";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Registration() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [loading, setLoading] = useState(false);

//   const callbackUrl = searchParams.get("callbackUrl");

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const data = new FormData(e.currentTarget);
//     try {
//       const { error } = await authClient.signUp.email({
//         email: data.get("mail"),
//         password: data.get("pass"),
//         name: `${data.get("first")} ${data.get("last")}`,
//         image: data.get("img") || null,
//         callbackURL: callbackUrl,
//       });

//       if (error) {
//         toast.error(error.message || "Invalid email or password");
//         setLoading(false);
//       } else {
//         toast.success("Account Created Successfully!");
//         router.push(callbackUrl);
//       }
//     } catch (err) {
//       toast.error("Something went wrong. Please try again.");
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignUp = async () => {
//     setLoading(true);
//     try {
//       await authClient.signIn.social({
//         provider: "google",
//         callbackURL: callbackUrl,
//       });
//     } catch (err) {
//       toast.error("Google sign-up failed.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4 transition-colors">
//       <ToastContainer position="top-center" autoClose={3000} />

//       <Card className="p-8 w-full max-w-md bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 shadow-xl flex flex-col gap-4">
//         <div className="text-center mb-2">
//           <h1 className="text-black dark:text-white text-2xl font-bold tracking-tight">
//             Create Account
//           </h1>
//           <p className="text-small text-gray-500 dark:text-gray-400 mt-1">
//             Get started by creating your new account
//           </p>
//         </div>

//         <Form
//           className="flex flex-col gap-4"
//           onSubmit={submit}
//           validationBehavior="native"
//         >
//           {/* First Name & Last Name */}
//           <div className="grid grid-cols-2 gap-4 w-full">
//             <div className="flex flex-col gap-1">
//               <label className="text-small font-medium text-gray-700 dark:text-gray-300">
//                 First Name <span className="text-danger">*</span>
//               </label>
//               <Input
//                 name="first"
//                 placeholder="John"
//                 required={true}
//                 variant="bordered"
//                 fullWidth
//               />
//             </div>
//             <div className="flex flex-col gap-1">
//               <label className="text-small font-medium text-gray-700 dark:text-gray-300">
//                 Last Name <span className="text-danger">*</span>
//               </label>
//               <Input
//                 name="last"
//                 placeholder="Doe"
//                 required={true}
//                 variant="bordered"
//                 fullWidth
//               />
//             </div>
//           </div>

//           {/* Image URL */}
//           <div className="w-full flex flex-col gap-1">
//             <label className="text-small font-medium text-gray-700 dark:text-gray-300">
//               Image URL (Optional)
//             </label>
//             <Input
//               name="img"
//               placeholder="https://example.com/avatar.jpg"
//               variant="bordered"
//               fullWidth
//             />
//           </div>

//           {/* Email */}
//           <div className="w-full flex flex-col gap-1">
//             <label className="text-small font-medium text-gray-700 dark:text-gray-300">
//               Email <span className="text-danger">*</span>
//             </label>
//             <Input
//               name="mail"
//               type="email"
//               placeholder="john@example.com"
//               required={true}
//               variant="bordered"
//               fullWidth
//             />
//           </div>

//           {/* Password */}
//           <div className="w-full flex flex-col gap-1">
//             <label className="text-small font-medium text-gray-700 dark:text-gray-300">
//               Password <span className="text-danger">*</span>
//             </label>
//             <Input
//               name="pass"
//               type="password"
//               placeholder="••••••••"
//               required={true}
//               variant="bordered"
//               fullWidth
//             />
//           </div>

//           <Button
//             type="submit"
//             color="danger"
//             isLoading={loading}
//             className="w-full font-bold mt-2"
//           >
//             Continue
//           </Button>
//         </Form>

//         {/* Divider */}
//         <div className="flex items-center my-2 w-full">
//           <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
//           <span className="px-3 text-xs text-gray-400 uppercase">Or</span>
//           <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
//         </div>

//         {/* Google Button */}
//         <Button
//           type="button"
//           variant="bordered"
//           className="w-full text-black dark:text-white border-gray-300 dark:border-gray-700 font-medium"
//           onPress={handleGoogleSignUp}
//           isDisabled={loading}
//           startContent={<FcGoogle size={20} />}
//         >
//           Continue with Google
//         </Button>

//         {/* Login Link */}
//         <p className="text-gray-600 dark:text-gray-400 text-sm text-center mt-2">
//           Already have an account?{" "}
//           <Link
//             href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
//             className="text-blue-600 dark:text-blue-500 font-bold hover:underline"
//           >
//             Sign in
//           </Link>
//         </p>
//       </Card>
//     </div>
//   );
// }
