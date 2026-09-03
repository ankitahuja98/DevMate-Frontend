import googleLogo from "../Images/googleLogo.avif";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLoginApi } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store/store";

const SigninWithGoogle = ({
  label = "Continue with Google",
}: {
  label?: string;
}) => {
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
    <button
      type="button"
      className="au-btn au-btn-secondary"
      onClick={() => googleLogin()}
    >
      <img src={googleLogo} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
      {label}
    </button>
  );
};

export default SigninWithGoogle;
