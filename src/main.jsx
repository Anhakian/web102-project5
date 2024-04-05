import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx"
import DetailView from "./routes/DetailView";
import ChartView from "./routes/ChartView";
import NotFound from "./routes/NotFound";
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index={true} path="/" element={<App />} />
        <Route index={false} path="/dayDetail/:datetime" element={<DetailView />} />
        <Route index={false} path="/data" element={<ChartView />} />
        <Route index={false} path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
