import { describe, it, expect } from "vitest";
import sortCars from "../utils/sortCars";

const cars = [
    { id: 1, pricePerDay: 100 },
    { id: 2, pricePerDay: 40 },
    { id: 3, pricePerDay: 80 },
];

describe("sortCars", () => {
    it("sorts low to high", () => {
        const result = sortCars(cars, "low-high");

        expect(result[0].pricePerDay).toBe(40);
    });

    it("sorts high to low", () => {
        const result = sortCars(cars, "high-low");

        expect(result[0].pricePerDay).toBe(100);
    });
});