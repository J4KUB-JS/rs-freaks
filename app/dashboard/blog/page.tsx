"use client";

import { Suspense, useEffect, useState } from "react";
import moment from "moment";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Edit, Preview } from "@mui/icons-material";

import { PostType } from "@/app/types";
import { db, imageDb } from "@/lib/firebase/firebase";
import PostDialog from "@/components/PostDialog";
import { TempPost } from "@/app/constants";

export default function Blog() {
  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState<PostType>(TempPost);

  const setNewItemHandler = (key: string, value: any) => {
    setNewItem((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const [isDialogOpened, setIsDialogOpen] = useState(false);

  const addEvent = async (e: any) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.description !== "" && newItem.subtitle !== "") {
      const docRef = await addDoc(collection(db, "blog"), {
        name: newItem.name.trim(),
        description: newItem.description,
        subtitle: newItem.subtitle,
        createdAt: moment().format("YYYY MM DD"),
        files: [],
      });

      await Promise.all(
        newItem.files.map((img: any) => {
          const imgRef = ref(imageDb, `blogImages/${img.path}`);
          uploadBytes(imgRef, img).then(async () => {
            const downloadURL = await getDownloadURL(imgRef);
            await updateDoc(doc(db, "blog", docRef.id), {
              files: arrayUnion(downloadURL),
            });
          });
        })
      );

      setNewItem(TempPost);

      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "blog"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr: any[] = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      return () => unsubscribe();
    });
  }, []);

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, "blog", id));
  };

  const editItem = async (e: any) => {
    e.preventDefault();

    await updateDoc(doc(db, "blog", newItem.id), {
      ...newItem,
      files: [],
    });

    await Promise.all(
      newItem.files.map((img: any) => {
        if (!(typeof img === "string")) {
          const imgRef = ref(imageDb, `blogImages/${img.path}`);
          uploadBytes(imgRef, img).then(async () => {
            const downloadURL = await getDownloadURL(imgRef);
            await updateDoc(doc(db, `blog/${newItem.id}`), {
              files: arrayUnion(downloadURL),
            });
          });
        }
      })
    );

    setIsDialogOpen(false);
    setNewItem(TempPost);
  };

  const openEditDialog = (data: any) => {
    setNewItem(data);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setNewItem(TempPost);
    setIsDialogOpen(false);
  };

  return (
    <main className="lg:max-w-[1200px] lg:m-auto tracking-wide z-0">
      <Suspense fallback={<div>Loading data...</div>}>
        {isDialogOpened && (
          <PostDialog
            item={newItem}
            onChange={setNewItemHandler}
            onConfirm={newItem.id ? editItem : addEvent}
            onClose={() => closeDialog()}
          />
        )}
        <div className="flex justify-between items-center mb-10">
          <div className="text-xl font-bold">Blog</div>
          <div>
            <button className="btn" onClick={() => setIsDialogOpen(true)}>
              Add Post
            </button>
          </div>
        </div>

        <div className=" col-span-3">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="w-[100%]">Title</th>
                  <th>Publish Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, id) => (
                  <tr key={id} className="">
                    <td>{item.name}</td>
                    <td> {moment(item.createdAt).format("DD/MM/YYYY")}</td>
                    <td>
                      <div className="flex gap-5">
                        <div
                          className="btn btn-ghost btn-circle btn-sm bg-red-500 border-none join-item flex justify-center items-center"
                          onClick={() => deleteItem(item.id)}
                        >
                          <DeleteForeverIcon fontSize="small" />
                        </div>
                        <div
                          className="btn btn-ghost btn-circle btn-sm bg-emerald-500 border-none join-item flex justify-center items-center"
                          onClick={() => openEditDialog(item)}
                        >
                          <Edit fontSize="small" />
                        </div>
                        <a href={`/dashboard/blog/${item.id}`}>
                          <div className="btn btn-ghost btn-circle btn-sm bg-blue-500 border-none join-item flex justify-center items-center">
                            <Preview fontSize="small" />
                          </div>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Suspense>
    </main>
  );
}
