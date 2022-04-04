import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Input";
import Button from "./../Button";
import { Auth } from "aws-amplify";
import { UserContext } from "./../../Context/userContext";

export const classes = {
  pageBody: "h-screen flex bg-gray-bg1",
  formContainer:
    "w-full max-w-md    m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16",
  formHeading: "text-2xl  font-medium text-primary mt-4 mb-12 text-center",
  btnContainer: "flex justify-center items-center mt-6",
};

const Login = () => {
  const Context = useContext(UserContext);
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let username = e.target.elements[0]?.value;
    let password = e.target.elements[1]?.value;

    try {
      const userObject = await Auth.signIn(username, password);
      if (userObject.challengeName) {
        // Auth challenges are pending prior to token issuance
        this.setState({ userObject, stage: 1 });
      } else {
        const session = await Auth.currentSession();
        localStorage.setItem("token", session.getIdToken().getJwtToken());
        localStorage.setItem("user", JSON.stringify(userObject));
        Context.setUser(userObject);
        navigate("/");
      }
    } catch (err) {
      alert(err.message);
      console.error("Auth.signIn(): ", err);
    }
  };

  return (
    <div className={classes.pageBody}>
      <div className={classes.formContainer}>
        <h1 className={classes.formHeading}>Log in to your account 🔐</h1>

        <form onSubmit={handleFormSubmit}>
          <Input
            id="username"
            label="Username"
            type="username"
            placeholder="Your username"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Your Password"
          />

          <div className={classes.btnContainer}>
            <Button type="submit">Continue with Email</Button>
          </div>
          <Link to="/signup">Sign-Up</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
