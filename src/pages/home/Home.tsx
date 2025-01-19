import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import styles from "./Home.module.scss";

function Home() {
  const navigate = useNavigate();
  const goAboutPage = () => {
    navigate("/about");
  };

  return <div className={styles.container}></div>;
}

export default Home;
