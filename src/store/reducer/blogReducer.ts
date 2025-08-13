import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BlogState {
    categories: any[];
    tags: any[];
    category: string;
    tag: string;
    blog_load: boolean;
    sort: string;
    authorId: string;
    singleBlogCategory: string;
}

const initialState: BlogState = {
    categories: [],
    tags: [],
    category: '',
    tag: '',
    blog_load: false,
    sort: '',
    authorId: '',
    singleBlogCategory: '',
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<any[]>) => {
            state.categories = action.payload;
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        setTags: (state, action: PayloadAction<any[]>) => {
            state.tags = action.payload;
        },
        setTag: (state, action: PayloadAction<string>) => {
            state.tag = action.payload;
        },
        setBlogLoad: (state) => {
            state.blog_load = true;
        },
        setSort: (state, action: PayloadAction<string>) => {
            state.sort = action.payload;
        },
        setAuthorId: (state, action: PayloadAction<string>) => {
            state.authorId = action.payload;
        },
        setSingleBlogCategory: (state, action: PayloadAction<string>) => {
            state.singleBlogCategory = action.payload;
        },
    },
});

export const {
    setCategories,
    setCategory,
    setTags,
    setTag,
    setBlogLoad,
    setSort,
    setAuthorId,
    setSingleBlogCategory,
} = blogSlice.actions;

export default blogSlice.reducer;
