import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Utilities } from "./Utilities";

interface UserConfiguration {
    language: string;
    homeUrl: string;    
  }

  @Injectable()
export class ConfigurationService {
    public baseUrl = environment.baseUrl || Utilities.baseUrl();
    constructor(){}
      
    
}