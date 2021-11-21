import Head from "next/head";
import Link from "next/link";
import { SupportIcon } from "@heroicons/react/solid";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import { useCallback, useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/outline";
import { useRouter } from "next/dist/client/router";

import Input from "../components/input";
import Layout from "../components/Layout";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [authSession, setAuthSession] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setAuthSession(auth === "authenticated");
  }, []);

  useEffect(() => {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("userName", userName);
  }, [email, password, userName]);

  const onSubmit = useCallback(
    async (event) => {
      setLoading(true);
      event.preventDefault();
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          setLoading(true);
          return response.json();
        })
        .catch((err) => console.error(err));
      if (res.ok) {
        router.push("/sign-in");
      }
    },
    [loading]
  );

  if (authSession) {
    setTimeout(() => {
      router.push("/");
    }, 2000);
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
        <title>Hi stranger, sign-up 🙈</title>
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
              Sign up stranger 👻
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm ">
              <Input
                label="Email Address"
                name="email"
                placeholder="Email Address"
                onChange={setEmail}
                type="email"
                required
              />
              <Input
                label="Password"
                name="password"
                placeholder="Password"
                onChange={setPassword}
                type="password"
                required
              />

              <Input
                label="User's github"
                name="username"
                placeholder="git user 🐈‍⬛"
                onChange={setUserName}
                type="text"
                required
              />
            </div>

            <div>
              <div className="group relative inline-flex w-full items-center">
                <input
                  className="pl-3  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:cursor-pointer"
                  type="submit"
                  value="Sign up"
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
