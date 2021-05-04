import { useState } from "react";

import { Spinner } from "../../components";
import { firebase } from "../../config/";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = e => {
    e.preventDefault();

    setIsLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;

        console.log(user);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <h2 className="text-center">Login</h2>
      <hr />
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Alamat Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ minWidth: "150px" }}
            onClick={e => onSubmit(e)}
          >
            {isLoading && <Spinner />}
            {!isLoading && "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
