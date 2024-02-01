import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            userID: 0,
            userNAME: '',
            articles: []
        }
    },
});

export default store;