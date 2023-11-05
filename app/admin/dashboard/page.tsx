"use client";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import {
  collection,
  addDoc,
  getDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db, imageDb } from "../../../lib/firebase/firebase";
import { useEffect, useState } from "react";
import moment from "moment";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";

import Image from "next/image";
import events from "../../../public/img/events.png";
import { redirect } from "next/navigation";
import { getAuth } from "firebase/auth";
import EventDialog from "./Components/EventDialog";

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

  const imagesListRef = ref(imageDb, "eventImages/");
  const [imageUrls, setImageUrls] = useState<any[]>([]);
  const [isDialogOpened, setIsDialogOpen] = useState(false);

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
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => removeDuplicates([...prev, url]));
        });
      });
    });
  }, []);

  const addEvent = async (e: any) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.date !== "" && newItem.description !== "") {
      // setItems([...items, newItem]);
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
    try {
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, "events", id));
  };

  return (
    <main className="lg:max-w-[1200px] lg:m-auto tracking-wide">
      {isDialogOpened && (
        <EventDialog
          item={newItem}
          onChange={setNewItemHandler}
          addEvent={addEvent}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
      <div className="flex justify-between">
        <div>Events</div>
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
                <div className=" border-t-8 border-gray-900">
                  <div className="text-lg font-bold">{item.name}</div>
                  <div className="text-sm">
                    <span className="font-bold">
                      {moment(item.date).format("DD MMM YYYY")}
                    </span>{" "}
                    at{" "}
                    <span className="font-bold">{moment(item.date).format("HH:mm")}</span>
                  </div>
                </div>
                <button className="btn" onClick={() => deleteItem(item.id)}>
                  <DeleteForeverIcon />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
