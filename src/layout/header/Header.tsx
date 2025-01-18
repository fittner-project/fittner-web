import styles from "./Header.module.scss";

interface HeaderProps {
  fallback: string | "none";
}

export default function Header({ fallback }: HeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (fallback === "none") navigate(-1);
    else navigate(fallback);
  };

  return <div className={styles.wrapper}>Header</div>;
}
