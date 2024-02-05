import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

// Define the store
interface Store {
    activityStore: ActivityStore
}

// We instantiate our stores here
export const store: Store = {
    activityStore: new ActivityStore()
}

// We create the react context of the store so its available to use between components
export const StoreContext = createContext(store)

// This is simply accessing the store
export function useStore() {
    return useContext(StoreContext);
}