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
} from "firebase/firestore";
import { db, imageDb } from "../../../../lib/firebase/firebase";
import { Suspense, useEffect, useState } from "react";
import moment from "moment";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";
import EventDialog from "../Components/EventDialog";
import { Edit } from "@mui/icons-material";

export interface Event {
  id: "";
  date: string;
  name: string;
  description: string;
  isMain: boolean;
  files: any;
}

export default function AdminDashboard() {
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
    });
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
                  <th>Name</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, id) => (
                  <tr key={id} className="">
                    <td>{item.name}</td>
                    <td>{item.description}</td>
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
