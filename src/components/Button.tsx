interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-3xl font-medium transition-all duration-300 hover:scale-105 text-center";
  const variants = {
    primary: "bg-[#e4ff00] text-zinc-900 hover:bg-[#ccff00] shadow-lg shadow-[#e4ff00]/10",
    secondary: "bg-zinc-900/80 text-[#e4ff00] border-2 border-[#e4ff00] hover:bg-zinc-800/80"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}