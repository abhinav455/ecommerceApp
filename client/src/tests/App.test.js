import React from "react";
import ReactDOM from "react-dom";
import App from "../App"; 

it("renders without crashes", ()=> {
    const div = document.createElement("div");
    // const root = ReactDOM.createRoot(div);
    // root.render(
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>
    // );
    ReactDOM.render(<App/>, div);
     //modifies div element(like modifying index.html components if code were running in browser env,
       // but works in node env also mayb as react-test creates a env like that)
    ReactDOM.unmountComponentAtNode(div);

})