import { useGetUserCommonStatusChk } from "@/api/generated/공통/공통";
import { storageKeys } from "@/constants/storageKeys";
import PATH from "@/router/path";
import { ApprovalStatus } from "@/store/auth";
import { storage } from "@/utils/storage";

export default function useAuthRouting() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const approvalStatus = useAuthStore((state) => state.approvalStatus);
  const setApprovalStatus = useAuthStore((state) => state.setApprovalStatus);
  const navigate = useNavigate();
  const location = useLocation();
  const trainerEmail = storage.get<string>({ key: storageKeys.trainerEmail });

  const { data: userCommonStatusChkData } = useGetUserCommonStatusChk(
    {
      trainerEmail: trainerEmail ?? "",
    },
    {
      query: {
        enabled: location.pathname === PATH.ROOT && !!trainerEmail,
      },
    }
  );

  const trainerStatus = userCommonStatusChkData?.result
    ?.trainerStatus as ApprovalStatus;

  useEffect(() => {
    if (location.pathname !== PATH.ROOT) return;

    if (!trainerEmail) {
      navigate(PATH.SIGN_IN);
      return;
    }

    if (!trainerStatus) return;

    setApprovalStatus(trainerStatus);

    if (trainerStatus === "INACTIVE") {
      navigate(PATH.CENTER_LIST);
      return;
    }

    if (trainerStatus === "ACTIVE" && approvalStatus !== "ACTIVE") {
      navigate(PATH.SIGN_IN);
      return;
    }

    if (isAuthenticated) {
      navigate(PATH.HOME);
      return;
    }

    navigate(PATH.SIGN_IN);
  }, [trainerStatus, isAuthenticated, approvalStatus, trainerEmail]);
}
