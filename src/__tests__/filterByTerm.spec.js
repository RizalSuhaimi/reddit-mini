import { filterByTerm } from "../components/filterByTerm";

describe("Filter function", () => {
    test("it should filter by a search term (link)", () => {
        const input = [
            { id: 1, url: "https://www.url1.dev" },
            { id: 2, url: "https://www.url2.dev" },
            { id: 3, url: "https://www.link3.dev" }
        ];

        const output = [
            { id:3 , url: "https://www.link3.dev" }
        ];

        expect(filterByTerm(input, "link")).toEqual(output);

        expect(filterByTerm(input, "LINK")).toEqual(output);
    });

    test("it should filter by a search term (url)", () => {
        const input = [
            { id: 1, url: "https://www.url1.dev" },
            { id: 2, url: "https://www.url2.dev" },
            { id: 3, url: "https://www.link3.dev" }
        ];

        const output = [
            { id: 1, url: "https://www.url1.dev" },
            { id: 2, url: "https://www.url2.dev" }
        ];

        expect(filterByTerm(input, "uRl")).toEqual(output);
    })

    test("it should alert if the search term is an empty string", () => {
        const input = [
            { id: 1, url: "https://www.url1.dev" },
            { id: 2, url: "https://www.url2.dev" },
            { id: 3, url: "https://www.link3.dev" }
        ];

        //Mock the alert function
        global.alert = jest.fn();

        filterByTerm(input, "");

        //Check if alert was called with the correct message
        expect(global.alert).toHaveBeenCalledWith("Please enter a search term");

        //Check if the function returns an empty array
        expect(filterByTerm(input, "")).toEqual([]);
    })

    test("it should throw an error if inputArr is empty", () => {
        const input = [];

        const searchTerm = "url";


        expect (() => {
            filterByTerm(input, searchTerm); // It is necessary to wrap the function call inside an anonymous function because `toThrow` needs to evaluate the function and catch the error
        }).toThrow(Error("inputArr cannot be empty"))
    })
});