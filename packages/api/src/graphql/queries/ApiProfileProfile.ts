
export const GET_APIPROFILEPROFILE_QUERY = `
query GetApiProfileProfile($limit: Int!) {
  apiprofileprofile(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        about
        addresses
        banner
        cancelDate
        createdAt
        createdBy
        darkMode
        dob
        documents
        examNumber
        firstName
        gender
        grades
        hasSiyavulaAccess
        idNumber
        imei
        inMailsBCC
        inMailsCC
        inMailsTos
        isAffiliate
        isDeveloper
        isPaying
        isPayingDate
        lastName
        locale
        localizations
        mobileNr
        notifications
        organization
        parents
        profilePic
        progresses
        provinces
        publishedAt
        referral
        schools
        serialNumber
        shares
        socialRead
        subjects
        supportDepartments
        uniqueId
        updatedAt
        updatedBy
        voucher
      }
    }
  }
}
`;

export interface ApiProfileProfile {
  id: string;
  attributes: {
    about: string;
    addresses: string;
    banner: string;
    cancelDate: string;
    createdAt: string;
    createdBy: string;
    darkMode: string;
    dob: string;
    documents: string;
    examNumber: string;
    firstName: string;
    gender: string;
    grades: string;
    hasSiyavulaAccess: string;
    idNumber: string;
    imei: string;
    inMailsBCC: string;
    inMailsCC: string;
    inMailsTos: string;
    isAffiliate: string;
    isDeveloper: string;
    isPaying: string;
    isPayingDate: string;
    lastName: string;
    locale: string;
    localizations: string;
    mobileNr: string;
    notifications: string;
    organization: string;
    parents: string;
    profilePic: string;
    progresses: string;
    provinces: string;
    publishedAt: string;
    referral: string;
    schools: string;
    serialNumber: string;
    shares: string;
    socialRead: string;
    subjects: string;
    supportDepartments: string;
    uniqueId: string;
    updatedAt: string;
    updatedBy: string;
    voucher: string;
  };
}

export interface GetApiProfileProfileResponse {
  apiprofileprofile: {
    data: ApiProfileProfile[];
  };
}
