import Layout from "@/components/Layout";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { push } = useRouter();

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-white">
      <h1 className="font-bold text-[5rem]">LILFATE WEB APPLICATION</h1>
      <div className="flex flex-col items-center justify-center h-96 w-[500px] bg-white gap-5">
        <input className="outline outline-1 rounded p-2 text-lg w-96 ring-1" type="text" placeholder="Email" />
        <input className="outline outline-1 rounded p-2 text-lg w-96" type="password" placeholder="Password" />
        <button
          className="w-96 bg-gray-800 rounded text-white text-xl font-medium p-2 hover:bg-gray-600"
          onClick={() => push({ pathname: "questions" })}
        >
          LOGIN
        </button>
        {/* <button className="w-96 bg-gray-500 rounded text-white text-md font-medium p-2 hover:bg-gray-200">Forgot password?</button> */}
      </div>
    </main>
  );
}
