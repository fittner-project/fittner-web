import PATH from "@/router/path";
import styles from "./Navigation.module.scss";
import { useNavigate } from "react-router-dom";

type NavigationItem = {
  id: number;
  name: string;
  icon: string;
  path: string;
};
const navigationItems: NavigationItem[] = [
  {
    id: 1,
    name: "홈",
    icon: "",
    path: PATH.HOME,
  },
  {
    id: 2,
    name: "나의수업",
    icon: "",
    path: "",
  },
  {
    id: 3,
    name: "등록",
    icon: "",
    path: "",
  },
  {
    id: 4,
    name: "서명요청",
    icon: "",
    path: "",
  },
  {
    id: 5,
    name: "My",
    icon: "",
    path: PATH.MY.DEFAULT,
  },
];
export default function Navigation() {
  return (
    <div className={styles.container}>
      {navigationItems.map((item) => (
        <NavigationItem key={item.id} item={item} />
      ))}
    </div>
  );
}

const NavigationItem = ({ item }: { item: NavigationItem }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.item} onClick={() => navigate(item.path)}>
      <div className={styles.ico}>{/* <Image src={item.icon} /> */}</div>
      <div className={styles.name}>{item.name}</div>
    </div>
  );
};
