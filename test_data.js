
// Example data:
// Data are percentile ranks for five indicators from SVI 2018 and diabetes:

const FIPS_01001 = [0.1850, 0.5401, 0.6336, 0.4397, 0.2745, 0.7074]; 
const FIPS_01003 = [0.6428, 0.2239, 0.5158, 0.3209, 0.3121, 0.4925];
const FIPS_01005 = [0.4893, 0.9631, 0.8965, 0.9701, 0.9217, 0.9799];

let FIPS_mat = math.matrix([FIPS_01001, FIPS_01003, FIPS_01005]); // create a DenseMatrix in math.js

//------------------------------------------------------------------------------


//----------//
// bchTerts //
//----------//

//-----------//
// bchTerts2 //
//-----------//

// Load data (from JSON on GitHub) for prototyping:

let url = "https://raw.githubusercontent.com/coreydevinanderson/cossimjs/main/data/diabetes_indicators.JSON";

let xhReq = new XMLHttpRequest();
xhReq.open("GET", url, false);
xhReq.send(null);
let jsonObject = JSON.parse(xhReq.responseText);

// console.log(Object.keys(jsonObject))
// ["County_FIPS","County","State","EPL_AGE65","EPL_POV","EPL_MINRTY","EPL_NOHSDP","EPL_UNEMP","Diabetes_pct"]

// Save indicators as separate variables for protoyping:

let EPL_AGE65 = jsonObject.EPL_AGE65;
let EPL_POV = jsonObject.EPL_POV;
let EPL_MINRTY = jsonObject.EPL_MINRTY;
let EPL_NOHSDP = jsonObject.EPL_NOHSDP;
let EPL_UNEMP = jsonObject.EPL_UNEMP;
let Diabetes_pct = jsonObject.Diabetes_pct;

// Test with SVI data.
console.log(bchTerts(EPL_AGE65, EPL_POV));
// console.log(bchTerts2(EPL_AGE65, EPL_POV));

// with nulls:

// How to handle null values? 

// Make some smaller arrays for testing purposes:

// one null
let EPL_AGE65_test = EPL_AGE65.slice(0, 10)
// Randomly generate random index between 0 and 10 and replace with null

function make_null(vector) {
  vector[Math.floor(Math.random() * 11)] = null
return vector
}

let EPL_AGE65_test0 = make_null(EPL_AGE65_test)
console.log(EPL_AGE65_test0)

// one or more nulls?

// no nulls
let EPL_MINRTY_test = EPL_MINRTY.slice(0, 10);
console.log(EPL_MINRTY_test)


console.log(bchTerts2(EPL_AGE65_test0, EPL_MINRTY_test));


//------------------------------------------------------------------------------



//--------------------//
//  Cosine similarity //
//--------------------//

// cosim(a, b)

// index to get row 1 (FIPS_01001) and row 2 (FIPS_01003) from FIPS_mat
// console.log(cossim(FIPS_mat["_data"][0], FIPS_mat["_data"][1]))

// To compare vector of values for a county (i) to all other counties (j) in a state.

let cossim_mat = math.ones(1, 3); // blank 1 x 3 matrix (pre-populated with 1s)
let cosine_mat_dims = math.size(cossim_mat); // dimensions of matrix
let ncol = cosine_mat_dims.get([1]);

for (i = 0; i < 1; i++) {
  for (j = 0; j < ncol; j++) {
    if (i != j) {
      cossim_mat.set([i, j], cossim(FIPS_mat["_data"][i], FIPS_mat["_data"][j]));
    }
  }
}

console.log(cossim_mat)

//------------------------------------------------------------------------------

//----------//
// adjusted //
//----------//

// Options:

// Default: method = "zscore"
// FIPS_zscores_rows = adjusted(FIPS_mat["_data"]); // input Array
// FIPS_zscores_rows = adjusted(FIPS_mat); // input DenseMatrix
// console.log(FIPS_zscores_rows) // output is an Array

console.log(adjusted(FIPS_mat, method = "centered")); // DenseMatrix
// console.log(adjusted(FIPS_mat, method = "zscore")); // DenseMatrix


//------------------------------------------------------------------------------

//-----------//
// adjusted2 //
//-----------//


console.log(adjusted2(FIPS_mat, method = "centered")); // DenseMatrix
// console.log(adjusted2(FIPS_mat, method = "zscore"));

// Example with null in array:
const FIPS_01001x = [0.1850, 0.5401, 0.6336, 0.4397, 0.2745, null];
// Now create a matrix with the new array that contains null...
let FIPS_mat_x = math.matrix([FIPS_01001x, FIPS_01003, FIPS_01005]); 


//------------------------------------------------------------------------------


//--------//
// cosSim //
//--------//

// cosim(a, b)

// index to get row 1 (FIPS_01001) and row 2 (FIPS_01003) from FIPS_mat
// console.log(cossim(FIPS_mat["_data"][0], FIPS_mat["_data"][1]))

// To compare vector of values for a county (i) to all other counties (j) in a state.

let cossim_mat = math.ones(1, 3); // blank 1 x 3 matrix (pre-populated with 1s)
let cosine_mat_dims = math.size(cossim_mat); // dimensions of matrix
let ncol = cosine_mat_dims.get([1]);

for (i = 0; i < 1; i++) {
  for (j = 0; j < ncol; j++) {
    if (i != j) {
      cossim_mat.set([i, j], cossim(FIPS_mat["_data"][i], FIPS_mat["_data"][j]));
    }
  }
}

console.log(cossim_mat)

//-

// Default: method = "zscore"
// FIPS_zscores_rows = adjusted(FIPS_mat["_data"]); // input Array
// FIPS_zscores_rows = adjusted(FIPS_mat); // input DenseMatrix
// console.log(FIPS_zscores_rows) // output is an Array

FIPS_zscores_rows = adjusted(FIPS_mat, method = "centered"); // DenseMatrix
// console.log(FIPS_zscores_rows) 

//------------------------------------------------------------------------------

//---------------//
// distEuclidean //
//---------------//

console.log(distEuclidean(FIPS_01001, FIPS_01003))

// To check against math.js::math.distance(a, b)
// HTML for math.js must be loaded in HTML pane

console.log("Compare to math.js::math.distance(a, b):")
console.log(math.distance(FIPS_01001, FIPS_01003))

//------------------------------------------------------------------------------


// Should match results for euclidean_dist() call.
// console.log(math.norm(math.add(FIPS_01001, math.multiply(FIPS_01003, -1))))

// console.log(FIPS_01001)
// console.log(FIPS_01003)
// console.log(math.diff([FIPS_01003, FIPS_01001])[0])
// console.log(math.norm(math.diff([FIPS_01001, FIPS_01003])[0]))

// Using euclidean_dist()
// console.log(FIPS_mat)
// console.log(FIPS_mat["_data"])

console.log(euc_dist_matrix(FIPS_mat, output_style = "DenseMatrix"))
// console.log(euc_dist_matrix(FIPS_mat))  // default is "Array
// console.log(euc_dist_matrix(FIPS_mat, output_style = "Array"))


//------------------------------------------------------------------------------


//----------------//
// percentileRank //
//----------------//

//-----------------//
// percentileRank2 //
//-----------------//


// Simple examples:

let randArr = [79, 5, 5, 1, 32, 1, 16, 82]
// console.log(randArr)

console.log(percentileRank(randArr))
console.log(percentileRank2(randArr))


// with null value
let randArrX = [79, 5, 5, 1, 32, 1, null, 82]
// console.log(randArrX)
console.log(percentileRank2(randArrX))

//------------------------------------------------------------------------------ 

