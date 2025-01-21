import PATH from "@/router/path";
import useAuthStore from "@/store/auth";

export default function useAuthRouting() {
  const { isAuthenticated, signUpApprovalStatus } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;
    if (signUpApprovalStatus === "pending") {
      navigate(PATH.CENTER_LIST);
      return;
    }

    if (isAuthenticated) {
      navigate(PATH.HOME);
    }

    // if (!isAuthenticated) {
    //   navigate(PATH.SIGN_IN);
    // }
  }, [signUpApprovalStatus, isAuthenticated]);
}
