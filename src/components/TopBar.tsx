interface TopBarProps {
  className?: string;
}

export default function TopBar({ className = '' }: TopBarProps) {
  return (
    <div className={`w-full h-12 md:h-16 flex items-center justify-center relative z-20 mb-8 ${className}`}>
      <h2
        className="text-xl md:text-2xl font-serif font-black tracking-[0.2em] text-[#f2ecd9] drop-shadow-lg"
        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.4)' }}
      >
        2025年度键政话题
      </h2>
    </div>
  );
}
