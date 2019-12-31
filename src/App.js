import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from "./components/navbar";

function App() {
  return (
      <BrowserRouter>
          <Switch>

              <Route path={'/'}>
                  <Navbar/>
              </Route>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
