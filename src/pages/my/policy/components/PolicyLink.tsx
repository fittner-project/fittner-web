import Image from "@/components/image/Image";
import styles from "./PolicyLink.module.scss";
import { chevronRight } from "@/assets/assets";
import dayjs from "dayjs";
interface PolicyLinkProps {
  title: string;
  date: string;
  to: string;
}

export default function PolicyLink({ title, date, to }: PolicyLinkProps) {
  return (
    <Link to={to} className={styles.container}>
      <section className={styles.left_section}>
        <p className={styles.title}>{title}</p>
        <p className={styles.date}>{dayjs(date).format("YYYY.MM.DD")}</p>
      </section>
      <Image src={chevronRight} alt="chevronRight" width={2.8} height={2.8} />
    </Link>
  );
}
