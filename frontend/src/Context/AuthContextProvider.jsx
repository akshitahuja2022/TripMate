import { useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    destination: "",
    phoneNumber: "",
    age: "",
    travelType: "solo",
    startDate: "",
  });

  const [reviewData, setReviewData] = useState({
    name: "",
    city: "",
    travelType: "",
    description: "",
    tripDestination: "",
  });

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider
      value={{
        formData,
        setFormData,
        isLogin,
        setIsLogin,
        user,
        setUser,
        registerData,
        setRegisterData,
        reviewData,
        setReviewData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
