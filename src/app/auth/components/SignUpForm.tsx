import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useRouter } from "next/navigation";  // Import useRouter
import { FaEye, FaEyeSlash } from "react-icons/fa";  // For password visibility toggle

interface SignUpFormProps {
  handleSubmit: (email: string, password: string) => void;
  error: string | null;
  message: string | null;  // Message for the email verification
}

export default function SignUpForm({ handleSubmit, error, message }: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const router = useRouter();  // Use the useRouter hook

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F8AB5E] to-[#F36961] mb-6">
        Medea
      </h2>
      <p className="text-lg font-medium text-gray-700 mb-6">Create your account</p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-green-500 mb-4">{message}</p>} {/* Show verification message */}
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 text-gray-500 flex items-center"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#F8AB5E] to-[#F36961] text-white py-3 rounded-lg font-semibold transition duration-300"
        >
          Sign up
        </button>
      </form>
      <p className="text-sm mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <a
          href="#"
          onClick={() => router.push("/auth/login")}  // Use router to navigate
          className="text-blue-600 hover:underline"
        >
          Log in
        </a>
      </p>
    </div>
  );
}
