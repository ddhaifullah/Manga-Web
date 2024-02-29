import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Page/Home";
import NotFound from "./layout/404/404";
import News from "./components/Page/News";
import Detail from "./components/Page/Detail";
import Login from "./components/Login/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manga-detail/:id" element={<Detail />} />
        <Route path="/news" element={<News />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
