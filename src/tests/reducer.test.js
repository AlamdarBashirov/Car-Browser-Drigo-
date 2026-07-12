import { describe, it, expect } from "vitest";
import {
    filterReducer,
    initialState,
    ACTIONS,
} from "../reducers/filterReducer";

describe("filterReducer", () => {
    it("updates search", () => {
        const state = filterReducer(initialState, {
            type: ACTIONS.SET_SEARCH,
            payload: "BMW",
        });

        expect(state.search).toBe("BMW");
        expect(state.page).toBe(1);
    });

    it("toggles type", () => {
        const state = filterReducer(initialState, {
            type: ACTIONS.SET_TYPE,
            payload: "SUV",
        });

        expect(state.types).toContain("SUV");
    });

    it("resets state", () => {
        const state = filterReducer(
            {
                ...initialState,
                search: "Audi",
            },
            {
                type: ACTIONS.RESET,
            }
        );

        expect(state).toEqual(initialState);
    });
});