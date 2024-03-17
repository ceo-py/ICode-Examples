function timeTimeDifference(createTimeDB) {
    const creationTime = new Date(createTimeDB);
    const currentTime = Date.now();
    const elapsedTime = currentTime - creationTime;

    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(days / 365);

    if (years) return `${years} ${years === 1? 'year': 'years'}`
    if (months) return `${months} ${months === 1? 'month': 'months'}`
    if (weeks) return `${weeks} ${weeks === 1? 'week': 'weeks'}`
    if (days) return `${days} ${days === 1? 'day': 'days'}`
    if (hours) return `${hours} ${hours === 1? 'hour': 'hours'}`
    if (minutes) return `${minutes} ${minutes === 1? 'minute': 'minutes'}`
    if (seconds) return `${seconds} ${seconds === 1? 'second': 'seconds'}`
};

module.exports = timeTimeDifference;