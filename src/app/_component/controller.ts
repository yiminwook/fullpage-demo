import { Dispatch, SetStateAction } from "react";
import { Option } from "./type";
import { deepCopy } from "../_lib/deepCopy";

export class Controller {
  initiallize = false;

  private state = {
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

  static getChildHeights(childrens: HTMLElement[]) {
    return childrens.map((child) => child.offsetTop);
  }

  init({ heights }: Partial<typeof this.state>) {
    if (this.initiallize) return;
    // 리액트가 마운트 되었을 때 실행
    this.initiallize = true;
    this.setState(() => ({
      heights,
    }));
  }

  reRender() {
    this.renderer((prev) => (prev > 10000 ? 0 : prev + 1));
  }

  setState(cb: (state: typeof this.state) => Partial<typeof this.state>) {
    const newState = cb(deepCopy(this.state));
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
    this.setState((state) => {
      if (state.page >= this.state.heights.length)
        return { page: this.state.heights.length };
      return { page: state.page + 1 };
    });
  }

  reSize(heights: number[]) {
    this.setState(() => {
      return { heights };
    });
  }

  getState() {
    return deepCopy(this.state);
  }

  getHeight() {
    const heights = this.state.heights;
    const idx = this.state.page - 1;
    console.log("heights", heights);
    console.log("idx", idx);
    return heights[idx] || heights.at(-1) || 0;
  }

  getTrasform() {
    const height = this.getHeight();
    return `translate3d(0, ${height}px, 0)`;
  }
}
