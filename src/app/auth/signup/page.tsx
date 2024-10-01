"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useRouter } from "next/navigation";
import AuthLayout from "../components/AuthLayout";
import SignUpForm from "../components/SignUpForm";

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null); // State for the verification email message

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.push("/dashboard");
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          router.push("/dashboard");
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  const handleSignUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Signup successful! Please check your email to verify your account.");  // Notify user
    }
  };

  return (
    <AuthLayout>
      <SignUpForm handleSubmit={handleSignUp} error={error} message={message} />  {/* Pass message */}
    </AuthLayout>
  );
}
