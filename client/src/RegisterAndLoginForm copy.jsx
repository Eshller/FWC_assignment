import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "./UserContext.jsx";
import { Button, Stack } from "@mui/material";
import TextField from '@mui/material/TextField';
export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
  const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);
  async function handleSubmit(ev) {
    ev.preventDefault();
    const url = isLoginOrRegister === 'register' ? 'register' : 'login';
    const {data} = await axios.post(url, {username,password});
    setLoggedInUsername(username);
    setId(data.id);
  }
  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <Stack spacing={2}>
        <TextField
               id="outlined-basic"
               value={username}
               label="Username"
               variant="outlined"
               onChange={ev => setUsername(ev.target.value)}
               className="block w-full rounded-sm p-2 mb-2 border"
              />
              <TextField
                id="filled-password-input"
                label="Password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-sm p-2 mb-2 border"
                variant="outlined"
              />
            <Button type="submit" variant="contained" className="bg-blue-500 text-white block w-full rounded-sm p-2">
              {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
            </Button>
            <div className="text-center mt-2">
              {isLoginOrRegister === 'register' && (
                <div>
                  Already a member?
                  <button className="ml-1" onClick={() => setIsLoginOrRegister('login')}>
                    Login here
                  </button>
                </div>
              )}
              {isLoginOrRegister === 'login' && (
                <div>
                  Dont have an account?
                  <button className="ml-1" onClick={() => setIsLoginOrRegister('register')}>
                    Register
                  </button>
                </div>
              )}
            </div>
            
        </Stack>
      </form>
    </div>
  );
}