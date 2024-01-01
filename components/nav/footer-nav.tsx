import Nav from "./nav";

const FooterNav = async () => {
  const navItems = [
    { text: "Privacy Policy", link: "/privacy-policy" },
    { text: "Terms & Conditions", link: "/tnc" },
    {
      text: "Refund/Cancelation Policy",
      link: "/refund-cancel-policy",
    },
  ];

  return <Nav items={navItems} className="text-sm" />;
};

export default FooterNav;
