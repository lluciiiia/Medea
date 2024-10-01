import React, { useState } from "react";
import { useRouter } from "next/navigation";  // Import the useRouter hook
import { FaEye, FaEyeSlash } from "react-icons/fa";  // Add react-icons for eye

interface LoginFormProps {
  handleSubmit: (email: string, password: string) => Promise<void>; // Prop for handleSubmit function
  error: string | null;  // Prop for error message
}

const LoginForm: React.FC<LoginFormProps> = ({ handleSubmit, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const router = useRouter();  // Initialize the router

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(email, password); // Call the prop function handleSubmit with email and password
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F8AB5E] to-[#F36961] mb-6">
        Medea
      </h2>
      <p className="text-lg font-medium text-gray-700 mb-6">Nice to see you again</p>
      
      {/* Display error message if it exists */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {/* Form submission */}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Login</label>
          <input
            type="email"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type for password visibility
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
              required
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

        {/* Remember me and forgot password */}
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#F8AB5E] to-[#F36961] text-white py-3 rounded-lg font-semibold transition duration-300"
        >
          Sign in
        </button>
      </form>

      <p className="text-sm mt-4 text-center text-gray-600">
        Don't have an account?{" "}
        <a
          href="#"
          onClick={() => router.push("/auth/signup")} 
          className="text-blue-600 hover:underline"
        >
          Sign up now
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
