import Image from "next/image";

interface NewCardItemProps {
  imgSrc: any;
  title: string;
  body: string;
}

export const NewCardItem = ({ title, body, imgSrc }: NewCardItemProps) => {
  return (
    <div className="flex gap-5 items-center py-4">
      <Image alt="" src={imgSrc} className="w-20 h-20" width={100} height={100} />
      <span>
        <h4 className="text-gray-900 xl:text-xl md:text-base pb-2 text-2xl">{title}</h4>
        <p className="text-gray-700 xl:text-base md:text-base">{body}</p>
      </span>
    </div>
  );
};
