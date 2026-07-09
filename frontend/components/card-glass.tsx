type CardGlassProps = {
  feature: string;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  aosDelay?: string;
};

export default function CardGlass({
  feature,
  title,
  description,
  children,
  className,
  aosDelay,
}: CardGlassProps) {
  return (
    <div
      data-aos="zoom-out"
      data-aos-delay={aosDelay}
      className={`flex h-full flex-1 flex-col gap-5 rounded-xl border border-white/10 bg-[#111827] p-5 text-left backdrop-blur-2xl ${className}`}
    >
      <div>
        <p className="text-sm font-semibold uppercase">
          {feature || 'feature'}
        </p>
        <h4 className="text-xl font-semibold">{title || 'title'}</h4>
        <p>
          {description ||
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, dicta.'}
        </p>
      </div>
      {children}
    </div>
  );
}
