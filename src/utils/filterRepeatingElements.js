// Check if the results from the newer GET request is already present in the results of the earlier GET request
// Comparing objject to object is unreliable. Have to compare IDs

const filterRepeatingElements = (existingArr=[], appendingArr) => {
    let existingIds = [];
    let filteredData = [];

    if (existingArr.length > 0) {
        existingIds = existingArr.map((element) => element.data.id);
        filteredData = appendingArr.filter((element) => {
            if (!existingIds.includes(element.data.id)) {
                return element;
            } 
        })
    } else {
        filteredData = appendingArr
    }

    return filteredData
}

export default filterRepeatingElements;