// Created by Anna McColl 26-04-23
// Model for SiteAdministrator objects sent from back end.

class SiteAdministrator{
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
    phone) {
  
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
   
    }    
}

export default SiteAdministrator;
