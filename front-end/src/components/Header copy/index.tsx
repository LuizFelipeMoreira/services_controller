import './styles.scss';

export const Logo = () => {
  return (
    <div className="logo">
      <img src={'/logo.png'} alt="" height="28" />
      <h3 className="fw-bold">ServicePro</h3>
    </div>
  );
};
