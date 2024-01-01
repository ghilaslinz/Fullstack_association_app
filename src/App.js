import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddFamily from "./families/AddFamily"; // Modifié
import EditFamily from "./families/EditFamily"; // Modifié
import ViewFamily from "./families/ViewFamily"; // Modifié

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addfamily" element={<AddFamily />} /> {/* Modifié */}
          <Route exact path="/editfamily/:id" element={<EditFamily />} /> {/* Modifié */}
          <Route exact path="/viewfamily/:id" element={<ViewFamily />} /> {/* Modifié */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
