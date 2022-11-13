import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";

import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import WindowChat from "./views/WindowChat";
import { Listdetails } from "./views/ListDetails";
import { PageNotFound } from "./views/PageNotFound";
import { PostDetails } from "./views/PostDetails";
// import DragContainer from "./components/externalCode/DragContainer";
// import CardContainer from "./components/CardContainer";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <header>
            <Link to={"/window-chat"}> Window Chat</Link> 
          </header>
          <Routes>
            <Route path="/" element={<Listdetails />}></Route>
            <Route path="/postdetails/:id" element={<PostDetails />} />
            <Route path="/window-chat" element={<WindowChat />} />
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
