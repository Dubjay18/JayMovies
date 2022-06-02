import { signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/Header";
import { auth } from "../../firebase";
import pp from "../../public/whatsbg.jpeg";
import { useStateValue } from "../../stateProvider";

function Profile() {
  const [{ user, uid, darkmode }, dispatch] = useStateValue();
  const router = useRouter();
  const { userid } = router.query;
  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        dispatch({
          type: "SET_UID",
          uid: null,
        });
        router.push("/");
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };
  return (
    <div
      data-theme={darkmode ? "halloween" : "cupcake"}
      className={"bg-base-100 h-screen"}
    >
      <Header />
      <div className="lg:h-2/3 h-4/5 flex items-center justify-center  sm:min-w-[400px] ">
        <div className="  w-2/3 md:mx-0 mx-2">
          <h1 className="lg:text-3xl text-xl text-primary font-poppins my-5">
            Edit Profile
          </h1>
          <div className="sm:flex ">
            <Image src={pp} layout="fixed" width={70} height={70} />
            <div className="w-full ml-4 flex flex-col ">
              <h1 className="sm:p-5 p-3 bg-neutral text-primary font-poppins">
                {user}
              </h1>
              <p className="md:text-xl text-primary font-poppins font-bold border-b-2 p-2 border-gray-700">
                Plans (Current Plan: Premium)
              </p>

              <p className="p-2 text-primary font-poppins">
                Renewal data: 04/05/2021
              </p>
              <p className="text-primary font-poppins p-2 flex w-full justify-between"></p>
              <button
                onClick={logOut}
                className=" text-white  p-3 mt-3 dark:bg-teal-400 bg-teal-800 transition-all hover:scale-95"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
