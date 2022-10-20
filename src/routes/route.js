; const express = require('express');
const router = express.Router();

let arr1 = [1, 2, 3, 5, 6, 7, 8, 9]



router.get("/sol1", function (req, res) {
    const missing = [];

    for (let i in arr1) {

        let gap = arr1[i] - arr1[i - 1];

        let diff = 1;

        while (diff < gap) {
            missing.push(arr1[i - 1] + diff);
            diff++;
        }
    }
    res.send(missing)

})

// router.get("/sol2", function (req, res) {
//     let n = arr2.length -1
//     let first = arr2[0]
//     let last = arr2[arr2.length-1]
//     let sum = (n*(first+last))/2
//     let missing=0

//     for (let i = 0; i<arr2.length; i++){
//         missing = missing + arr2[i]

//     }
//     result =  missing - sum

//     console.log(result);
//     res.send(result);

// })
let arr2 = [33, 34, 35, 37, 38, 39]

router.get("/sol2", function (req, res) {
    const missing = [];

    for (let i in arr2) {

        let gap = arr2[i] - arr2[i - 1];

        let diff = 1;

        while (diff < gap) {
            missing.push(arr2[i - 1] + diff);
            diff++;
        }
    }
    res.send(missing)

})

//ASSIGNMENT 2//
let players = [
    {
        "name": "manish",
        "dob": "1/1/1995",
        "gender": "male",
        "city": "jalandhar",
        "sports": [
            "swimming"
        ]
    },
    {
        "name": "lokesh",
        "dob": "1/1/1990",
        "gender": "male",
        "city": "mumbai",
        "sports": [
            "soccer"
        ]
    },
   { 
    "name": "lokesh",
    "dob": "1/1/1990",
    "gender": "male",
    "city": "mumbai",
    "sports": [
        "soccer"
    ]
},
{

"name": "lokesh",
"dob": "1/1/1990",
"gender": "male",
"city": "mumbai",
"sports": [
    "soccer"
]
},

{
"name": "madhu",
"dob": "11/10/1990",
"gender": "female",
"city": "raipur",
"sports": [
    "soccer"
]
},

]

router.post("/players",function (req,res){
    console .log(players) 
    let newplayer = req.body ;
    let found = req.body.name;
    console.log("new players found :-",newplayer)
    for (i of players){
      if (i.name===found){
       return res.send("name already exists")  
      } 
    } 
      
    });



module.exports = router;