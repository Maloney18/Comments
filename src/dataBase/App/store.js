import { configureStore } from "@reduxjs/toolkit";
import generalData from "../Features/generalData";

const store = configureStore({
    reducer: {
        generalData
    }
})

export default store;