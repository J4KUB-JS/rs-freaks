import React from "react";

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase/firebase";
import Image from "next/image";

export async function getData() {
  let q = query(collection(db, "restaurants"));

  q = query(collection(db, "carsInClub"));
  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return doc.data();
  });
}

export default async function Test() {
  const data = await getData();
  return (
    <>
      <div className="flex flex-wrap gap-5 mt-10">hello content</div>
    </>
  );
}
