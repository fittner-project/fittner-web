import { CenterListResDto, TrainerResultDto } from "@/api/generated/models";
import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AssignNewTraineeValueStore {
  selectedCenter: CenterListResDto | null;
  setSelectedCenter: (center: CenterListResDto) => void;
  selectedTrainer: TrainerResultDto | null;
  setSelectedTrainer: (trainer: TrainerResultDto) => void;
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
      reset: () => set(() => ({ selectedCenter: null, selectedTrainer: null })),
    }),
    {
      name: storageKeys.assignNewTraineeValues,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAssignNewTraineeValueStore;
