import { Route, Routes, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AdminMain from "./pages/AdminMain";
import Login from './pages/Login';
import Register from "./pages/Register";
import UserMain from "./pages/UserMain";

function App() {
  const token = localStorage.getItem("token");
  let user='';
   token ? user = jwt_decode(token):user=null;

   const userRole = () =>{
    let role = "";
    if(user && user.accountType === 'admin') role = "admin"
    
    if(user && user.accountType === 'manager') role = "manager"

    if(user && user.accountType === 'worker') role = "worker"

    return role;
  }


  return (
    <Routes>
		 {userRole() === "admin" &&
      <Route path="/" exact element={<AdminMain/>}/>}
      
      {userRole() === "worker" &&
       <Route path="/" exact element={user.status?<UserMain/>:<Register/>}
      />}
      {userRole() === "manager" &&
       <Route path="/" exact element={user.status?<UserMain/>:<Register/>}
      />}
			<Route path="/login" exact element={user ? <Navigate replace to="/"/>:<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
  );
}

export default App;
