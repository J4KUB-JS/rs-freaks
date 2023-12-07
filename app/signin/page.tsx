"use client";
import Image from "next/image";

import { UserAuth } from "@/context/AuthContext";
import signIn from "@/public/img/signIn.png";
import { Google } from "@mui/icons-material";
export default function SignIn() {
  const { user, googleSignIn, logOut } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="lg:max-w-[1300px] lg:m-auto z-0">
      <div className="grid grid-cols-2">
        <div className="justify-self-center pt-32">
          <div className="max-w-[400px]">
            <div className="font-bold text-4xl uppercase font-Inter">Welcome Back</div>
            <div className="text-gray-600 text-xl pt-1">How&apos;s the car doing?</div>
            <div className="form-control w-full mt-5">
              <label className="label">
                <span className="label-text">User name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="JohnDoe"
              />
            </div>
            <div className="form-control w-full mt-5">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="***********"
              />
              <div className="pl-1 pt-1 underline text-gray-500">Forget password?</div>
            </div>
          </div>
          <button className="bg-gray-900 text-gray-50 flex justify-center py-2 rounded-md mt-5 w-full">
            Sign In
          </button>
          <button
            className="border-gray-900 border text-gray-900 flex gap-2 items-center justify-center py-2 rounded-md mt-2 w-full"
            onClick={handleSignIn}
          >
            <Google /> Sign in with Google
          </button>
          <div className="pl-1 pt-1 underline text-gray-500 text-center">
            Sign in available only for Admin
          </div>
        </div>
        <div className=" justify-self-end">
          <Image src={signIn} alt="" quality={100} />
        </div>
      </div>
    </main>
  );
}
