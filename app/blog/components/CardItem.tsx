import Image from "next/image";

interface CardItemProps {
  index: string;
  imgSrc: any;
  title: string;
  body: string;
}

export const CardItem = ({ index, imgSrc, title, body }: CardItemProps) => {
  return (
    <div className={"flex text-left gap-5 xl:w-96 md:w-80 w-96"}>
      <Image alt="" src={imgSrc} className="h-40" />
      <div>
        <span className="font-bold text-grayishBlue text-3xl">{index}</span>
        <h4 className="font-bold mt-3">{title}</h4>
        <p className="text-sm">{body}</p>
      </div>
    </div>
  );
};
