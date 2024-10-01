"use client";

import Head from "next/head";
import Image from "next/image";
import Navbar from "./components/NavBar";
import FeatureCard from "./components/FeatureCard";
import Footer from "./components/Footer";
import Link from "next/link";
import {
  LightBulbIcon,
  UserGroupIcon,
  BriefcaseIcon,
} from "@heroicons/react/outline";

const HomePage: React.FC = () => (
  <div className="min-h-screen flex flex-col">
    <Head>
      <title>Medea - Empowering Creative Workflows</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Navbar />

    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative h-[700px]">
        <Image
          src="/HomePageBackgroud.png"
          alt="Studio Background"
          fill
          className="object-cover"
          priority
        />
        {/* Lightened Background Overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-20 flex items-center justify-center">
          <div className="bg-white bg-opacity-95 rounded-[50px] p-10 text-center max-w-2xl shadow-xl transition-all duration-500 ease-in-out">
            {/* Title */}
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F8AB5E] to-[#F36961] mb-4">
              Medea
            </h1>
            {/* Enhanced Tagline */}
            <p className="text-3xl font-bold text-gray-800 mb-8">
              Empowering Creative Workflows from Concept to Completion
            </p>
            {/* Button */}
            <Link href="/auth/login">
              <button className="text-2xl bg-gradient-to-r from-[#F8AB5E] to-[#F36961] text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
                Create Project
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="bg-gradient-to-r from-[#F8AB5E] to-[#F36961] py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon={<BriefcaseIcon className="w-10 h-10" />}
              title="Media Project"
              description="Create stunning media projects with our easy-to-use template generator."
              primaryButton="Start Creating"
              secondaryButton="Learn More"
            />

            <FeatureCard
              icon={<LightBulbIcon className="w-10 h-10" />}
              title="Unleash Your Creativity"
              description="Explore different styles, layouts, and designs."
              primaryButton="Get Started"
              secondaryButton="Discover Templates"
            />

            <FeatureCard
              icon={<UserGroupIcon className="w-10 h-10" />}
              title="Share and Collaborate"
              description="Collaborate with your team in real-time."
              primaryButton="Sign Up"
              secondaryButton="Learn More"
            />
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default HomePage;
