'use client';

import styles from '@/styles/components.scss';

interface CustomButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export default function CustomButton({ 
  children, 
  variant = 'primary', 
  onClick 
}: CustomButtonProps) {
  return (
    <button 
      className={`${styles.customButton} ${styles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}