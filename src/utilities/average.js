// Function To Convert Array Of Strings Into Numbers Then Calculate The Average
export const getAverage = (arr) => {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += parseInt(arr[i]);
  }
  let average = sum / arr.length;
  return average;
};
