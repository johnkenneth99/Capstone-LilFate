import { Fragment, memo, useEffect } from "react";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";
import useFireStore from "@/hooks/useFireStore";
import { signOut } from "firebase/auth";
import { PAGES } from "@/constants";

const LINKS = [
  { label: "Dashboard", href: "/" },
  { label: "Questions", href: "/questions" },
  { label: "Dictionary", href: "#" },
  { label: "Students", href: "#" },
];

function Navbar() {
  const { auth } = useFireStore();
  const { pathname, push } = useRouter();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  const handleSignOut = async () => {
    await signOut(auth);
    push(PAGES.LOGIN);
  };

  return (
    <nav className="flex items-center bg-white text-slate-500 text-lg font-medium shadow-lg">
      <ul className="flex w-full justify-end ">
        {LINKS.map(({ label, href }, index) => (
          <Fragment key={label.concat(index)}>
            <li className="flex">
              <Link
                className={classNames(
                  "p-5 hover:bg-slate-600 hover:text-white",
                  {
                    "mr-5": index === LINKS.length - 1,
                  },
                  {
                    "border-b-2 border-slate-600": pathname === href,
                  }
                )}
                href={href}
              >
                {label}
              </Link>
            </li>
          </Fragment>
        ))}
      </ul>
      <button
        className="bg-white text-slate rounded-full w-[50px] h-[50px] shadow-sm outline outline-1 mr-5 hover:bg-slate-600 hover:text-white"
        onClick={() => handleSignOut()}
      >
        T
      </button>
    </nav>
  );
}

export default memo(Navbar);
