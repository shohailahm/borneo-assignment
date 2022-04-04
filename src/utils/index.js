import { CognitoUserPool } from "amazon-cognito-identity-js";

export const getPoolData = () => {
  const poolData = {
    UserPoolId: "us-east-2_0zFL6Y5De", // Your user pool id here
    ClientId: "7f3fhnuqttfogg3ouorh96dl1r",
  };
  var userPool = new CognitoUserPool(poolData);
  return userPool;
};

export const groupByExpense = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = {};
      acc[key] = { value: Number(obj.expense), name: key };
      return acc;
    }

    acc[key] = {
      name: key,
      value: Number(obj.expense) + Number(acc[key].value),
    };
    return acc;
  }, {});
};
