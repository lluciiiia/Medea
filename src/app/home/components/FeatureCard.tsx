// src/components/FeatureCard.tsx
import Link from 'next/link'
import React from 'react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  primaryButton: string
  secondaryButton: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, primaryButton, secondaryButton }) => (
  <div className="bg-white rounded-[30px] shadow-lg p-8 flex flex-col justify-between h-full">
    {/* Icon */}
    <div className="text-[#F8AB5E] mb-4 mx-auto w-12 h-12 flex items-center justify-center">
      {icon}
    </div>
    {/* Content */}
    <div className="flex-grow text-center">
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
    </div>
    {/* Buttons */}
    <div className="mt-auto text-center">
      <button className="bg-gradient-to-r from-[#F8AB5E] to-[#F36961] text-white px-6 py-3 rounded-full font-medium hover:bg-orange-600 transition mb-4">
        {primaryButton}
      </button>
      <Link href="#" className="text-orange-500 hover:text-orange-600 block">
        {secondaryButton} →
      </Link>
    </div>
  </div>
)

export default FeatureCard;
