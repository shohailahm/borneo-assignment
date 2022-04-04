import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Input";
import Button from "./../Button";
import OtpInput from "react-otp-input";
import { Auth } from "aws-amplify";

const SignupComponent = () => {
  const [error, seterror] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setotp] = useState("");
  const [user, setuser] = useState("");
  let navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.elements[0]?.value;
    let username = e.target.elements[1]?.value;
    let password = e.target.elements[2]?.value;
    if (!email || !username || !password) return seterror(true);
    try {
      const params = {
        username: username,
        password: password,
        attributes: {
          email: email,
        },
        validationData: [],
      };

      const data = await Auth.signUp(params);
      console.log(data);
      setuser(data.user);
      setShowOtp(true);
    } catch (err) {
      if (err === "No userPool") {
        // User pool not defined in Amplify config file
        console.error("User Pool not defined");
        alert(
          "User Pool not defined. Amplify config must be updated with user pool config"
        );
      } else if (err.message === "User already exists") {
        // Setting state to allow user to proceed to enter verification code
        setShowOtp(true);
        setuser({ username });
      } else {
        if (err.message.indexOf("phone number format") >= 0) {
          err.message =
            "Invalid phone number format. Must include country code. Example: +14252345678";
        }
        alert(err.message);
        console.error("Exception from Auth.signUp: ", err);
        // this.setState({ stage: 0, email: '', password: '', confirm: '' });
      }
    }
  };

  useEffect(() => {
    if (error)
      setTimeout(() => {
        seterror(false);
      }, 2000);
  }, [error]);

  const handleChange = (e) => {
    setotp(e);
  };

  const validateUser = async () => {
    try {
      const data = await Auth.confirmSignUp(user.username, otp);
      console.log(data);
      // Go to the sign in page
      navigate("/");
    } catch (err) {
      alert(err.message);
      console.error("Exception from Auth.confirmSignUp: ", err);
    }
  };

  const classes = {
    pageBody: "h-screen flex bg-gray-bg1",
    formContainer:
      "w-full max-w-md    m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16",
    formHeading: "text-2xl  font-medium text-primary mt-4 mb-12 text-center",
    btnContainer: "flex justify-center items-center mt-6",
  };

  return (
    <div className={classes.pageBody}>
      <div className={classes.formContainer}>
        <h1 className={classes.formHeading}>Log in to your account 🔐</h1>
        {error && <p className="text-red">All feilds are required</p>}
        <form onSubmit={handleFormSubmit}>
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Your email"
            required
          />
          <Input
            id="username"
            label="username"
            type="username"
            placeholder="Your username"
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Your Password"
            required
          />
          <div className={classes.btnContainer}>
            <Button type="submit">Sign-up</Button>
          </div>
          <Link to="/">Login</Link>
        </form>
        {showOtp && (
          <div className="flex justify-center items-center flex-col">
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={6}
              separator={<span>-</span>}
              inputStyle={{
                border: "1px solid black",
                borderRadius: 2,
                width: 18,
              }}
              containerStyle={{ height: 40, margin: "4px 0" }}
            />
            <Button onClick={validateUser}>Validate</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupComponent;
