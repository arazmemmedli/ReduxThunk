import { createSlice, nanoid, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import sub from "date-fns/sub";
import { IPAramPost, IPost } from "../../../types/types";
import { RootState } from "../../store";
import axios from "axios";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    try {
        const response = await axios.get(POSTS_URL);
        const data: IPost[] = response.data
        return data
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
})

export const addNewPost = createAsyncThunk('posts/addNewPosts', async (post: IPAramPost) => {
    try {
        const response = await axios.post(POSTS_URL, post);
        return response.data
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
})

export const updatePost = createAsyncThunk("posts/updatePost", async (post: IPost) => {
    const { id } = post;
    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, post);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
        // return post;
    }
})

export const deletePost = createAsyncThunk("posts/deletePost", async (post: IPost) => {
    const { id } = post;
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`);
        if (response.status === 200) return post;
        return `${response.status}: ${response.statusText}`
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
})

interface ISlice {
    posts: IPost[];
    status: string;
    error: any
}

const initialState: ISlice = {
    posts: [],
    status: "idle",
    error: null
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action: PayloadAction<IPost>) {
                state.posts.push(action.payload)
            },
            prepare(title: string, body: string, userId: number, postId: number) {
                return {
                    payload: {
                        id: postId,
                        title,
                        body,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded: (state, action: { payload: { reaction: string, postId: number } }) => {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find((post) => post.id === postId);
            if (existingPost?.reactions) {
                existingPost.reactions[reaction as keyof typeof existingPost.reactions]++
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "Loading"
            })
            .addCase(fetchPosts.fulfilled, (state, { payload }) => {
                state.status = 'succeeded'
                // Adding date and reactions
                if (payload !== undefined) {
                    let min = 1;
                    const allPosts = payload as IPost[]
                    const loadedPosts = allPosts.map(post => {
                        post.date = sub(new Date(), { minutes: min++ }).toISOString();
                        post.reactions = {
                            thumbsUp: 0,
                            heart: 0,
                        }
                        return post;
                    });

                    // Add any fetched posts to the array
                    state.posts = loadedPosts
                }
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action: { payload: IPost }) => {
                const sortedPosts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    heart: 0,
                    thumbsUp: 0
                }
                console.log(action.payload)
                state.posts.push(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action: { payload: IPost }) => {
                if (!action.payload.id) {
                    console.log("Update could not complete");
                    console.log(action.payload);
                    return;
                }
                const { id } = action.payload;
                action.payload.date = new Date().toISOString();
                const posts = state.posts.filter(post => post.id !== id);
                state.posts = [...posts, action.payload]
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const data = action.payload as IPost
                if (!data.id) {
                    console.log("Delete could not complete");
                    console.log(action.payload);
                    return;
                }
                const { id } = data;
                const posts = state.posts.filter(post => post.id !== id);
                state.posts = posts
            })
    }
})

export const selectAllPost = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const selectPost = (state: RootState, postId: number) => state.posts.posts.find((post) => post.id === postId);

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;