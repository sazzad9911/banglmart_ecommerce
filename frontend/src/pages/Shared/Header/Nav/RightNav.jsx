import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #5dade2;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 200px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    z-index: 999;
  }
`;

const RightNav = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Ul open={open}>
      <div className="p-2">
        <NavLink
          onClick={handleClose}
          className="text-CardColor hover:text-TextColor"
          to="/"
        >
          <h3 className="p-2">{t("header.home")}</h3>
        </NavLink>
        <NavLink
          onClick={handleClose}
          className="text-CardColor hover:text-TextColor"
          to="/flash-sell"
        >
          <h3 className="p-2">{t("header.flash")}</h3>
        </NavLink>
        <NavLink
          onClick={handleClose}
          className="text-CardColor hover:text-TextColor"
          to="bargaining-products"
        >
          <h3 className="p-2">{t("header.bargaining")}</h3>
        </NavLink>
        <NavLink
          onClick={handleClose}
          className="text-CardColor hover:text-TextColor"
          to="/all-seller"
        >
          <h3 className="p-2">{t("header.seller")}</h3>
        </NavLink>
        {/* <Link className="text-CardColor hover:text-TextColor" to="/">
        <h3 className="p-2">Affiliating</h3>
      </Link> */}
        <NavLink
          onClick={handleClose}
          className="text-CardColor hover:text-TextColor"
          to="/category"
        >
          <h3 className="p-2">{t("header.category")}</h3>
        </NavLink>
        <NavLink
          onClick={handleClose}
          className="text-CardColor hover:text-TextColor"
          to="/brands"
        >
          <h3 className="p-2">{t("header.brand")}</h3>
        </NavLink>
        <NavLink
          onClick={handleClose}
          className="text-CardColor hover:text-TextColor"
          to="/track-order"
        >
          <h3 className="p-2">{t("header.track")}</h3>
        </NavLink>
        <NavLink
          onClick={handleClose}
          className="text-CardColor hover:text-TextColor"
          to="/support"
        >
          <h3 className="p-2">{t("header.support")}</h3>
        </NavLink>
      </div>
    </Ul>
  );
};

export default RightNav;
