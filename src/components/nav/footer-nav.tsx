import Nav from "./nav";

const FooterNav = async () => {
  const navItems = [
    { text: "Privacy Policy", link: "/page/privacy-policy" },
    { text: "Terms & Conditions", link: "/page/tnc" },
    {
      text: "Refund/Cancelation Policy",
      link: "/page/refund-and-cancellation-policy",
    },
  ];

  return <Nav items={navItems} className="text-sm" />;
};

export default FooterNav;
