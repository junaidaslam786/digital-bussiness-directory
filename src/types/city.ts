export interface Country {
  id: string;
  name: string;
  countryCode: string;
  subdomain: string;
  isActive: boolean;
  cities?: City[];
}

export interface City {
  id: string;
  name: string;
  countryId?: string;
  isActive: boolean;
  country?: Country;
}

export interface CreateCountryData {
  name: string;
  countryCode: string;
  subdomain: string;
  isActive?: boolean;
}

export type UpdateCountryData = Partial<CreateCountryData>;

export interface CreateCityData {
  name: string;
  countryId: string;
  isActive?: boolean;
}

export type UpdateCityData = Partial<CreateCityData>;
