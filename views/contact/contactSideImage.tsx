import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

export function ContactSideImage({ src, alt }: Props) {
  return (
    <div className="relative mt-12 aspect-[4/3] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
