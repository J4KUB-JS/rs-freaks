"use client";

import { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "../../../../lib/firebase/firebase";
import { v4 as uuid } from "uuid";
import Image from "next/image";
import { FileDropDown } from "../Components/FileDropDown";

export default function Cars() {
  const imagesListRef = ref(imageDb, "carsInClub/");

  const [imageUrls, setImageUrls] = useState<any[]>([]);
  const [newImage, setNewImage] = useState<any>(null);
  const [uploadDialogOpened, setUploadDialogOpened] = useState(false);

  function removeDuplicates(arr: string[]): string[] {
    const uniqueArray: string[] = [];
    const seen: { [key: string]: boolean } = {};

    for (const item of arr) {
      if (!seen[item]) {
        uniqueArray.push(item);
        seen[item] = true;
      }
    }

    return uniqueArray;
  }

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      console.log(response.items);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => removeDuplicates([...prev, url]));
        });
      });
    });
  }, []);

  const addImages = async (e: any) => {
    e.preventDefault();
    const fileId = uuid();

    if (newImage) {
      const imgRef = ref(imageDb, `carsInClub/${fileId}`);

      uploadBytes(imgRef, newImage)
        .then((snapshot) => {})
        .finally(() => {
          setNewImage(null);
        });
    }
  };

  return (
    <main className="z-0">
      {uploadDialogOpened && (
        <FileDropDown
          onChange={(value) => setNewImage(value)}
          urls={[]}
          onUpload={addImages}
          onClose={() => setUploadDialogOpened(false)}
          asDialog
        />
      )}

      <div className="flex justify-between items-center mb-10">
        <div className="text-xl font-bold">Events</div>
        <div>
          <button className="btn" onClick={() => setUploadDialogOpened(true)}>
            Upload Files
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 mt-10">
        {imageUrls.map((img, index) => {
          return <Image src={img} key={index} width={200} height={200} alt="" />;
        })}
      </div>
    </main>
  );
}
