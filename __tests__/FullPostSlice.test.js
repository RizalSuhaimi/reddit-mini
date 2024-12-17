import { loadFullPost } from "../src/components/FullPost/FullPostSlice";
import fullPostReducer from "../src/components/FullPost/FullPostSlice";
import { configureStore } from "@reduxjs/toolkit";
//Mock fetch globally
global.fetch = jest.fn();

describe("loadFullPost async thunk", () => {
    const initialState = {
        fullPost: null,
        isLoading: false,
        hasError: false,
        errorMessage: ""
    };

    let store;

    beforeEach(() => {
        store = configureStore({ reducer: { fullPost: fullPostReducer } });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("dispatches loadFullPost.fulfilled when fetching a Reddit post succeeds", async () => {
        const mockResponse = [{ data: "Sample data"}];
        fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const result = await store.dispatch(loadFullPost({ subreddit: 'test', postId: '123', postTitle: 'test-post' }));
        const actions = store.getActions();

        expect(actions[0].type).toEqual(loadFullPost.pending.type);
        expect(actions[1].type).toEqual(loadFullPost.fulfilled.type);
        expect(actions[1].payload).toEqual(mockResponse)
    })
})