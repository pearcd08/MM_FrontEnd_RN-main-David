// Created by Anna McColl 25-04-23
// Model for Counsellor objects sent from back end.

class Counsellor{
    constructor(id,
    firstName,
    lastName,
    dateOfBirth,
    businessName,
    addressLine1,
    addressLine2,
    suburb,
    city,
    postcode,
    phone,
    biography,
    culture,
    religion,
    sexuality,
    gender,
    mentalDisorder,
    treatmentMethod,
    language) {
  
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.businessName = businessName
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.suburb = suburb;
    this.city = city;
    this.postcode = postcode;
    this.phone = phone;
    this.biography = biography;
    this.culture = culture;
    this.religion = religion;
    this.sexuality = sexuality;
    this.gender = gender;
    this.mentalDisorder = mentalDisorder;
    this.treatmentMethod = treatmentMethod;
    this.language = language;
    }    
}

export default Counsellor;
