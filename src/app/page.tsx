"use client";
import Provider from "./_component/Provider";
import Section from "./_component/Section";

export default function Home() {
  return (
    <Provider className="bg-white text-w-400">
      <section className="bg-red-300 h-[100vh]">
        <span>1</span>
        <button>이동</button>
      </section>
      <section className="bg-green-300 h-[100vh]">
        <span>2</span>
        <button>이동</button>
      </section>
      <section className="bg-yellow-300 h-[100vh]">
        <span>3</span>
        <button>이동</button>
      </section>
      <section className="bg-gray-300 h-[100vh]">
        <span>4</span>
        <button>이동</button>
      </section>
      <Section />
    </Provider>
  );
}
