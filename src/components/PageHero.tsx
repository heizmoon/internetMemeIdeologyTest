interface PageHeroProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHero({ title, description, className = '' }: PageHeroProps) {
  return (
    <section className={`relative z-10 w-full max-w-md flex flex-col items-center ${className}`}>
      <div className="absolute inset-x-2 top-2 h-[13.5rem] rounded-[36px] bg-[radial-gradient(circle_at_top,rgba(255,244,214,0.36),rgba(255,244,214,0.12)_58%,transparent_85%)] blur-md"></div>

      <div className="w-full h-12 md:h-16 flex items-center justify-center relative z-20 mb-8">
        <h2
          className="text-xl md:text-2xl font-serif font-black tracking-[0.2em] text-[#f2ecd9] drop-shadow-lg"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.4)' }}
        >
          2025年度键政话题
        </h2>
      </div>

      <div className="relative text-center">
        <h1
          className="text-[2.7rem] md:text-[4.3rem] font-serif font-black tracking-[0.08em] text-transparent bg-clip-text bg-gradient-to-b from-[#fff8eb] via-[#f2e3be] to-[#b6905d]"
          style={{ WebkitTextStroke: '1.5px rgba(73, 48, 24, 0.72)', filter: 'drop-shadow(0px 5px 4px rgba(0,0,0,0.32))' }}
        >
          {title}
        </h1>
      </div>

      {description ? (
        <div className="relative mt-8 w-full max-w-[36ch]">
          <div className="mb-4 h-px w-20 bg-gradient-to-r from-[#8b6c45]/0 via-[#8b6c45]/55 to-[#8b6c45]/0"></div>
          <p
            className="font-serif text-[#3f210d] text-[1.32rem] md:text-[1.45rem] font-bold leading-[1.8] tracking-[0.03em] text-left whitespace-pre-line"
            style={{ textShadow: '0 1px 2px rgba(255,255,255,0.55)' }}
          >
            {description}
          </p>
        </div>
      ) : null}
    </section>
  );
}
