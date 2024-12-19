import {
    loadRedditPosts,
    selectRedditPosts,
    selectErrorMessage,
    isLoading
} from "../components/RedditPosts/RedditPostsSlice";
import redditPostsReducer from "../components/RedditPosts/RedditPostsSlice";
import fullPostReducer from "../components/FullPost/FullPostSlice";
import { configureStore } from "@reduxjs/toolkit";
const { http, HttpResponse, delay } = require("msw");
const {setupServer} = require("msw/node");
import { fireEvent, screen } from "@testing-library/dom";
import { renderWithProviders } from "../utils/test-utils";
import HomePage from "../components/Homepage/HomePage";

const mockTopPosts = {
    data: {
        after: "t1",
        before: "s1",
        children: [
            {
                data: {
                    id: "1hbtcy9",
                    name: "b1",
                    title: "Wanted posters of healthcare CEOs are starting to pop up in NYC",
                    subreddit: "pics",
                    subreddit_name_prefixed: "r/pics",
                    thumbnail: "https://b.thumbs.redditmedia.com/C695qg-mo9aY9rqLeBc5Z-9nwijyLCVN7rpkAr7MmWM.jpg",
                    upvotes: 21,
                    num_comments: 11,
                    permalink: "/r/pics/comments/1hbtcy9/wanted_posters_of_healthcare_ceos_are_starting_to/",
                    created: 73737373,
                    secure_media: { // Need to check if has value
                        reddit_video: { // Need to check if has value
                            fallback_url: "https://v.redd.it/hpab42naxm6e1/DASH_96.mp4" // Need to check if has value
                            }
                        },
                    total_awards_received: 1,
                    url: "https://i.redd.it/hccvvac88o6e1.jpeg", // Need to check if has value, and if it's a .jpeg/.png file
                    url_overridden_by_dest: "https://i.redd.it/hccvvac88o6e1.jpeg" // Need to check if has value, and if it's a .jpeg/.png file
                },
            },

            {
                data: {
                    id: "1hccdac",
                    name: "b2",
                    title: "Rounding should be illegal",
                    subreddit: "Bolehland",
                    subreddit_name_prefixed: "r/Bolehland",
                    thumbnail: "https://b.thumbs.redditmedia.com/C695qg-mo9aY9rqLeBc5Z-9nwijyLCVN7rpkAr7MmWM.jpg",
                    upvotes: 22,
                    num_comments: 12,
                    permalink: "/r/Bolehland/comments/1hccdac/rounding_should_be_illegal/",
                    created: 73737374
                },
            },
            
            {
                data: {
                    id: "1hccrsn",
                    name: "b3",
                    title: "Neighbors threw cat outside in 10f weather",
                    subreddit: "cats",
                    subreddit_name_prefixed: "r/cats",
                    thumbnail: "https://b.thumbs.redditmedia.com/C695qg-mo9aY9rqLeBc5Z-9nwijyLCVN7rpkAr7MmWM.jpg",
                    upvotes: 23,
                    num_comments: 13,
                    permalink: "/r/cats/comments/1hccrsn/neighbors_threw_cat_outside_in_10f_weather/",
                    created: 73737375
                },
            },
        
        ]
    }
}

export const handlers = [
    http.get('https://www.reddit.com/r/popular/.json' , async () => {
        await delay(300)
        return HttpResponse.json(mockTopPosts)
    })
]

const server = setupServer(...handlers);

//Mock fetch globally
global.fetch = jest.fn();

describe("load HomePage", () => {

    

    // let store;

    // beforeEach(() => {
    //     store = configureStore({
    //         reducer: {
    //             fullPost: fullPostReducer
    //         }
    //     });
    // });

    // afterEach(() => {
    //     jest.resetAllMocks();
    // });

    // Enable API mocking before tests
    beforeAll(() => server.listen());

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers());

    // Diable API mocking after the tests are done
    afterAll(() => server.close());

    it("displays a list of reddit posts", async () => {
        renderWithProviders(<HomePage />)

        expect(screen.getByText(/Content is loading/i)).toBeInTheDocument();
    })
})

// () => {
//     return Promise.resolve({})
// }