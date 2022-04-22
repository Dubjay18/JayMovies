import Image from "next/image";
import React from "react";
import what from "../public/whatsbg.jpeg";
import { useRouter } from "next/router";
import { useStateValue } from "../stateProvider";

function Header() {
  const [{ user, uid }] = useStateValue();
  const router = useRouter();
  return (
    <div className=" bg-gradient-to-l from-slate-700 to-black flex px-10 w-full items-center justify-between shadow-md">
      <h1
        className="sm:text-4xl text-2xl text-white font-bold font-mono p-5 cursor-pointer animate-bounce"
        onClick={() => router.push("/")}
      >
        JAYMOVIES
      </h1>

      <Image
        src={what}
        layout="fixed"
        width={40}
        height={40}
        onClick={() => router.push(`/Profile/${uid}`)}
      />
    </div>
  );
}

export default Header;
