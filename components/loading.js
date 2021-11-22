import Head from "next/head";

export default function () {
  return (
    <>
      <Head>
        <title>Loading stranger... 🙈</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
    </>
  );
}
