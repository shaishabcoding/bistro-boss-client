import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import usePublicClient from "../../../hooks/usePublicClient";
import { useNavigate } from "react-router-dom";
const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const publicClient = usePublicClient();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result);
      const userInfo = {
        email: result?.user?.email,
        name: result?.user?.displayName,
      };

      console.log(userInfo);

      publicClient.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };
  return (
    <div>
      <div className="divider">OR</div>
      <div>
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-primary mx-6 mb-4"
        >
          <FaGoogle />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
