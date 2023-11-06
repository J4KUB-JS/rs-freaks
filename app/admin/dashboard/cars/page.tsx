"use client";

import { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "../../../../lib/firebase/firebase";
import { v4 as uuid } from "uuid";
import Image from "next/image";

export default function Cars() {
  const imagesListRef = ref(imageDb, "carsInClub/");

  const [imageUrls, setImageUrls] = useState<any[]>([]);
  const [newImage, setNewImage] = useState<any>(null);

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
  }, [imagesListRef]);

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
      <div className="form-control max-w-sm">
        <label className="label">
          <span className="label-text">Files</span>
        </label>
        <input
          type="file"
          className="file-input file-input-bordered w-full"
          onChange={(e) => setNewImage(e.target.files ? e.target.files[0] : null)}
        />
        <button className="btn" onClick={addImages}>
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-5 mt-10">
        {imageUrls.map((img, index) => {
          return <Image src={img} key={index} width={200} height={200} alt="" />;
        })}
      </div>
    </main>
  );
}
