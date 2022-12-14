// Bivariate choropleth tertiles

//------------------------------------------------------------------------------

// Authors: Corey Devin Anderson and Kirankumar Batchu

// The function bchTerts() takes two input arrays and bins values for each array
// into one of three classes ('L', 'M', 'H') based on tercile boundaries, and then 
// concatenates them into a single array of two-letter categories, with nine possible 
// states ('LL','LM', 'LH', 'ML', 'MM', 'MH', 'HL', 'HM', or 'HH') to support a 3 x 3 
// color scheme in a bivariate choropleth map.

// Use bchTerts2() if your data contain null values.

// Dependencies:

// Dependencies:

// simple-statistics (for quantile function: ss.quantile()) was used to determine
// array values associated with the tertiles; see script tag in HTML pane for 
// src information for simple-statistics.

//------------------------------------------------------------------------------

// Helper functions:

// getTerts(your_array): 
//   Takes a single array and returns an array of length 4 containing the break points
//   that define the tertiles (including 0 and 1).

// lmh(value, your_terts)
//    Given the breaks from getTerts(), classify each member of the array as
//    "L", "M", or "H".
//
// As written lmh() maps each value in the input array to its respective 
// category ('L', 'M', or 'H') in an output array using an anonymous function
// with a nested call to get_terts().

//------------------------------------------------------------------------------

// get_terts()

function getTerts(yourArray) {
  
  const tertInts = [0, 1, 2, 3]
  const terts = math.divide(tertInts, 3)
  let out = terts.map((x) => ss.quantile(yourArray, x))
  
return(out)  
}

// Test?
// console.log(getTerts(EPL_AGE65))

//------------------------------------------------------------------------------

// lmh()

// This function returns the tertiles T1, T2, and T3 as 'L', 'M', and 'H'.

// Use second solution (V2) below.

// The first solution (V1) uses an indexed for loop with an if{}else if{} statement to class
// components (as "L", "M", or "H")

// The second solution (V2) uses only the if{}/else if{} statement and is intended to be used in 
// an anonymous function with .map()

// Both get_terts() and lmh() are used as helper functions in bch(), where the call to get_terts()
// can be passed directly in the call to lmh().

// V1

// function lmh(your_array, your_terts) {
//   label_array = math.zeros(array_length)
//   for (j = 0; j < array_length; j++) {
//     if (your_array[j] <= your_terts["_data"][1]) {
//       label_array["_data"][j] = "L"
//     } else if (your_array[j] > your_terts["_data"][1] && your_array[j] <= your_terts["_data"][2]) {
//       label_array["_data"][j] = "M"
//     } else if (your_array[j] > your_terts["_data"][2] && your_array[j] <= your_terts["_data"][3]) {
//       label_array["_data"][j] = "H"
//     } 
//   }
// return(label_array)
// }

// V2: use this!

function lmh(value, yourTerts) {
  if (value <= yourTerts[1]) {
    return "L";
  } else if (value > yourTerts[1] && value <= yourTerts[2]) {
    return "M";
  } else if (value > yourTerts[2] && value <= yourTerts[3]) {
    return "H";
  } 
}


//------------------------------------------------------------------------------

// bchTerts()

function bchTerts(array1, array2) {
  let a = array1.map((x) => lmh(x, getTerts(array1)));
  let b = array2.map((x) => lmh(x, getTerts(array2)));
  let c = a.map((x, i) => x + String(b[i]));
return c;
};

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


  