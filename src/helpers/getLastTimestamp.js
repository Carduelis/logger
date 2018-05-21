export default list => {
    const { timestamp } = list[list.length - 1];
    return timestamp;
};
