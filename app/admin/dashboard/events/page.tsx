"use client";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, imageDb } from "../../../../lib/firebase/firebase";
import { Suspense, useEffect, useState } from "react";
import moment from "moment";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";
import EventDialog from "../Components/EventDialog";
import { Edit } from "@mui/icons-material";

export interface Event {
  date: string;
  name: string;
  description: string;
  isMain: boolean;
  files: any;
}

export default function AdminDashboard() {
  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState<Event>({
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
      const fileId = uuid();
      await addDoc(collection(db, "events"), {
        name: newItem.name.trim(),
        date: newItem.date,
        description: newItem.description,
        isMain: newItem.isMain,
        fileId: newItem.files ? `eventImages/${fileId}` : "",
      });

      if (newItem.files) {
        const imgRef = ref(imageDb, `eventImages/${fileId}`);

        uploadBytes(imgRef, newItem.files).then((snapshot) => {});
      }
      setNewItem({ name: "", description: "", date: "", isMain: false, files: null });

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

  return (
    <main className="lg:max-w-[1200px] lg:m-auto tracking-wide z-0">
      <Suspense fallback={<div>Loading data...</div>}>
        {isDialogOpened && (
          <EventDialog
            item={newItem}
            onChange={setNewItemHandler}
            addEvent={addEvent}
            onClose={() => setIsDialogOpen(false)}
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
          <ul className="flex flex-wrap gap-10">
            {items.map((item, id) => {
              return (
                <li key={id}>
                  <div className=" border-t-4 border-gray-900">
                    <div className="text-lg font-bold">{item.name}</div>
                    <div className="text-sm">
                      <span className="font-bold">
                        {moment(item.date).format("DD MMM YYYY")}
                      </span>{" "}
                      at{" "}
                      <span className="font-bold">
                        {moment(item.date).format("HH:mm")}
                      </span>
                    </div>
                  </div>
                  <div className="join w-full mt-4">
                    <div
                      className="bg-red-500 border-none join-item w-[50%] flex justify-center items-center py-1"
                      onClick={() => deleteItem(item.id)}
                    >
                      <DeleteForeverIcon />
                    </div>
                    <div
                      className="bg-emerald-500 border-none join-item w-[50%] flex justify-center items-center py-1"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Edit />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Suspense>
    </main>
  );
}
