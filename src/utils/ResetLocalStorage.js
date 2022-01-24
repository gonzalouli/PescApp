export const ResetLS = () => {
  if (JSON.parse(window.sessionStorage.getItem("newActivity")) === null) {
    const newActivity = {
      name: "",
      localization: {},
      tackle: [],
      catches: [],
      meteorology: [],
      date: {},
    };
    window.sessionStorage.setItem("newActivity", JSON.stringify(newActivity));
  }
  if (JSON.parse(window.sessionStorage.getItem("ubication")) === null) {
    const ubication = {};
    window.sessionStorage.setItem("ubication", JSON.stringify(ubication));
  }
  if (JSON.parse(window.sessionStorage.getItem("license")) === null) {
    const license = [];

    window.sessionStorage.setItem("license", JSON.stringify(license));
  }
};
