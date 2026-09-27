"use strict";
// Navigation tabs for weight, distance and temprature
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");
tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedTab = button.dataset.tab;
        // Hidding all the tabs and making visible to the selected nav item unit convertor
        if (selectedTab) {
            tabContents.forEach(tab => tab.classList.add("hidden"));
            const selectedContent = document.getElementById(selectedTab);
            if (selectedContent) {
                selectedContent.classList.remove("hidden");
            }
        }
    });
});
// weight conversion
const weightKgToLb = {
    single: (value) => value * 2.20462,
    array: (values) => values.map(value => value * 2.20462)
};
const weightLbToKg = {
    single: (value) => value / 2.20462,
    array: (values) => values.map(value => value / 2.20462)
};
const createDistanceConverter = (fromUnit, toUnit) => (value) => {
    const convertValue = (distance) => {
        if (fromUnit === toUnit) {
            return distance;
        }
        return fromUnit === "mi"
            ? distance * 1.60934
            : distance / 1.60934;
    };
    return Array.isArray(value)
        ? value.map(convertValue)
        : convertValue(value);
};
const distanceMiToKm = createDistanceConverter("mi", "km");
const distanceKmToMi = createDistanceConverter("km", "mi");
// Temprature conversion
// Weight conversion for single input
const weightValue = document.querySelector("#weightValue");
const weightDirection = document.querySelector("#weightDirection"); // For identifying whether its from kg to lb or lb to kg
const weightResult = document.querySelector("#weightResult");
const weightConvert = document.querySelector("#weightConvert");
weightConvert?.addEventListener("click", () => {
    const value = Number(weightValue?.value);
    if (isNaN(value)) { // If the input given is not a number
        weightResult.textContent = "Please enter a valid number.";
        return;
    }
    const conversion = weightDirection?.value === "kgToLb"
        ? weightKgToLb
        : weightLbToKg;
    const result = conversion.single(value);
    if (weightResult) {
        weightResult.textContent = `Result: ${result.toFixed(2)}`;
    }
});
// Weight Conversion for array input
const weightArray = document.querySelector("#weightArray");
const weightArrayResult = document.querySelector("#weightArrayResult");
const weightArrayConvert = document.querySelector("#weightArrayConvert");
weightArrayConvert?.addEventListener("click", () => {
    const values = weightArray.value
        .split(",")
        .map(value => Number(value.trim())) // converting all the values of the array into number and triming white space
        .filter(value => !isNaN(value)); // ignoring if there is a non number value inside
    const conversion = weightDirection?.value === "kgToLb"
        ? weightKgToLb
        : weightLbToKg;
    const result = conversion.array(values);
    weightArrayResult.textContent =
        `Results: ${result.map(value => value.toFixed(2)).join(", ")}`;
});
// Distance conversion for single input
const distanceValue = document.querySelector("#distanceValue");
const distanceDirection = document.querySelector("#distanceDirection");
const distanceResult = document.querySelector("#distanceResult");
const distanceConvert = document.querySelector("#distanceConvert");
distanceConvert?.addEventListener("click", () => {
    const value = Number(distanceValue?.value);
    if (!distanceValue?.value.trim() || !Number.isFinite(value)) {
        distanceResult.textContent = "Please enter a valid number.";
        return;
    }
    const conversion = distanceDirection?.value === "miToKm"
        ? distanceMiToKm
        : distanceKmToMi;
    const result = conversion(value);
    if (distanceResult && typeof result === "number") {
        distanceResult.textContent = `Result: ${result.toFixed(2)}`;
    }
});
//Distance conversion for array input
const distanceArray = document.querySelector("#distanceArray");
const distanceArrayResult = document.querySelector("#distanceArrayResult");
const distanceArrayConvert = document.querySelector("#distanceArrayConvert");
distanceArrayConvert?.addEventListener("click", () => {
    const entries = distanceArray?.value.split(",").map(value => value.trim()) ?? [];
    const values = entries.map(Number);
    if (entries.length === 0 || entries.some(value => value === "") ||
        values.some(value => !Number.isFinite(value))) {
        distanceArrayResult.textContent = "Please enter a comma-separated list of numbers.";
        return;
    }
    const conversion = distanceDirection?.value === "miToKm"
        ? distanceMiToKm
        : distanceKmToMi;
    const result = conversion(values);
    if (distanceArrayResult && Array.isArray(result)) {
        distanceArrayResult.textContent =
            `Results: ${result.map(value => value.toFixed(2)).join(", ")}`;
    }
});
// Temprature conversion for single input
//Temprature conversion for array input
