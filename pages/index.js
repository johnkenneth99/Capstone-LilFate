import InputField from "@/components/InputField";
import Spinner from "@/components/Spinner";
import { PAGES } from "@/constants";
import { AUTHENTICATION } from "@/constants/messages";
import useFireStore from "@/hooks/useFireStore";
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { Form, Formik } from "formik";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const FIELDS = Object.freeze({
  EMAIL: { name: "email", label: "Email", type: "text" },
  PASSWORD: { name: "password", label: "Password", type: "password" },
});

const INITIAL_VALUES = Object.freeze({
  email: "",
  password: "",
});

export default function Home() {
  const formikRef = useRef(null);
  const { push } = useRouter();
  const { auth } = useFireStore();
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    auth?.currentUser && push(PAGES.QUESTION);
  }, []);

  const handleSubmit = async ({ email, password }) => {
    setIsloading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);

      await signInWithEmailAndPassword(auth, email, password).then(() => push(PAGES.QUESTION));
    } catch ({ code, message }) {
      const {
        current: { setErrors },
      } = formikRef;

      const field = code.includes("email") || code.includes("user") ? "email" : "password";

      setErrors({ [field]: AUTHENTICATION[code] });
      setIsloading(false);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-slate-50 overflow-hidden">
      <h1 className="font-bold text-[2rem] md:text-[5rem]">LILFATE WEB APPLICATION</h1>
      <Formik innerRef={formikRef} initialValues={INITIAL_VALUES} onSubmit={handleSubmit} enableReinitialize>
        {() => (
          <Form className="flex flex-col items-center justify-center min-w-fit w-1/3 bg-white gap-5 p-24 shadow-lg my-10">
            <h1 className="text-[2rem] font-thin">ACCOUNT LOGIN</h1>
            <InputField {...FIELDS.EMAIL} />
            <InputField {...FIELDS.PASSWORD} />
            <p className="ml-auto text-blue-500 cursor-pointer hover:text-blue-900 hover:underline">Forgot password?</p>

            <button className="w-full bg-gray-800 rounded text-white text-xl font-medium p-2 hover:bg-gray-600" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : `LOGIN`}
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
