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

import { EventType } from "@/app/types";
import { db, imageDb } from "@/lib/firebase/firebase";
import EventDialog from "@/components/EventDialog";
import { TempEvent } from "@/app/constants";

export default function Events() {
  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState<EventType>(TempEvent);

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
      const docRef = await addDoc(collection(db, "events"), {
        name: newItem.name.trim(),
        date: newItem.date,
        hour: newItem.hour,
        description: newItem.description,
        isMain: newItem.isMain,
        files: [],
      });

      await Promise.all(
        newItem.files.map((img: any) => {
          const imgRef = ref(imageDb, `eventImages/${img.path}`);
          uploadBytes(imgRef, img).then(async () => {
            const downloadURL = await getDownloadURL(imgRef);
            await updateDoc(doc(db, "events", docRef.id), {
              files: arrayUnion(downloadURL),
            });
          });
        })
      );

      setNewItem(TempEvent);

      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "events"));
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
    await deleteDoc(doc(db, "events", id));
  };

  const editItem = async (e: any) => {
    e.preventDefault();
    await updateDoc(doc(db, "events", newItem.id), {
      ...newItem,
      files: [],
    });

    await Promise.all(
      newItem.files.map((img: any) => {
        if (!(typeof img === "string")) {
          const imgRef = ref(imageDb, `eventImages/${img.path}`);
          uploadBytes(imgRef, img).then(async () => {
            const downloadURL = await getDownloadURL(imgRef);
            await updateDoc(doc(db, `events/${newItem.id}`), {
              files: arrayUnion(downloadURL),
            });
          });
        }
      })
    );

    setIsDialogOpen(false);

    setNewItem(TempEvent);
  };

  const openEditDialog = (data: any) => {
    setNewItem(data);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setNewItem(TempEvent);
    setIsDialogOpen(false);
  };

  return (
    <main className="lg:max-w-[1200px] lg:m-auto tracking-wide z-0">
      <Suspense fallback={<div>Loading data...</div>}>
        {isDialogOpened && (
          <EventDialog
            item={newItem}
            onChange={setNewItemHandler}
            onConfirm={newItem.id ? editItem : addEvent}
            onClose={() => closeDialog()}
          />
        )}
        <div className="flex justify-between items-center mb-10">
          <div className="text-xl font-bold">Events</div>
          <div>
            <button className="btn" onClick={() => setIsDialogOpen(true)}>
              Add event
            </button>
          </div>
        </div>

        <div className=" col-span-3">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="w-[70%]">Name</th>
                  <th className="w-[25%]">Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, id) => (
                  <tr key={id} className="">
                    <td>{item.name}</td>
                    <td>
                      {moment(item.date).format("DD.MM.YYYY")} at{" "}
                      {moment(item.date + " " + item.hour).format("HH:mm")}
                    </td>
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
                        <a href={`/dashboard/events/${item.id}`}>
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
