import styles from "./Navigation.module.scss";

type NavigationItem = {
  id: number;
  name: string;
  icon: string;
};
const navigationItems: NavigationItem[] = [
  {
    id: 1,
    name: "홈",
    icon: "",
  },
  {
    id: 2,
    name: "나의수업",
    icon: "",
  },
  {
    id: 3,
    name: "등록",
    icon: "",
  },
  {
    id: 4,
    name: "서명요청",
    icon: "",
  },
  {
    id: 5,
    name: "My",
    icon: "",
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
  return (
    <div className={styles.item}>
      <div className={styles.ico}>{/* <Image src={item.icon} /> */}</div>
      <div className={styles.name}>{item.name}</div>
    </div>
  );
};
