function parseDate(){
    currentTime = Date.now()
    const yyyy = new Date(currentTime).getFullYear();
    const mm = new Date(currentTime).getMonth() + 1;
    const dd = new Date(currentTime).getDate();
    return `${mm}/${dd}/${yyyy}`;
}

module.exports = parseDate;