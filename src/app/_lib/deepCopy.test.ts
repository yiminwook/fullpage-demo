import { render, screen } from "@testing-library/react";
import { deepCopy } from "./deepCopy";
import "@testing-library/jest-dom";

describe("deepCopy function", () => {
  it("should not mutate the original object when the copy is modified", () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
      },
    };

    const copy = deepCopy(obj);
    copy.b.c = 3;

    expect(obj.b.c).toBe(2); // 원본 객체는 여전히 2여야 합니다.
    expect(copy.b.c).toBe(3); // 복사본은 수정된 값인 3이어야 합니다.
  });
});
