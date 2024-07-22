export function deepCopy<T>(obj: T): T {
  // 원시 타입 (Primitive types)은 그대로 반환합니다.
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 배열인 경우, 배열의 각 요소를 깊은 복사합니다.
  if (Array.isArray(obj)) {
    return obj.map((el) => deepCopy(el)) as any as T;
  }

  // 객체인 경우, 객체의 각 속성을 깊은 복사합니다.
  const copy: Record<string, any> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }
  return copy as T;
}

const obj = {
  a: 1,
  b: {
    c: 2,
  },
};

const t = deepCopy(obj);
