import Image from "next/image";
type CardGlassProps = {
  title?: string;
  description?: string;
  imgUrl?: string;
};
export default function CardGlass({
  title,
  description,
  imgUrl,
}: CardGlassProps) {
  return (
    <div className="flex flex-col gap-4 h-full w-full items-center justify-center text-left  border-white/30 border rounded-xl p-5 backdrop-blur-2xl  ">
      <Image
        src={imgUrl || "/mockup/mockupHd.webp"}
        className="mx-auto"
        alt="mockup image"
        width={200}
        height={200}
      />

      <div>
        <h3 className="font-bold text-xl text-white/80">{title || "title"}</h3>
        <p className="text-gray-300">
          {description ||
            "lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, dicta."}
        </p>
      </div>
    </div>
  );
}
