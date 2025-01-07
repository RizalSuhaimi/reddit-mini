// Check if the results from the newer GET request is already present in the results of the earlier GET request
// Comparing objject to object is unreliable. Have to compare IDs

const filterRepeatingElements = (existingArr=[], appendingArr) => {
    let existingIds = [];
    let filteredData = [];

    if (existingArr.length > 0) {
        existingIds = existingArr.map((element) => element.data.id);
        filteredData = appendingArr.filter((element) => {
            return !existingIds.includes(element.data.id) // If true is returned, the element will be included in the filteredData, and if false is returned, it will be excluded.
        })
    } else {
        filteredData = appendingArr
    }

    return filteredData
}

export default filterRepeatingElements;