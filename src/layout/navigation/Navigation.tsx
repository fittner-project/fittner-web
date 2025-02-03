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
  nav_home_selected,
  nav_calendar_selected,
  nav_registration_selected,
  nav_sign_selected,
  nav_my_selected,
} from "@/assets/assets";
import classNames from "classnames";
import { openBottomSheet } from "@/utils/bottomSheet";
import RegistrationBottomSheet from "@/pages/home/components/registration-bottom-sheet/RegistrationBottomSheet";

type NavigationItem = {
  id: number;
  name: string;
  icon: string;
  path: string;
  selectedIcon: string;
  onClick?: () => void;
};
const navigationItems: NavigationItem[] = [
  {
    id: 1,
    name: "홈",
    icon: nav_home,
    selectedIcon: nav_home_selected,
    path: PATH.HOME,
  },
  {
    id: 2,
    name: "나의수업",
    icon: nav_calendar,
    selectedIcon: nav_calendar_selected,
    path: "",
  },
  {
    id: 3,
    name: "등록",
    icon: nav_registration,
    selectedIcon: nav_registration_selected,
    path: "",
    onClick: () =>
      openBottomSheet({
        component: RegistrationBottomSheet,
      }),
  },
  {
    id: 4,
    name: "서명요청",
    icon: nav_sign,
    selectedIcon: nav_sign_selected,
    path: "",
  },
  {
    id: 5,
    name: "My",
    icon: nav_my,
    selectedIcon: nav_my_selected,
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
  const { pathname } = useLocation();
  const isSelected = pathname === item.path;

  const handleClickItem = () => {
    if (item.onClick) {
      item.onClick();
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className={styles.item} onClick={handleClickItem}>
      <div className={styles.ico}>
        <Image
          src={isSelected ? item.selectedIcon : item.icon}
          width={2.3}
          height={2.3}
        />
      </div>
      <div className={classNames(styles.name, isSelected && styles.selected)}>
        {item.name}
      </div>
    </div>
  );
};
