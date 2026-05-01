import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResumeData} from './model/resume-data';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeDataService {
  private readonly publicDataDirectory = "/public/data";
  private readonly jsonDataFilename = "data.json";

  constructor(private readonly http: HttpClient) {
  }


  public async getResumeData(): Promise<ResumeData> {
    const resumeDataUri = `${this.publicDataDirectory}/${(this.jsonDataFilename)}`;
    return await firstValueFrom(this.http.get<ResumeData>(resumeDataUri));
  }
}
