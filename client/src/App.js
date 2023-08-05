import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedPage from "./components/ProtectedPage";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import News from "./pages/News";
import Login from "./pages/Login";
import NewsInfo from "./pages/ProductInfo";
import Register from "./pages/Register";
import About from "./pages/About";
import Achievers from "./pages/Achiever";
import Business from "./pages/Business";
import Team from "./pages/Team";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Navbar>
                <Home />
              </Navbar>
            }
          />
          <Route
            path="/about"
            element={
              <Navbar>
                <About />
              </Navbar>
            }
          />
          <Route
            path="/news"
            element={
              <Navbar>
                <News />
              </Navbar>
            }
          />
          <Route
            path="/business"
            element={
              <Navbar>
                <Business />
              </Navbar>
            }
          />
          <Route
            path="/achievers"
            element={
              <Navbar>
                <Achievers />
              </Navbar>
            }
          />
          <Route
            path="/team"
            element={
              <Navbar>
                <Team />
              </Navbar>
            }
          />
          <Route path="/news/:id" element={<NewsInfo />} />

          <Route
            path="/admin"
            element={
              <ProtectedPage>
                <Admin />
              </ProtectedPage>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
