import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A responsive layout container that centers content
 * and keeps consistent horizontal padding & max width.
 */
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`max-w-6xl mx-auto px-6 sm:px-6 lg:px-6 ${className}`}>
      {children}
    </div>
  );
}
