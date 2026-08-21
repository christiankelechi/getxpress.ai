import { useEffect, useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { Button, Spinner, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../hooks/storage/userStore";

const GoogleAuth = ({ loadingMessage }) => {
  const [user, setUserToken] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate(); // <== ✅ Add this
  const { setUser, setAccessToken } = useUserStore((state) => state)


  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUserToken(codeResponse),
    onError: (error) => console.error("Login Failed:", error),
  });

  useEffect(() => {
    if (!user?.access_token) return;

    const fetchAndPostUserDetails = async () => {
      setLoading(true);
      try {
        // Fetch user profile from Google
        const profileRes = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        );

        const profile = profileRes.data;

        // Post user data to your backend
        const backendRes = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth/google/login/`,
          {
            social_user_id:profile?.id,
            email: profile?.email,
            name: profile.name,
            profile_image: profile?.picture,
          }
        );

        toast({
          title: "Login Successful",
          description: backendRes?.data?.message || "Welcome!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });

        // Save user data locally
        setUser(backendRes.data?.data);
     

         // ✅ Redirect after success
        navigate("/dashboard"); // Change this to your target route

        // Optional redirect
        // window.location.href = "/dashboard";

      } catch (error) {
        // console.error("Google Auth Error:", error);
        toast({
          title: "Login Failed",
          description:`${error?.response?.data?.error_message }`,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAndPostUserDetails();
  }, [user,toast]);

  return (
    <Button
      leftIcon={loading ? <Spinner size="sm" /> : <FcGoogle />}
      borderRadius="8px"
      onClick={login}
      isLoading={loading}
      loadingText= {loadingMessage}
      border="1px solid rgba(158, 158, 158, 0.20)"
    >
      Continue with Google
    </Button>
  );
};

export default GoogleAuth;
