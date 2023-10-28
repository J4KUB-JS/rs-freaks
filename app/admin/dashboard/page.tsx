"use client";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

import {
  collection,
  addDoc,
  getDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase/firebase";
import { useEffect, useState } from "react";
import moment from "moment";

export default function AdminDashboard() {
  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState({
    date: "",
    name: "",
    description: "",
    isMain: false,
  });

  const addEvent = async (e: any) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.date !== "" && newItem.description !== "") {
      // setItems([...items, newItem]);
      await addDoc(collection(db, "events"), {
        name: newItem.name.trim(),
        date: newItem.date,
        description: newItem.description,
        isMain: newItem.isMain,
      });
      setNewItem({ name: "", description: "", date: "", isMain: false });
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
    <main className="lg:max-w-[1200px] lg:m-auto tracking-wide">
      <div className="grid grid-cols-5 gap-16">
        <div className=" col-span-2">
          <form className="">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Event Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="meat up at..."
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="textarea textarea-bordered w-full min-h-[300px]"
                placeholder="what will we do?"
              ></textarea>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={newItem.date}
                onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                placeholder="10 11 2023 15:30"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Is Main Event</span>
              </label>
              <input
                type="checkbox"
                checked={newItem.isMain}
                className="toggle input input-bordered"
                onChange={(e) =>
                  setNewItem((prevState) => {
                    return { ...prevState, isMain: !prevState.isMain };
                  })
                }
              />
            </div>

            <button onClick={addEvent} className="btn w-full mt-5" type="submit">
              <AddIcon />
            </button>
          </form>
        </div>

        <div className=" col-span-3 mt-10">
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
                      <span className="font-bold">
                        {moment(item.date).format("HH:mm")}
                      </span>
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
      </div>
    </main>
  );
}
