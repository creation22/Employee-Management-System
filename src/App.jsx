import React, { useContext } from 'react'
import Login from './components/Auth/login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { useEffect , useState } from 'react'
import { getLocalStorage, setLocalStorage } from './utils/localStorage'
import { AuthContext } from './context/AuthProvider'
const App = () => {
   useEffect(()=> {
    setLocalStorage()
    getLocalStorage()
   },[])
  const [user,setUser] = useState(null)
  const authdata = useContext(AuthContext)
    
    
    
  const handlelogin = (email , password) => {
    if(email == 'admin@me.com' && password == "1234"){
      setUser('admin')
      
    }
    else if(authdata && authdata.userData.employees.find((e)=> email == e.email && password == e.password)){
      setUser('employee')

    }
    else{
      alert('invalid credentials')
    }
    
  }



  return (
    <>
    {!user ? <Login handlelogin= {handlelogin}/> : ''}
    {user == 'admin' ? <AdminDashboard/> : <EmployeeDashboard/>}
    </>
  )
}

export default App
