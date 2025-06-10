export default class CompanyProfileEntity {
  constructor({
    id,
    companyName,
    industry,
    website,
    headquarter,
    sizeOfCompany,
    overview,
    about,
    userID,
    createdAt,
    updatedAt,
  } = {}) {
    this.id = id;
    this.companyName = companyName;
    this.industry = industry;
    this.website = website;
    this.headquarter = headquarter;
    this.sizeOfCompany = sizeOfCompany;
    this.overview = overview;
    this.about = about;
    this.userID =userID
    this.createdAt = createdAt || new Date().toString();
    this.updatedAt = updatedAt || new Date().toString();
  }

  // For partial update requests
  static createPartial(data) {
    const company = new CompanyProfileEntity({});
    
    if (data.id) company.id = data.id;
    if (data.companyName) company.companyName = data.companyName;
    if (data.industry) company.industry = data.industry;
    if (data.website) company.website = data.website;
    if (data.headquarter) company.headquarter = data.headquarter;
    if (data.sizeOfCompany) company.sizeOfCompany = data.sizeOfCompany;
    if (data.overview) company.overview = data.overview;
    if (data.about) company.about = data.about;
    if (data.userID) company.userID = data.userID;

    return company;
  }

  // Rehydrate full data from database or DTO
  static rehydrate(data) {
    return new CompanyProfileEntity({
      id: data.id,
      companyName: data.companyName,
      industry: data.industry,
      website: data.website,
      headquarter: data.headquarter,
      sizeOfCompany: data.sizeOfCompany,
      overview: data.overview,
      about: data.about,
      userID: data.userID,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    });
  }

  // Clean object to return to frontend
  toDTO() {
    return {
      id: this.id,
      companyName: this.companyName,
      industry: this.industry,
      website: this.website,
      headquarter: this.headquarter,
      sizeOfCompany: this.sizeOfCompany,
      overview: this.overview,
      about: this.about,
      userID:this.userID,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
