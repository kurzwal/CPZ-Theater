import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/home";
import Login from "./views/login";
import GameView from "./views/GameView";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/theater" element={<GameView />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
