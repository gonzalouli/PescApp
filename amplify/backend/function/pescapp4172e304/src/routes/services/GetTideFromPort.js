const axios = require("axios");
const moment = require("moment");

module.exports = async function GetTideFromPort(date, port) {
  try {
    //   const dateFormatted = date.replace("-", "");
    const aux = moment(date);
    const dateFormatted = moment([
      Number(aux.year().toString()),
      Number(aux.month().toString()),
      Number(aux.date()),
    ])
      .format("YYYYMMDD")
      .toString();

    console.log(port + " fecha:" + dateFormatted);

    const dayTide = await axios.get(
      `https://ideihm.covam.es/api-ihm/getmarea?request=gettide&id=${port}&format=json&date=${dateFormatted}`
    );
    console.log(dayTide);
    return dayTide.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
