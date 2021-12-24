import Image from "next/image";
import fel from "../images/felix.jpg";
import ste from "../images/steve.jpeg";
import { useMoralis } from "react-moralis";
function Login() {
  const { authenticate } = useMoralis();
  return (
    <div className="bg-black relative ">
      <h1>i am the Login screen</h1>
      <div className="flex flex-col absolute z-50 h-4/6 items-center justify-center w-full space-y-4">
        <Image
          className="object-cover rounded-full"
          src={ste}
          height={200}
          width={200}
          onClick={authenticate}
        />
        <button
          className="bg-yellow-500 rounded-lg p-5 font-bold animate-pulse"
          onClick={authenticate}
        >
          login to the METAVERSE
        </button>
      </div>
      <div className=" w-full h-screen">
        {/* <Image src={fel} layout="fill" objectFit="cover" /> */}
      </div>
    </div>
  );
}

export default Login;
