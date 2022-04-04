import "./App.css";
import { routes } from "./routes/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContextProvider, { UserContext } from "./Context/userContext";
import { Amplify } from "aws-amplify";
import ExpenseContextProvider from "./Context/expenseContext";
import { useContext } from "react";

Amplify.configure({
  region: "us-east-2",
  userPoolId: "us-east-2_0zFL6Y5De",
  userPoolWebClientId: "7f3fhnuqttfogg3ouorh96dl1r",
});

function App() {
  const context = useContext(UserContext);
  return (
    <BrowserRouter>
      <div className="App">
        <UserContextProvider>
          <ExpenseContextProvider>
            <UserContext.Consumer>
              {({ user }) => (
                <Routes>
                  {routes(user).map((route) => {
                    return <Route key={route.path} {...route} />;
                  })}
                </Routes>
              )}
            </UserContext.Consumer>
          </ExpenseContextProvider>
        </UserContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
