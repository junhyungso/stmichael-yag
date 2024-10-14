export const getNextSevenDayBirthdays = (profiles) => {
  const profilesWithUpcomingBirthdays = [];

  for (let profile of profiles) {
    const birthday = profile.birthday;
    const birthdayThisYear = '2024' + birthday.slice(4);
    if (isWithinNext7Days(birthdayThisYear)) {
      profilesWithUpcomingBirthdays.push(profile);
    }
  }

  return profilesWithUpcomingBirthdays;
};

const isWithinNext7Days = (date) => {
  const today = new Date();
  const targetDate = new Date(date);

  // Get the end of today (11:59:59 PM) and add 7 days
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 7);

  // Check if targetDate is between today and sevenDaysLater
  return targetDate >= today && targetDate <= sevenDaysLater;
};

export const getNextSevenDay = () => {};
