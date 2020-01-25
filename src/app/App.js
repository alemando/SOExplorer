//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

//Fontawesome
import "@fortawesome/fontawesome-free/css/fontawesome.min.css"

import { BrowserRouter as Router, Route} from "react-router-dom";

import Index from "./components/index.component";
import React from 'react';



export default function App() {
  return (
    <Router>
      <Route path="/" exact component={Index} />
    </Router>
  );
}

