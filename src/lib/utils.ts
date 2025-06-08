
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to hash Aadhar number for privacy
export const hashAadhar = (aadhar: string): string => {
  // Simple hash function for demo purposes
  // In production, use a proper cryptographic hash
  let hash = 0;
  if (aadhar.length === 0) return hash.toString();
  
  for (let i = 0; i < aadhar.length; i++) {
    const char = aadhar.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(16);
};

// Format FIR ID
export const formatFIRId = (id: string): string => {
  return id.toUpperCase();
};

// Validate Aadhar number format
export const validateAadhar = (aadhar: string): boolean => {
  const aadharRegex = /^\d{4}-?\d{4}-?\d{4}$/;
  return aadharRegex.test(aadhar.replace(/\s/g, ''));
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Truncate wallet address for display
export const truncateAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
