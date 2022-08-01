import Login from './pages/login/Login'
import EmployeeItems from './pages/employee/items'
import ReceivePermissionForm from './pages/employee/receivePermissionForm'
import ExchangePermissionForm from './pages/employee/exchangePermissionForm'
import ReceivePermission from './pages/employee/receivePermission'
import ExchangePermission from './pages/employee/exchangePermission'
import ReceivePermissionCart from './pages/employee/receivePermissionCart'
import ExchangePermissionCart from './pages/employee/exchangePermissionCart'
import Providers from './pages/employee/providers'
import Clients from './pages/employee/clients'
import ExchangePermissions from './pages/employee/exchangePermissions'
import ReceivePermissions from './pages/employee/receivePermissions'
import ItemCard from './pages/employee/itemCard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/inventory/items" element={<EmployeeItems />} />
          <Route path="/inventory/items/:itemId/item-card" element={<ItemCard />} />
          <Route path="/inventory/exchange-permissions" element={<ExchangePermissions />} />
          <Route path="/inventory/receive-permissions" element={<ReceivePermissions />} />
          <Route path="/inventory/receive-permissions/items-form" element={<ReceivePermissionForm />} />
          <Route path="/inventory/exchange-permissions/items-form" element={<ExchangePermissionForm />} />
          <Route path="/inventory/receive-permissions/cart" element={<ReceivePermissionCart />} />
          <Route path="/inventory/exchange-permissions/cart" element={<ExchangePermissionCart />} />
          <Route path="/inventory/receive-permissions/:permissionId" element={<ReceivePermission />} />
          <Route path="/inventory/exchange-permissions/:permissionId" element={<ExchangePermission />} />
          <Route path="/inventory/employee/providers" element={<Providers />} />
          <Route path="/inventory/employee/clients" element={<Clients />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
