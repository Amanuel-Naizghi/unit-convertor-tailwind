// Navigation tabs 
const tabButtons = document.querySelectorAll<HTMLButtonElement>(".tab-button");
const tabContents = document.querySelectorAll<HTMLElement>(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {

    const selectedTab = button.dataset.tab;
    // Hidding all the tabs and making visible to the selected nav item unit convertor
  
    if (selectedTab) {
      tabContents.forEach(tab => tab.classList.add("hidden"));
      const selectedContent = document.getElementById(selectedTab);
      if (selectedContent){
        selectedContent.classList.remove("hidden");
      }
    }
  })
})
// Creating a reusable interface for single and array inputs
interface Conversion {
    single(value: number): number;
    array(values: number[]): number[];
}

const weightKgToLb: Conversion = {
    single: (value) => value * 2.20462,
    array: (values) => values.map(value => value * 2.20462)
};

const weightLbToKg: Conversion = {
    single: (value) => value / 2.20462,
    array: (values) => values.map(value => value / 2.20462)
};


// Weight conversion for single input

const weightValue = document.querySelector<HTMLInputElement>("#weightValue");
const weightDirection = document.querySelector<HTMLSelectElement>("#weightDirection"); // For identifying whether its from kg to lb or lb to kg
const weightResult = document.querySelector<HTMLParagraphElement>("#weightResult");
const weightConvert = document.querySelector<HTMLButtonElement>("#weightConvert");

weightConvert?.addEventListener("click", () => {

    const value = Number(weightValue?.value);

    if (isNaN(value)) { // If the input given is not a number
        weightResult!.textContent = "Please enter a valid number.";
        return;
    }

    const conversion =
        weightDirection?.value === "kgToLb"
            ? weightKgToLb
            : weightLbToKg;

    const result = conversion.single(value);

    if(weightResult){
      weightResult.textContent = `Result: ${result.toFixed(2)}`;
    } 
});


// Weight Conversion for array input

const weightArray = document.querySelector<HTMLInputElement>("#weightArray");
const weightArrayResult = document.querySelector<HTMLParagraphElement>("#weightArrayResult");
const weightArrayConvert = document.querySelector<HTMLButtonElement>("#weightArrayConvert");

weightArrayConvert?.addEventListener("click", () => {

    const values = weightArray!.value
        .split(",")
        .map(value => Number(value.trim())) // converting all the values of the array into number and triming white space
        .filter(value => !isNaN(value));// ignoring if there is a non number value inside

    const conversion =
        weightDirection?.value === "kgToLb"
            ? weightKgToLb
            : weightLbToKg;

    const result = conversion.array(values);

    weightArrayResult!.textContent =
        `Results: ${result.map(value => value.toFixed(2)).join(", ")}`;
});