import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/solid";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/dist/client/router";
import { SupportIcon } from "@heroicons/react/outline";
import { validateEmail } from "../lib/validations";
import Layout from "../components/Layout";

export default function SignIn(props) {
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const [loading, setLoading] = useState(false);
  const [authSession, setAuthSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailStorage, setEmailStorage] = useState("");
  const [passwordStorage, setPasswordStorage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("auth");

    setEmailStorage(localStorage.getItem("email"));
    setPasswordStorage(localStorage.getItem("password"));
    setAuthSession(auth);

    if (auth !== null) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, []);

  useEffect(() => {});

  const onSubmit = useCallback(
    async (event) => {
      setLoading(true);
      event.preventDefault();

      if (validateEmail(email)) {
        setError({ email: true });
      } else {
        setError({ email: true });
      }
      if (password.length > 4) {
        setError({ password: false });
        const res = await fetch("/api/signing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            storage: { emailStorage, passwordStorage },
          }),
        })
          .then((response) => {
            return response.json();
          })
          .catch((err) => console.error(err));

        if (res.ok) {
          setLoading(false);
          if (localStorage) {
            localStorage.setItem("auth", "authenticated");
          }
          return router.push("/");
        } else {
          setLoading(false);
          alert("User not auth");
        }
      } else {
        setLoading(false);
        setError({ password: true });
      }
    },
    [email, password, loading]
  );

  if (authSession !== null) {
    return (
      <Layout auth={authSession}>
        <div className="flex h-screen items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <iframe
              src="https://giphy.com/embed/3og0IRWr9D2edzkdTa"
              width="100%"
              height="100%"
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
            <h4>
              Loading
              <span className="font-bold animate-pulse text-xl">.</span>
              <span className="font-bold animate-pulse text-xl">.</span>
              <span className="font-bold animate-pulse text-xl">.</span>
            </h4>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>Hi stranger, sign-in 🙈</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <a className="absolute top-2 left-2 inline-flex items-center justify-center">
            Go to home{" "}
            <ArrowCircleRightIcon
              className="h-4 w-4 mr-[2px] mt-[2px] text-indigo-500 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </a>
        </Link>
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {error.email && "check the email 👀"}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {error.password && "password could be more than 5 characters"}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-right w-full">
                <Link href="/sign-up">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    are you stranger?👻
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <div className="group relative inline-flex w-full items-center">
                <input
                  className="pl-3  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:cursor-pointer"
                  type="submit"
                  value="Sign in"
                />
                {loading ? (
                  <SupportIcon className="animate-spin ml-2 h-6 w-6 text-indigo-500 group-hover:text-indigo-400" />
                ) : (
                  <LockClosedIcon
                    className="h-6 w-6 ml-2 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                )}{" "}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

SignIn.getInitialProps = async (ctx) => {
  let email = "";
  let password = "";
  if (typeof window !== "undefined") {
    email = localStorage.getItem("email");
    password = localStorage.getItem("password");
  }
  return { emailStorage: email, passwordStorage: password };
};
