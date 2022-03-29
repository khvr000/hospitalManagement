export const getFormattedStringFromStringList = (list) => {
    if (!Array.isArray(list)) {
        return list;
    }
    const lengthOfList = list.length;
    let outputString = '';
    for (let i = 0; i < lengthOfList; i ++) {
        if (i === 0) {
            outputString += list[i];
        } else if (i > 0 && i === lengthOfList - 1) {
            outputString += ` and ${list[i]}`;
        } else {
            outputString += `, ${list[i]}`;
        }
    }
    return outputString;
};
