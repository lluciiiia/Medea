import React from "react";
import {
  FiGrid,
  FiTool,
  FiPhone,
  FiUsers,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi"; // Add logout icon
import Link from "next/link";
import { supabase } from "../supabaseClient"; // Import Supabase client
import { useRouter } from "next/navigation"; // For redirecting after sign out

// Define the types for the menu item to enhance code readability
interface MenuItem {
  label: string;
  icon: React.ComponentType;
  link?: string; // Sign out button won't need a link
  active?: boolean;
  onClick?: () => void; // Optional onClick handler
}

interface SidebarProps {
  menuItems?: MenuItem[]; // Optional prop, defaults to an empty array
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems = [] }) => {
  const router = useRouter(); // Use Next.js router for navigation

  // Handle the sign-out process
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      router.push("/auth/login"); // Redirect to the login page after sign out
    }
  };

  return (
    <aside className="bg-white w-60 h-screen shadow-md flex flex-col items-center">
      {/* Wrap Medea logo in a Link to the dashboard */}
      <Link href="/dashboard">
        <div className="pt-5 mb-12 cursor-pointer">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F8AB5E] to-[#F36961]">
            Medea
          </h1>
        </div>
      </Link>

      {/* Dynamic Menu Items */}
      <div className="space-y-6 flex-grow flex flex-col justify-start w-full">
        {menuItems.map((item, index) => (
          <Link href={item.link || "#"} key={index} className="block w-full">
            <div
              onClick={item.onClick} // Use onClick if defined (for sign-out button)
              className={`flex items-center space-x-3 p-2 rounded-md mx-5 ${
                item.active
                  ? "text-[#F36961] bg-orange-100"
                  : "text-[#B1B1B1] hover:bg-gray-100"
              }`}>
              <item.icon />
              <span className="text-lg font-medium">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Sign Out Button */}
      <div className="w-full mt-auto mb-8">
        <div
          onClick={handleSignOut}
          className="flex items-center space-x-3 p-2 rounded-md mx-5 cursor-pointer text-[#B1B1B1] hover:bg-gray-100">
          <FiLogOut className="w-6 h-6" />
          <span className="text-lg font-medium">Sign Out</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
