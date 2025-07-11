import { CenterListResDto, TrainerResultDto } from "@/api/generated/models";
import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AssignNewTraineeValueStore {
  selectedCenter: CenterListResDto | null;
  setSelectedCenter: (center: CenterListResDto) => void;
  selectedTrainer: TrainerResultDto | null;
  setSelectedTrainer: (trainer: TrainerResultDto) => void;
  // 추가된 form 값들
  memberName: string;
  memberPhone: string;
  memberGender: string;
  memberBirth: string;
  memberAddress: string;
  setFormValues: (
    values: Partial<{
      memberName: string;
      memberPhone: string;
      memberGender: string;
      memberBirth: string;
      memberAddress: string;
    }>
  ) => void;
  reset: () => void;
}

const useAssignNewTraineeValueStore = create(
  persist<AssignNewTraineeValueStore>(
    (set, _get) => ({
      selectedCenter: null,
      setSelectedCenter: (center: CenterListResDto) =>
        set(() => ({ selectedCenter: center })),
      selectedTrainer: null,
      setSelectedTrainer: (trainer: TrainerResultDto) =>
        set(() => ({ selectedTrainer: trainer })),
      // 추가된 form 값들 초기값
      memberName: "",
      memberPhone: "",
      memberGender: "",
      memberBirth: "",
      memberAddress: "",
      setFormValues: (values) => set((state) => ({ ...state, ...values })),
      reset: () =>
        set(() => ({
          selectedCenter: null,
          selectedTrainer: null,
          memberName: "",
          memberPhone: "",
          memberGender: "",
          memberBirth: "",
          memberAddress: "",
        })),
    }),
    {
      name: storageKeys.assignNewTraineeValues,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAssignNewTraineeValueStore;
