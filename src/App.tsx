import { Route, Routes } from "react-router-dom"
import { Home } from "./components/Home"
import { ParseExcel } from "./components/ParseExcel"

function App() {


  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/parse-excel" element={<ParseExcel/>}/>
    </Routes>
  )
}

export default App
