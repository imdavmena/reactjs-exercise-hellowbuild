import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import Hero from "../components/Sections/Hero";
import ListRepositories from "../components/Sections/Repositories/List";

export default function Home() {
  const [authSession, setAuthSession] = useState(false);
  const [userName, setUsername] = useState("");
  const [gitUser, setGitUser] = useState({});
  const [gitRepositories, setGitRepositories] = useState([]);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const userName = localStorage.getItem("userName");

    setAuthSession(auth === "authenticated");
    setUsername(userName);
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
    const fetchRepo = async () => {
      return await fetch(`${url}${userName}/repos`)
        .then((res) => {
          res.json().then((repos) => {
            setGitRepositories(repos);
          });
        })
        .catch((err) => console.error(err, "repos"));
    };
    if (authSession) {
      fetchUser();
      fetchRepo();
    }
    return;
  }, [authSession]);

  useEffect(() => {});
  return (
    <Layout title={"Welcome to my page"} auth={authSession}>
      <Hero />
      <ListRepositories
        auth={authSession}
        user={gitUser}
        repos={gitRepositories}
      />
    </Layout>
  );
}
