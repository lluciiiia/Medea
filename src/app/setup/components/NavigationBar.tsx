import React from "react";
import Button from "./Button";
import { supabase } from "@/app/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NavigationBarProps {
  title: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ title }) => {
  const router = useRouter();

  const handleBack = async () => {
    // await supabase.auth.signOut();
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-between items-center p-1 bg-white">
      {/* Logo Section with Gradient Text */}
      <Link href="/dashboard">
        <div className="cursor-pointer">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F8AB5E] to-[#F36961]">
            Medea
          </h1>
        </div>
      </Link>

      {/* Centered Title */}
      <h1 className="text-2xl font-semibold text-[#1F2937]">{title}</h1>

      {/* Logout Button */}
      <Button label="Home" onClick={handleBack} type="secondary" />
    </div>
  );
};

export default NavigationBar;
