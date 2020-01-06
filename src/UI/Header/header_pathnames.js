const headerPathnames = {
  0: {
    path: "/",
    name: "Dashboard"
  },
  1: {
    path: "/transactions",
    name: "My Transactions"
  },
  2: {
    path: "/charts",
    name: "Charts"
  },
  3: {
    path: "/settings",
    name: "Settings"
  },
  4: {
    path: "/about",
    name: "About the Project"
  },
  5: {
    path: "/github",
    name: "GitHub"
  },
  6: {
    path: "/contact",
    name: "Contact"
  }
};

const findPathname = pathName => {
  for (let key in headerPathnames) {
    if (headerPathnames[key]["path"] === pathName) {
      return headerPathnames[key]["name"];
    }
  }
};

export default findPathname;
