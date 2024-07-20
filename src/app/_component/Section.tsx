import { PropsWithChildren } from "react";

export default function Section({ children }: PropsWithChildren) {
  return <section className="bg-red-300 h-[100vh]">{children}</section>;
}
