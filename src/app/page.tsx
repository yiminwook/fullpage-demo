"use client";
import Provider from "./_component/Provider";

export default function Home() {
  return (
    <div>
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
        <footer>
          <span>footer</span>
          <button>이동</button>
        </footer>
      </Provider>
    </div>
  );
}
