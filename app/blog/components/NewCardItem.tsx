import Image from "next/image";

interface NewCardItemProps {
  imgSrc: any;
  title: string;
  body: string;
}

export const NewCardItem = ({ title, body, imgSrc }: NewCardItemProps) => {
  return (
    <div className="flex gap-5 items-center py-2">
      <Image alt="" src={imgSrc} className="w-30 h-30" width={100} height={100} />
      <span>
        <h4 className="text-gray-900 text-md font-bold">{title}</h4>
        <p className="text-gray-700 xl:text-base md:text-base line-clamp-2 w-[200px]">
          {body}
        </p>
      </span>
    </div>
  );
};
