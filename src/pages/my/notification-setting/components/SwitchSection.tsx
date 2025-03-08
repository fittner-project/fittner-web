import Switch from "@/components/switch/Switch";
import styles from "./SwitchSection.module.scss";
import { PushSetResDto } from "@/api/generated/models";
import {
  getGetUserMyPagePushQueryKey,
  usePostUserMyPagePushSet,
} from "@/api/generated/마이페이지/마이페이지";
import { useQueryClient } from "@tanstack/react-query";

interface SwitchSectionProps {
  notification: PushSetResDto;
}

export default function SwitchSection({ notification }: SwitchSectionProps) {
  const queryClient = useQueryClient();
  const { mutate: changePush } = usePostUserMyPagePushSet({
    mutation: {
      onMutate: async (newData) => {
        await queryClient.cancelQueries({
          queryKey: getGetUserMyPagePushQueryKey(),
        });

        const previousData = queryClient.getQueryData(
          getGetUserMyPagePushQueryKey()
        );

        queryClient.setQueryData(
          getGetUserMyPagePushQueryKey(),
          (old: any) => ({
            ...old,
            result: old.result.map((item: PushSetResDto) =>
              item.pushKind === newData.data.pushKind
                ? { ...item, pushSetYn: newData.data.pushSetYn }
                : item
            ),
          })
        );

        return { previousData };
      },
      onError: (err, newData, context: any) => {
        queryClient.setQueryData(
          getGetUserMyPagePushQueryKey(),
          context.previousData
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: getGetUserMyPagePushQueryKey(),
        });
      },
    },
  });
  return (
    <div className={styles.container}>
      <p className={styles.title}>{notification.pushKindName}</p>
      <Switch
        isSwitchOn={notification.pushSetYn === "Y"}
        onChange={() => {
          changePush({
            data: {
              pushKind: notification.pushKind || "",
              pushSetYn: notification.pushSetYn === "Y" ? "N" : "Y",
            },
          });
        }}
      />
    </div>
  );
}
