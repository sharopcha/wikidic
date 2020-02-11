import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

export default function Login(props) {
  const authContext = useContext(AuthContext);
  const { login, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/admin");
    }

    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      console.log("Fill all the fields");
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <div className="text-center container mt-4" style={{ width: 500 }}>
      <form>
        <div className="form-group">
          <label>Email address</label>
          <input
            onChange={onChange}
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={onChange}
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button onClick={onSubmit} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
