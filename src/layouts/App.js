import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from './Header'
import Navigation from './Navigation'
import Page from './Page'
import Footer from './Footer'

import "../styles/App.sass";

function App() {
  return (
    <Router>
        {<Header />}
        {<Navigation />}
      <main>
        {<Page />}
      </main>
        {<Footer />}
    </Router>
  );
}

export default App;
