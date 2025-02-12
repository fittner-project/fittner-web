import Image from "@/components/image/Image";
import styles from "./PolicyLink.module.scss";
import { chevronRightGrey } from "@/assets/assets";
import dayjs from "dayjs";

interface PolicyLinkProps {
  title: string;
  date: string;
  to: string;
  type: "main" | "detail";
}

export default function PolicyLink({ title, date, to, type }: PolicyLinkProps) {
  return (
    <>
      {type === "detail" && (
        <div className={styles.detail_container}>
          <section className={styles.left_section}>
            <p className={styles.title}>{title}</p>
            <p className={styles.date}>{dayjs(date).format("YYYY.MM.DD")}</p>
          </section>
        </div>
      )}

      {type === "main" && (
        <Link to={to} className={styles.main_container}>
          <section className={styles.left_section}>
            <p className={styles.title}>{title}</p>
            <p className={styles.date}>{dayjs(date).format("YYYY.MM.DD")}</p>
          </section>
          {type === "main" && (
            <Image
              src={chevronRightGrey}
              alt="chevronRightGrey"
              width={2.8}
              height={2.8}
            />
          )}
        </Link>
      )}
    </>
  );
}
