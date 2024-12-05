interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export function GlassCard({ children, className = '' }: GlassCardProps) {
    return (
      <div className={`backdrop-blur-md bg-zinc-900/40 rounded-3xl border border-zinc-800/50 hover:border-[#e4ff00]/20 transition-colors duration-300 ${className}`}>
        {children}
      </div>
    );
  }