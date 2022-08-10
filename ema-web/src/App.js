import React from 'react'
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
import EmployeesPage from './pages/employee/employees'
import EmployeeFormPage from './pages/employee/employeeForm'
import ProviderFormPage from './pages/employee/ProviderForm'
import ClientFormPage from './pages/employee/clientForm'
import ForgetPasswordForm from './pages/forget-password/forget-password'
import NewPasswordForm from './pages/new-password/new-password'
import UnauthorizedPage from './pages/authorization/unauthorized'
import NoItemPage from './pages/no-item/no-item'
import ItemsGraphs from './pages/employee/graphs/items-graph'
import ProviderGraph from './pages/employee/graphs/providers-graph'
import ClientGraph from './pages/employee/graphs/clients-graph'
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
          <Route path="/inventory/providers" element={<Providers />} />
          <Route path="/inventory/clients" element={<Clients />} />
          <Route path="/inventory/employees" element={<EmployeesPage />}/>
          <Route path="/inventory/employee-form" element={<EmployeeFormPage />} />
          <Route path="/inventory/provider-form" element={<ProviderFormPage />} />
          <Route path="/inventory/client-form" element={<ClientFormPage />} />
          <Route path="/inventory/items/stats" element={<ItemsGraphs />} />
          <Route  path="/inventory/providers/:providerId/stats" element={<ProviderGraph />} />
          <Route  path="/inventory/clients/:clientId/stats" element={<ClientGraph />} />
          <Route path="/forget-password" element={<ForgetPasswordForm />} />
          <Route path="/reset-password/:token" element={<NewPasswordForm />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route  path="/no-item" element={<NoItemPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
