import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import ReceiveItem from './pages/receiveItem/ReceiveItem'
import Permissions from './pages/permissions/Permissions'
import ProviderModal from './components/modal/Provider'
import ItemModal from './components/modal/Item'
import StonepitModal from './components/modal/Stonepit'
import EmployeeItems from './pages/employee/employeeItems'
import EmployeeReceivePermission from './pages/employee/employeeReceivePermission'
import EmployeeExchangePermission from './pages/employee/employeeExchangePermission'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SuccessModal from './components/modal/success'


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/inventory/items" element={<EmployeeItems />} />
          <Route path="/inventory/receive-permissions" element={<EmployeeReceivePermission />} />
          <Route path="/inventory/exchange-permissions" element={<EmployeeExchangePermission />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SuccessModal />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
