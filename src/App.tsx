import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { Listdetails } from "./views/ListDetails";
import { PageNotFound } from "./views/PageNotFound";
// import DragContainer from "./components/externalCode/DragContainer";
// import CardContainer from "./components/CardContainer";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Listdetails />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
          {/* <Listdetails /> */}
          {/* <CardContainer /> */}
          {/* <DragContainer></DragContainer> */}
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
