export class KvKCompany {
  public id: number;
  public kvknummer: string;
  public vestigingsnummer: string;
  public businessName: string;
  public tradeNames: string;
  public statutoryNames: string;
  public legalFormCode: number;
  public legalFormDescription: string;
  public hasEntryInCommercialRegister: number;
  public isLegalPerson: number;
  public isEstablishment: number;
  public isMainEstablishment: number;
  public employees: number;
  public registrationDate: string; // ISO DateTime
  public street: string;
  public houseNumber: string;
  public houseNumberAddition: string;
  public postalCode: string;
  public city: string;
  public gpsLatitude: number;
  public gpsLongitude: number;
  public website: string;
  public mainActivitySbiCode: number;
  public mainActivitysbiCodeDescription: string;
  public activity1SbiCode: number;
  public activity1SbiCodeDescription: string;
  public activity2SbiCode: number;
  public activity2SbiCodeDescription: string;
}
