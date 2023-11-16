"use client";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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
import { db, imageDb } from "../../../../lib/firebase/firebase";
import { Suspense, useEffect, useState } from "react";
import moment from "moment";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";
import EventDialog from "../Components/EventDialog";
import { Edit, Preview } from "@mui/icons-material";

export interface Event {
  id: "";
  date: string;
  name: string;
  description: string;
  isMain: boolean;
  files: any;
}

export default function Blog() {
  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState<Event>({
    id: "",
    date: "",
    name: "",
    description: "",
    isMain: false,
    files: null,
  });

  const setNewItemHandler = (key: string, value: any) => {
    setNewItem((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const [isDialogOpened, setIsDialogOpen] = useState(false);

  const addEvent = async (e: any) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.date !== "" && newItem.description !== "") {
      const docRef = await addDoc(collection(db, "blog"), {
        name: newItem.name.trim(),
        date: newItem.date,
        description: newItem.description,
        isMain: newItem.isMain,
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

      setNewItem({
        id: "",
        name: "",
        description: "",
        date: "",
        isMain: false,
        files: null,
      });

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
    });
    setIsDialogOpen(false);
  };

  const openEditDialog = (data: any) => {
    setNewItem(data);
    setIsDialogOpen(true);
  };

  return (
    <main className="lg:max-w-[1200px] lg:m-auto tracking-wide z-0">
      <Suspense fallback={<div>Loading data...</div>}>
        {isDialogOpened && (
          <EventDialog
            item={newItem}
            onChange={setNewItemHandler}
            onConfirm={newItem.id ? editItem : addEvent}
            onClose={() => setIsDialogOpen(false)}
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
                    <td> {moment(item.date).format("DD/MM/YYYY HH:mm")}</td>
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
                        <div
                          className="btn btn-ghost btn-circle btn-sm bg-blue-500 border-none join-item flex justify-center items-center"
                          onClick={() => openEditDialog(item)}
                        >
                          <Preview fontSize="small" />
                        </div>
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
