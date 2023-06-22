// Created by Anna McColl 25-04-23
// Model for Patient objects sent from back end.

class Patient{
    constructor(id,
    firstName,
    lastName,
    dateOfBirth,
    addressLine1,
    addressLine2,
    suburb,
    city,
    postcode,
    phone,
    culture,
    religion,
    preferredLanguage,
    sexuality,
    gender,
    preferredCounsellorGender,
    mentalDisorder) {
  
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.suburb = suburb;
    this.city = city;
    this.postcode = postcode;
    this.phone = phone;
    this.culture = culture;
    this.religion = religion;
    this.preferredLanguage = preferredLanguage;
    this.sexuality = sexuality;
    this.gender = gender;
    this.preferredCounsellorGender = preferredCounsellorGender;
    this.mentalDisorder = mentalDisorder;
    }    
}

export default Patient;
