import Image from 'next/image';

interface TopBarProps {
  className?: string;
}

export default function TopBar({ className = '' }: TopBarProps) {
  return (
    <div className={`relative z-20 mb-8 flex w-full justify-center ${className}`}>
      <div className="relative h-12 md:h-16 w-[calc(100%+2.5rem)] md:w-[calc(100%+3rem)] overflow-hidden">
        <Image
          src="/topBar.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative z-10 flex h-full w-full items-center justify-center px-4">
          <h2
            className="m-0 w-full text-center text-xl md:text-2xl font-serif font-black tracking-[0.12em] text-[#f2ecd9] drop-shadow-lg"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.4)' }}
          >
            2025年度键政话题
          </h2>
        </div>
      </div>
    </div>
  );
}
