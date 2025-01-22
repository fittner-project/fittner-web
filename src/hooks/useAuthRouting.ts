import { useGetUserCommonStatusChk } from "@/api/generated/공통/공통";
import { storageKeys } from "@/constants/storageKeys";
import PATH from "@/router/path";
import useAuthStore, { ApprovalStatus } from "@/store/auth";
import { storage } from "@/utils/storage";

export default function useAuthRouting() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const trainerEmail = storage.get<string>({ key: storageKeys.trainerEmail });

  const { data: userCommonStatusChkData } = useGetUserCommonStatusChk(
    {
      trainerEmail: trainerEmail ?? "",
    },
    {
      query: {
        enabled: isAuthenticated === false && !!trainerEmail,
      },
    }
  );

  const trainerStatus = userCommonStatusChkData?.result
    ?.trainerStatus as ApprovalStatus;

  useEffect(() => {
    if (location.pathname !== PATH.ROOT || !trainerStatus) return;
    if (trainerStatus === "INACTIVE") {
      navigate(PATH.CENTER_LIST);
      return;
    }

    if (trainerStatus === "ACTIVE") {
      navigate(PATH.SIGN_IN);
      return;
    }

    if (isAuthenticated) {
      navigate(PATH.HOME);
      return;
    }

    if (!isAuthenticated) {
      navigate(PATH.SIGN_IN);
      return;
    }
  }, [trainerStatus, isAuthenticated]);
}
