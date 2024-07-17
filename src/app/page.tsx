import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>데모 리스트</h1>
      <p>클릭하면 페이지 이동</p>
      <ul className="mt-[30px]">
        <li className="flex flex-col">
          <Link className="hover:text-red-300" href="/fullpage.js">
            fullpage.js
          </Link>
          <Link className="hover:text-red-300" href="/react-full-page">
            react-full-page
          </Link>
          <Link className="hover:text-red-300" href="/shinyoungjun">
            @shinyoungjun/react-fullpage
          </Link>
        </li>
      </ul>
    </div>
  );
}
