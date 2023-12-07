import { PostType } from "@/app/types";
import Image from "next/image";

interface NewCardItemProps {
  item: PostType;
}

export const NewCardItem = ({ item }: NewCardItemProps) => {
  return (
    <div className="flex gap-5 items-center py-2 border-b border-gray-900">
      <div className=" overflow-hidden h-28 w-28 relative">
        <Image
          alt=""
          src={item.files[0]}
          fill
          style={{ objectFit: "cover" }}
          quality={100}
        />
      </div>
      <span>
        <h4 className="text-gray-900 text-md font-bold">{item.name}</h4>
        <p className="text-gray-700 xl:text-base md:text-base line-clamp-2 w-[200px]">
          {item.subtitle}
        </p>
      </span>
    </div>
  );
};
