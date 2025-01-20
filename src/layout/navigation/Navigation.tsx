import PATH from "@/router/path";
import styles from "./Navigation.module.scss";
import { useNavigate } from "react-router-dom";
import Image from "@/components/image/Image";

import {
  nav_home,
  nav_calendar,
  nav_registration,
  nav_sign,
  nav_my,
} from "@/assets/assets";

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
    icon: nav_home,
    path: PATH.HOME,
  },
  {
    id: 2,
    name: "나의수업",
    icon: nav_calendar,
    path: "",
  },
  {
    id: 3,
    name: "등록",
    icon: nav_registration,
    path: "",
  },
  {
    id: 4,
    name: "서명요청",
    icon: nav_sign,
    path: "",
  },
  {
    id: 5,
    name: "My",
    icon: nav_my,
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
      <div className={styles.ico}>
        <Image src={item.icon} width={2.3} height={2.3} />
      </div>
      <div className={styles.name}>{item.name}</div>
    </div>
  );
};
