"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import { imageDb } from "../../../../lib/firebase/firebase";
import { FileDropDown } from "../../_components/FileDropDown";
import { db } from "../../../../lib/firebase/firebase";

export default function Cars() {
  const [imageUrls, setImageUrls] = useState<{ files: any[] }[]>([{ files: [] }]);
  const [newImage, setNewImage] = useState<any[]>([]);
  const [uploadDialogOpened, setUploadDialogOpened] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "carsInClub"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr: any[] = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data() });
      });
      setImageUrls(itemsArr);

      return () => unsubscribe();
    });
  }, []);

  const uploadPhoto = async (e: any) => {
    const docRef = await addDoc(collection(db, "carsInClub"), {
      name: "",
      files: [],
    });

    await Promise.all(
      newImage.map((img) => {
        const imgRef = ref(imageDb, `carsInClub/${img.path}`);
        uploadBytes(imgRef, img).then(async () => {
          const downloadURL = await getDownloadURL(imgRef);
          await updateDoc(doc(db, "carsInClub", docRef.id), {
            files: arrayUnion(downloadURL),
          });
        });
      })
    );
    setUploadDialogOpened(false);
  };

  return (
    <main className="z-0">
      {uploadDialogOpened && (
        <FileDropDown
          isMulti
          onChange={(value) => setNewImage(value)}
          urls={newImage || []}
          onUpload={uploadPhoto}
          onClose={() => setUploadDialogOpened(false)}
          asDialog
        />
      )}

      <div className="flex justify-between items-center mb-10">
        <div className="text-xl font-bold">Cars In Clubs</div>
        <div>
          <button className="btn" onClick={() => setUploadDialogOpened(true)}>
            Upload Files
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 mt-10">
        {imageUrls.map((img, index) => {
          if (img.files !== undefined) {
            return img.files.map((imgURL) => {
              return <Image src={imgURL} key={index} width={200} height={200} alt="" />;
            });
          }
        })}
      </div>
    </main>
  );
}
