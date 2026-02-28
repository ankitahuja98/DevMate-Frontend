import googleLogo from "../Images/googleLogo.avif";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLoginApi } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store/store";

const SigninWithGoogle = () => {
  const dispatch = useDispatch<AppDispatch>();

  const responseGoogle = async (authResult: any) => {
    try {
      if (authResult?.code) {
        dispatch(googleLoginApi(authResult?.code));
      }
    } catch (error) {
      console.log("error while requesting to google Code:", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <button className="googleBtn" onClick={googleLogin}>
      <img src={googleLogo} alt="Google" className="w-8 h-4 sm:w-10 sm:h-5" />
      <span className="text-gray-700 font-medium">Sign in with Google</span>
    </button>
  );
};

export default SigninWithGoogle;
