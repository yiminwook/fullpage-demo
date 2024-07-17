import { Dispatch, SetStateAction } from "react";
import { Option } from "./type";
import { deepCopy } from "../_lib/deepCopy";

export class Controller {
  durationTime = 1000;

  state = {
    page: 1,
    maxPage: 5,
  };

  constructor(
    private renderer: Dispatch<SetStateAction<number>>,
    option?: Option
  ) {}

  reRender() {
    this.renderer((prev) => prev + 1);
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
      if (state.page >= state.maxPage) return { page: state.maxPage };
      return { page: state.page + 1 };
    });
  }

  getState() {
    return deepCopy(this.state);
  }
}
