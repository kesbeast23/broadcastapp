import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

function Hero({}) {
  const router = useRouter();

  return (
    <section className="relative">
      <Head>
        <title>Log in | FunOlympics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-[calc(100vh-72px)]">
        {/* <Image
          src="/images/hero-background.webp"
          layout="fill"
          objectFit="cover"
        /> */}
      </div>
      <div className="flex justify-center items-center">
        <div className="absolute flex flex-col space-y-3 top-1/4 w-full justify-center items-center max-w-screen-sm mx-auto p-8 -mt-16">
          <Image
            src="/images/sports1.png"
            width="600"
            height="150"
            objectFit="contain"
          />
          <button className="bg-blue-600 uppercase text-xl tracking-wide font-extrabold py-4 px-6 w-full rounded hover:bg-[#0c3a60]" onClick={() => router.push("/register")}>
           Register
          </button>
          <p className="text-xs text-center ">
            Exclusive access to the FunOlympics of 2022
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
