import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'primary' }) => {
  const buttonStyle =
    type === 'primary'
      ? 'bg-gradient-to-r from-[#F8AB5E] to-[#F36961] text-white px-8 py-2 rounded-full shadow-md font-semibold transition duration-300 ease-in-out transform hover:scale-105'
      : 'bg-[#0A2540] text-white px-8 py-2 rounded-full shadow-md font-semibold transition duration-300 ease-in-out transform hover:scale-105';

  return (
    <button onClick={onClick} className={buttonStyle}>
      {label}
    </button>
  );
};

export default Button;
