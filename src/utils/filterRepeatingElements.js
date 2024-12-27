// Check if the results from the newer GET request is already present in the results of the earlier GET request
// Comparing objject to object is unreliable. Have to compare IDs
let existingIds = [];
let filteredData = [];
const filterRepeatingElements = (existingArr=[], appendingArr) => {
    if (existingArr.length > 0) {
        existingIds = existingArr.map((post) => post.data.id);
        filteredData = data.children.filter((post) => {
            if (!existingIds.includes(post.data.id)) {
                return post;
            }
        })
    } else {
        filteredData = data.children
    }
}

export default filterRepeatingElements;