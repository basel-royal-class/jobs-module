export interface CountryType {
    id : number ,
    name : string ,
    country_code : string ,
    currency_code : string ,
    created_at : string
} 


export interface FormattedExperience {
    id: number;
    type: string;
    current_experience: boolean;
    job_title: string;
    description: string;
    industry: {
      id: number;
      name: string;
    };
    country: {
      id: number;
      name: string;
    };
    city: {
      id: number;
      name: string;
    };
    job_category: {
      id: number;
      value: string;
    } | null;
    experiences_year: string;
    start_date: string;
    end_date: string | null;
    company: {
      id: number;
      name: string;
    };
  }
  
  export interface ExperienceDuration {
    years: number;
    months: number;
  }