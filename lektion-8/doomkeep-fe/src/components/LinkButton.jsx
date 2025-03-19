import { Link } from "react-router-dom";
import styles from '../styles/LinkButton.module.css'

const LinkButton = ({ to, className, children, ...props }) => {
  return (
    <Link
      to={to}
      className={`${styles.linkButton} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkButton;