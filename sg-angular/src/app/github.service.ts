import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { GitRepoInfo } from './gitrepoinfo';

@Injectable({
  providedIn: 'root'
})
export class GithubService {   

    constructor(private httpClient: HttpClient) { }

    getUserRepos(): Observable<GitRepoInfo> {
        return this.httpClient.get(`https://api.github.com/repos/vivianmnguyen/SwoleGoals/stats/contributors`).
            pipe(
                map((item: any) => item.map(p => <GitRepoInfo>
                    {
                        user: p.author.login,
                        name: "a",
                        commits: p.total
                    })));            
    }
}