import { BrowserRouter } from "react-router-dom";
import './App.css';
import MainApp from "./MainApp";
import MainLayout from "../components/layout";

const App = () => (
  <BrowserRouter>
    <MainLayout>
      <MainApp />
    </MainLayout>
  </BrowserRouter>    
);

export default App;
