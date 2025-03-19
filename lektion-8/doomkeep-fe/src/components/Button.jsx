import styles from '../styles/Button.module.css' 

const Button = ({ onClick, className, children, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
