"use client";
import ReactFullpage from "@fullpage/react-fullpage";

export default function Home() {
  return (
    <ReactFullpage
      //fullpage options
      licenseKey={"YOUR_KEY_HERE"}
      scrollingSpeed={1000} /* Options here */
      credits={{
        enabled: true,
        label: "Made with fullpage.js",
        position: "right",
      }}
      render={({ state, fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            <div className="section">
              <p>Section 1 (welcome to fullpage.js)</p>
              <button onClick={() => fullpageApi.moveSectionDown()}>
                Click me to move down
              </button>
            </div>
            <div className="section">
              <p>Section 2</p>
            </div>
            <div className="section">
              <p>Section 3</p>
            </div>
            <div className="section">
              <p>Section 4</p>
            </div>
            <div className="section">
              <p>Section 5</p>
            </div>
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
}
