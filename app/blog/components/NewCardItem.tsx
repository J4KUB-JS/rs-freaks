import Image from "next/image";

interface NewCardItemProps {
  imgSrc: any;
  title: string;
  body: string;
}

export const NewCardItem = ({ title, body, imgSrc }: NewCardItemProps) => {
  return (
    <div className="flex gap-5 items-center py-4">
      <Image alt="" src={imgSrc} className="w-20 h-20" />
      <span>
        <h4 className="text-gray-900 xl:text-xl md:text-base pb-2 text-2xl">{title}</h4>
        <p className="text-gray-700 xl:text-base md:text-base xl:w-80 md:w-60 w-80">
          {body}
        </p>
      </span>
    </div>
  );
};
