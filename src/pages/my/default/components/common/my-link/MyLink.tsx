import { Link as RouterLink } from "react-router-dom";
import styles from "./MyLink.module.scss";
import Image from "@/components/image/Image";
import { chevronRightGrey } from "@/assets/assets";

interface MyLinkProps {
  to: string;
  title: string;
}

export default function MyLink({ to, title }: MyLinkProps) {
  return (
    <RouterLink to={to} className={styles.link}>
      <p className={styles.title}>{title}</p>
      <Image src={chevronRightGrey} alt="chevronRightGrey" />
    </RouterLink>
  );
}
