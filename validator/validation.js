const mongoose = require("mongoose")

//NAME VALIDATION
const isValidName = function (name){
    const nameRegex = /^[a-zA-Z ]+$/;
    return nameRegex.test(name);
};
//EMAIL VALIDATION 
const isValidation = function(email) {
    const emailRegex =
    /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
};
//PASSWORD VALIDATION

