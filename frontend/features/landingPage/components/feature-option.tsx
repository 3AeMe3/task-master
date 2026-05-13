export default function FeatureOption({
  title,
  handleClick,
  className,
}: {
  title: string;
  handleClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={handleClick}
      className={`${className} w-1/3 min-w-44  border border-white/40 h-full  cursor-pointer lg:w-full `}
    >
      {title}
    </button>
  );
}
