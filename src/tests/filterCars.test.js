import { describe, it, expect } from "vitest";
import filterCars from "../utils/filterCars";

const cars = [
    {
        id: 1,
        name: "BMW",
        transmission: "Automatic",
        type: "SUV",
        available: true,
        pricePerDay: 100,
    },
    {
        id: 2,
        name: "Audi",
        transmission: "Manual",
        type: "Sedan",
        available: false,
        pricePerDay: 50,
    },
];

describe("filterCars", () => {
    it("filters by search", () => {
        const result = filterCars(cars, {
            search: "bmw",
            transmission: "All",
            types: [],
            availableOnly: false,
            priceMin: "",
            priceMax: "",
            favoritesOnly: false,
            favorites: [],
        });

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("BMW");
    });

    it("filters available cars", () => {
        const result = filterCars(cars, {
            search: "",
            transmission: "All",
            types: [],
            availableOnly: true,
            priceMin: "",
            priceMax: "",
            favoritesOnly: false,
            favorites: [],
        });

        expect(result).toHaveLength(1);
    });
});