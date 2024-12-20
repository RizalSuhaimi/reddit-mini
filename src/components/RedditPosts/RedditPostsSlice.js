import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Search queries will look like the link below
// https://www.reddit.com/search.json?q=cake%20recipes

// The URL being used to fetch reddit posts will change depending on whether it's the homme page, a subreddit page, or a search query

export const loadRedditPosts = createAsyncThunk(
    "redditPosts/loadRedditPosts",
    async (arg, thunkApi) => {
        try {
            const response = await fetch('https://www.reddit.com/r/popular/.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let jsonResponse;
            try {
                jsonResponse = await response.json();
            } catch (jsonError) {
                throw new Error(`Error parsing JSON response: ${jsonError}`)
            }
            
            return jsonResponse;
        } catch (error) {
            // Use 'rejectWithValue' to return a custom error message to the reducer
            console.log(error)
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const redditPostsSlice = createSlice({
    name: "redditPosts",
    initialState: {
        redditPosts: null,
        isLoading: false,
        hasError: false,
        errorMessage: "", // Store error message for more feedback
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadRedditPosts.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = "";
            })
            .addCase(loadRedditPosts.fulfilled, (state, action) => {
                state.redditPosts = action.payload
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadRedditPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.redditPosts = null;
                state.errorMessage = action.payload || "Failed to load Reddit posts";
            })
    }
})

export const selectRedditPosts = (state) => state.redditPosts.redditPosts;
export const isLoading = (state) => state.redditPosts.isLoading;
export const selectErrorMessage = (state) => state.redditPosts.errorMessage;

export default redditPostsSlice.reducer;

// Data on subreddit post for feed
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


// jsonResponse.data.children

// Object { kind: "Listing", data: {…} }
    // data: Object { after: "t3_1hbujfs", dist: 25, modhash: "", … }
        // after: "t3_1hbujfs"
        // before: null
        // children: Array(25) [ {…}, {…}, {…}, … ]
            // 0: Object { kind: "t3", data: {…} }
                // data: Object { subreddit: "pics", author_fullname: "t2_j4ykf", saved: false, … }
                    // all_awardings: Array []
                    // allow_live_comments: false
                    // approved_at_utc: null
                    // approved_by: null
                    // archived: false
                    // author: "I_ONLY_BOLD_COMMENTS"
                    // author_flair_background_color: null
                    // author_flair_css_class: null
                    // author_flair_richtext: Array []
                    // author_flair_template_id: null
                    // author_flair_text: null
                    // author_flair_text_color: null
                    // author_flair_type: "text"
                    // author_fullname: "t2_j4ykf"
                    // author_is_blocked: false
                    // author_patreon_flair: false
                    // author_premium: false
                    // awarders: Array []
                    // banned_at_utc: null
                    // banned_by: null
                    // can_gild: false
                    // can_mod_post: false
                    // category: null
                    // clicked: false
                    // content_categories: Array [ "photography" ]
                    // contest_mode: false

                    // created: 1733923406

                    // created_utc: 1733923406

                    // discussion_type: null
                    // distinguished: null
                    // domain: "reddit.com"

                    // downs: 0

                    // edited: false
                    // gallery_data: Object { items: (2) […] }
                    // gilded: 0
                    // gildings: Object {  }
                    // hidden: false
                    // hide_score: false
                    // ​​​​​
                    // id: "1hbtcy9"
                    // ​​​​​
                    // is_created_from_ads_ui: false
                    // is_crosspostable: false
                    // is_gallery: true
                    // is_meta: false
                    // is_original_content: false
                    // is_reddit_media_domain: false
                    // is_robot_indexable: true
                    // is_self: false
                    // is_video: false
                    // likes: null
                    // link_flair_background_color: ""
                    // link_flair_css_class: null
                    // link_flair_richtext: Array []
                    // link_flair_text: null
                    // link_flair_text_color: "dark"
                    // link_flair_type: "text"
                    // locked: false
                    // media: null
                    // media_embed: Object {  }
                    // media_metadata: Object { ydgp8zdi086e1: {…}, 5ewtu9ei086e1: {…} }
                    // media_only: false
                    // mod_note: null
                    // mod_reason_by: null
                    // mod_reason_title: null
                    // mod_reports: Array []

                    // name: "t3_1hbtcy9"
                    // ​​​​​
                    // no_follow: false

                    // num_comments: 5314
                    // ​​​​​
                    // num_crossposts: 34
                    // num_reports: null
                    // over_18: false

                    // permalink: "/r/pics/comments/1hbtcy9/wanted_posters_of_healthcare_ceos_are_starting_to/"

                    // pinned: false
                    // pwls: null
                    // quarantine: false
                    // removal_reason: null
                    // removed_by: null
                    // removed_by_category: null
                    // report_reasons: null
                    // saved: false
                    // score: 185504
                    // secure_media: null
                    // secure_media_embed: Object {  }
                    // selftext: ""
                    // selftext_html: null
                    // send_replies: true
                    // spoiler: false
                    // stickied: false

                    // subreddit: "pics"

                    // subreddit_id: "t5_2qh0u"

                    // subreddit_name_prefixed: "r/pics"

                    // subreddit_subscribers: 31253690
                    // subreddit_type: "public"
                    // suggested_sort: null

                    // thumbnail: "https://b.thumbs.redditmedia.com/C695qg-mo9aY9rqLeBc5Z-9nwijyLCVN7rpkAr7MmWM.jpg"

                    // thumbnail_height: 140
                    // thumbnail_width: 140

                    // title: "Wanted posters of healthcare CEOs are starting to pop up in NYC"
                    
                    // top_awarded_type: null

                    // total_awards_received: 0

                    // treatment_tags: Array []

                    // ups: 185504

                    // upvote_ratio: 0.88
                    // url: "https://www.reddit.com/gallery/1hbtcy9"
                    // url_overridden_by_dest: "https://www.reddit.com/gallery/1hbtcy9"
                    // user_reports: Array []
                    // view_count: null
                    // visited: false
                    // wls: null
                    // <prototype>: Object { … }
                // kind: "t3"
                // <prototype>: Object { … }
            // 1: Object { kind: "t3", data: {…} }
            // 2: Object { kind: "t3", data: {…} }
            // 3: Object { kind: "t3", data: {…} }
            // 4: Object { kind: "t3", data: {…} }
            // 5: Object { kind: "t3", data: {…} }
            // 6: Object { kind: "t3", data: {…} }
            // 7: Object { kind: "t3", data: {…} }
            // 8: Object { kind: "t3", data: {…} }
            // 9: Object { kind: "t3", data: {…} }
            // 10: Object { kind: "t3", data: {…} }
            // 11: Object { kind: "t3", data: {…} }
            // 12: Object { kind: "t3", data: {…} }
            // 13: Object { kind: "t3", data: {…} }
            // 14: Object { kind: "t3", data: {…} }
            // 15: Object { kind: "t3", data: {…} }
            // 16: Object { kind: "t3", data: {…} }
            // 17: Object { kind: "t3", data: {…} }
            // 18: Object { kind: "t3", data: {…} }
            // 19: Object { kind: "t3", data: {…} }
            // 20: Object { kind: "t3", data: {…} }
            // 21: Object { kind: "t3", data: {…} }
            // 22: Object { kind: "t3", data: {…} }
            // 23: Object { kind: "t3", data: {…} }
            // 24: Object { kind: "t3", data: {…} }
            // length: 25
            // <prototype>: Array []
        // dist: 25
        // geo_filter: ""
        // modhash: ""
        // <prototype>: Object { … }
    // kind: "Listing"
    // <prototype>: Object { … }