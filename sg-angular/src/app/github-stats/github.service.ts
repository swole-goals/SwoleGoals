import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { GitRepoInfo } from './gitrepoinfo';
import { Issue } from './issues';

@Injectable({
  providedIn: 'root'
})
export class GithubService {   

    constructor(private httpClient: HttpClient) { }

    getUserRepos(): Observable<GitRepoInfo> {
        return this.httpClient.get(`https://api.github.com/repositories/168768624/stats/contributors`).
            pipe(
                map((item: any) => item.map(p => <GitRepoInfo>
                    {
                        user: p.author.login,
                        url: p.author.html_url,
                        commits: p.total
                    })));            
    }
    getIssues(): Observable<Issue> {
	return this.httpClient.get(`https://api.github.com/repositories/168768624/issues`).
		pipe(
			map((item: any) => item.map(p => <Issue>
			{
				title: p.title,
				state: p.state,
				user: p.login
			}
		)));
	}

}
