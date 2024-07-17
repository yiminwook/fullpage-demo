import { useCtx } from "./context";

export default function Section() {
  const asd = useCtx();
  console.log("render");

  return (
    <section className="bg-red-300 h-[100vh]">
      <span>5</span>
      <button
        onClick={() => {
          asd.setPage(1);
        }}
      >
        이동
      </button>
    </section>
  );
}
