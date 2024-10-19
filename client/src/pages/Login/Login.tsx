import { useState } from "react";
import { useAccountContext } from "../../context";
import { Base as Layout } from "@/layouts";
import "./Login.style.scss";
import {
  AccountService,
  AuthenticationService,
  AuthorizationService,
} from "../../services";
import { Account } from "@prisma/client";
import {signUp} from "service/src/api/routes/accounts.ts"
function Login() {
  const [message, setMessage] = useState(null);
  const { login } = useAccountContext();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //Update this
  const attemptLogin = async () => {
    try {
      
      const message = await login(email, password);
      
      setMessage(message);
      console.log(message)
    } catch (error) {

      console.log(error);
    
    }
  };

  return (
    <Layout>
      <div className="Login"></div>
      <div className="Login__panel">
        <div className="Login__panel__content">
          <img src="https://i.pinimg.com/736x/fb/d1/51/fbd151d987b9de1a348a1525bdab91b2.jpg"></img>
          <div className="Login__panel__content__message">
            <div>Welcome to the Carleton SSO Federated Portal.</div>
            <div>
              Enter your{" "}
              <a href="https://myone.carleton.ca" target="blank">
                MyCarletonOne
              </a>{" "}
              username and password.
            </div>
          </div>
          {message && <p>{message}</p>}
          <div className="Login__panel__content__input">
            <input type="text" onChange={(e)=> setEmail(e.target.value)} placeholder="MyCarletonOne username"></input>
            <input type="password" onChange={(e)=> setPassword(e.target.value)} placeholder="Password"></input>
          </div>
          <div className="Login__panel__content__checkbox">
            <input type="checkbox"></input>
            <label>Keep me signed in</label>
          </div>
          <button
            className="button"
            onClick={() => attemptLogin()}
          >
            <a >SIGN IN  </a>
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
