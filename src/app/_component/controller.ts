import { Dispatch, SetStateAction } from "react";
import { Option } from "./type";
import { deepCopy } from "../_lib/deepCopy";

export class Controller {
  initiallize = false;
  childrens: HTMLElement[] = [];

  private state = {
    startHeight: 0,
    durationTime: 1000,
    page: 1,
    heights: [] as number[],
  };

  constructor(
    private renderer: Dispatch<SetStateAction<number>>,
    option?: Option
  ) {
    this.reSize = this.reSize.bind(this);
  }

  static getStartHeight(topEl: HTMLElement | undefined | null) {
    if (!topEl) return 0;
    return Math.floor(topEl.getBoundingClientRect().top);
  }

  static caluculateHeight(childrens: HTMLElement[]) {
    return childrens.reduce<number[]>((acc, curr, i, arr) => {
      if (i === 0) return [0];
      const prev = acc[i - 1];
      const next = prev + curr.offsetHeight;
      return [...acc, next];
    }, []);
  }

  init({ childrens }: { childrens: HTMLElement[] }) {
    if (this.initiallize) return;

    const heights = Controller.caluculateHeight(childrens);
    const startHeight = Controller.getStartHeight(childrens[0]);

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // 리액트가 마운트 되었을 때 실행
    this.initiallize = true;
    this.childrens = childrens;
    this.setState(() => ({
      heights,
      startHeight,
    }));
  }

  reRender() {
    this.renderer((prev) => (prev > 10000 ? 0 : prev + 1));
  }

  getState() {
    return deepCopy(this.state);
  }

  setState(cb: (state: typeof this.state) => Partial<typeof this.state>) {
    const newState = cb(this.getState());
    this.state = { ...this.state, ...newState };
    this.reRender();
  }

  prevPage() {
    this.setState((state) => {
      if (state.page <= 1) return { page: 1 };
      return { page: state.page - 1 };
    });
  }

  nextPage() {
    // console.log("test", window.screenY, this.state.startHeight);
    // if (window.scrollY < this.state.startHeight) {
    //   return window.scrollTo({
    //     top: this.state.startHeight,
    //     left: 0,
    //     behavior: "smooth",
    //   });
    // }

    this.setState((state) => {
      if (state.page >= this.state.heights.length)
        return { page: this.state.heights.length };
      return { page: state.page + 1 };
    });
  }

  reSize(childrens: HTMLElement[]) {
    const heights = Controller.caluculateHeight(childrens);
    const startHeight = Controller.getStartHeight(childrens[0]);

    this.setState(() => {
      return {
        heights,
        startHeight,
      };
    });
  }

  getHeight() {
    const heights = this.state.heights;
    const idx = this.state.page - 1;

    return heights[idx] || 0;
  }

  getTrasform() {
    const height = this.getHeight() * -1;
    return `translate3d(0, ${height}px, 0)`;
  }
}
