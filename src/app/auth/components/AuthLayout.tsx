import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;  // Make AuthLayout accept children components
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left section - Image (2/3 of the layout) */}
      <div
        className="hidden lg:flex w-2/3 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/AuthBackground.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute bottom-5 left-5 text-white text-sm">
          Photo by Alexandr Popadin
        </div>
      </div>

      {/* Right section - Form (1/3 of the layout) */}
      <div className="w-full lg:w-1/3 flex items-center justify-center bg-white p-10 shadow-xl">
        {children}  {/* Render the passed form component here */}
      </div>
    </div>
  );
}
