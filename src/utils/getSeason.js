const currentDate = new Date();
const currentMonthIndex = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();
const season_data = {
    1: 'winter',
    2: 'winter',
    3: 'spring',
    4: 'spring',
    5: 'spring',
    6: 'summer',
    7: 'summer',
    8: 'summer',
    9: 'fall',
    10: 'fall',
    11: 'fall',
    12: 'winter',
};
const season = season_data[currentMonthIndex];

export { year, season };
