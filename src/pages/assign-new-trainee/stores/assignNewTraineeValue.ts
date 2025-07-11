import { CenterListResDto, TrainerResultDto } from "@/api/generated/models";
import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AssignNewTraineeValueStore {
  selectedCenter: CenterListResDto | null;
  setSelectedCenter: (center: CenterListResDto) => void;
  selectedTrainer: TrainerResultDto | null;
  setSelectedTrainer: (trainer: TrainerResultDto) => void;
  originalTicketId: string;
  setOriginalTicketId: (ticketId: string) => void;
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
      originalTicketId: "",
      setOriginalTicketId: (ticketId: string) =>
        set(() => ({ originalTicketId: ticketId })),
      reset: () =>
        set(() => ({
          selectedCenter: null,
          selectedTrainer: null,
          originalTicketId: "",
        })),
    }),
    {
      name: storageKeys.assignNewTraineeValues,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAssignNewTraineeValueStore;
