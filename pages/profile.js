/* This example requires Tailwind CSS v2.0+ */
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Profile() {
  const [authSession, setAuthSession] = useState(false);
  const [gitUser, setGitUser] = useState({});
  const [userName, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const userName = localStorage.getItem("userName");
    setAuthSession(auth);
    if (auth !== null) {
      setUsername(userName);
    }
  }, []);

  useEffect(() => {
    const url = "https://api.github.com/users/";
    const fetchUser = async () => {
      return await fetch(`${url}${userName}`)
        .then((res) => {
          res.json().then((data) => {
            return setGitUser(data);
          });
        })
        .catch((err) => console.error(err, "user"));
    };
    return userName.length > 0 ? fetchUser() : null;
  }, [userName]);

  useEffect(() => {
    if (authSession === null) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  });

  if (authSession === null) {
    return (
      <Layout auth={authSession} title={"profile"}>
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
    <Layout auth={authSession} title={"profile"}>
      <div className="max-w-7xl mx-auto my-16">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Applicant Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details and application.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {gitUser.name ?? (
                    <div className="animate-pulse w-[300px] h-2 bg-indigo-600 rounded"></div>
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {gitUser.location ?? (
                    <div className="animate-pulse w-[300px] h-2 bg-indigo-600 rounded"></div>
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {gitUser.email ?? (
                    <div className="animate-pulse w-[300px] h-2 bg-indigo-600 rounded"></div>
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">User</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {gitUser.login ?? (
                    <div className="animate-pulse w-[300px] h-2 bg-indigo-600 rounded"></div>
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {gitUser.bio ?? (
                    <div className="animate-pulse w-[300px] h-2 bg-indigo-600 rounded"></div>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Layout>
  );
}
