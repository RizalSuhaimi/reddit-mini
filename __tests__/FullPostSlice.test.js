import { loadFullPost } from "../src/components/FullPost/FullPostSlice";
import fullPostReducer from "../src/components/FullPost/FullPostSlice";
import { configureStore } from "@reduxjs/toolkit";
//Mock fetch globally
global.fetch = jest.fn();

describe("loadFullPost async thunk", () => {

    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                fullPost: fullPostReducer
            }
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("dispatches loadFullPost.fulfilled when fetching a Reddit post succeeds", async () => {
        const resolvedValue = {
            status: "MOCK",
            data: []
        }
        fetch.mockResolvedValueOnce(resolvedValue);
        const actualValue = await loadFullPost
    })
})

// () => {
//     return Promise.resolve({})
// }