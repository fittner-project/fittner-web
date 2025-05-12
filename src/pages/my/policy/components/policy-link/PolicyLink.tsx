import Image from "@/components/image/Image";
import styles from "./PolicyLink.module.scss";
import { chevronDownGrey, chevronRightGrey } from "@/assets/assets";
import dayjs from "dayjs";
import { openBottomSheet } from "@/utils/bottomSheet";
import TermDateBottomSheet from "./term-date-bottom-sheet/TermDateBottomSheet";

interface PolicyLinkProps {
  title: string;
  date: string;
  to?: string;
  type: "main" | "notice-detail" | "term-detail" | "detail";
  onClick?: () => void;
}

export default function PolicyLink({
  title,
  date,
  to,
  type,
  onClick,
}: PolicyLinkProps) {
  const handleClickTermDate = () => {
    openBottomSheet({
      component: TermDateBottomSheet,
    });
  };

  return (
    <>
      {type.includes("detail") && (
        <div className={styles.detail_container}>
          <section className={styles.left_section}>
            <p className={styles.title}>{title}</p>
            <div className={styles.date_container}>
              <p
                onClick={() => {
                  if (type === "term-detail") {
                    handleClickTermDate();
                  }
                }}
                className={styles.date}
              >
                {dayjs(date).format("YYYY.MM.DD")}
              </p>
              {type === "term-detail" && (
                <Image
                  src={chevronDownGrey}
                  alt="chevronDownGrey"
                  width={2}
                  height={2}
                />
              )}
            </div>
          </section>
        </div>
      )}

      {type === "main" && (
        <Link to={to ?? ""} className={styles.main_container} onClick={onClick}>
          <section className={styles.left_section}>
            <p className={styles.title}>{title}</p>
            <p className={styles.date}>{dayjs(date).format("YYYY.MM.DD")}</p>
          </section>

          <Image
            src={chevronRightGrey}
            alt="chevronRightGrey"
            width={2.8}
            height={2.8}
          />
        </Link>
      )}
    </>
  );
}
