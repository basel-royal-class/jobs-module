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



  export interface FormattedJobProfile {
    success: boolean;
    data: {
      id: number;
      name: string;
      summary: string;
      image: string | null;
      country: {
        id: number;
        name: string;
      } | null;
      city: {
        id: number;
        name: string;
      } | null;
      basic_info: {
        email: string;
        phone_number: string;
        visa_id: {
          id: number;
          name: string;
        } | null;
        gender: string;
        nationality: {
          id: number;
          name: string;
        } | null;
        dob: string;
        languages: Array<{
          id: number;
          value: string;
        }>;
      };
      headline: string;
      join_type: string;
      career_level: string;
      desired_salary: number;
      total_sections: number;
      completed_sections: number;
      remaining_sections: number;
      completion_percentage: number;
      sections_status: {
        qualification: boolean;
        experience: boolean;
        skills: boolean;
        resume: boolean;
        certificates: boolean;
        portfolio: boolean;
        references: boolean;
      };
    };
  }