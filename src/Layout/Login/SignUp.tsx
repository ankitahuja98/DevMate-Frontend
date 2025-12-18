import React, { useState, type SetStateAction } from "react";
import TextField from "@mui/material/TextField";
import googleLogo from "../../Images/googleLogo.png";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/actions/authAction";
import type { AppDispatch } from "../../redux/store/store";
import {
  validateSignup,
  type signupdata,
} from "../../utils/validations/loginValidation";
import { Box } from "@mui/material";

const SignUp = ({
  setIsSignIn,
}: {
  setIsSignIn: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [singupform, setSignupform] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErros] = useState<signupdata>({});

  const dispatch = useDispatch<AppDispatch>();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault(); // ⛔ stop page refresh

    const isErrors = validateSignup(singupform);
    console.log("isErrors", isErrors);
    console.log("errors", errors);

    setErros(isErrors);
    if (Object.keys(isErrors).length !== 0) {
      return;
    } else {
      dispatch(signup(singupform))
        .unwrap()
        .then(() => {
          alert("user created");
          setIsSignIn((prev: boolean) => !prev);
          setSignupform({
            name: "",
            email: "",
            password: "",
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setSignupform((prev) => ({ ...prev, [name]: value }));
  };

  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    return <p style={{ fontSize: "11px", color: "red" }}>{error}</p>;
  };

  return (
    <div className="SignupPage p-10 flex flex-col justify-center">
      <form className="flex flex-col gap-5">
        <Box>
          <TextField
            required
            fullWidth
            label="Full Name"
            variant="outlined"
            size="small"
            name="name"
            value={singupform.name}
            onChange={handleInputChange}
          />
          <ErrorMessage error={errors.name} />
        </Box>
        <Box>
          <TextField
            required
            fullWidth
            label="Email"
            variant="outlined"
            size="small"
            name="email"
            value={singupform.email}
            onChange={handleInputChange}
          />
          <ErrorMessage error={errors.email} />
        </Box>
        <Box>
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            size="small"
            name="password"
            value={singupform.password}
            onChange={handleInputChange}
          />
          <ErrorMessage error={errors.password} />
        </Box>

        <button type="submit" className="signinBtn" onClick={handleSignup}>
          Sign up
        </button>
      </form>

      {/* OR Divider */}
      <div className="flex items-center my-6">
        <span className="flex-grow h-px bg-gray-300"></span>
        <span className="px-3 text-gray-500 text-sm">or</span>
        <span className="flex-grow h-px bg-gray-300"></span>
      </div>

      {/* Google Sign-up */}
      <button className="googleBtn">
        <img src={googleLogo} alt="Google" className="w-10 h-5" />
        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </button>
    </div>
  );
};

export default SignUp;
