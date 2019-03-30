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
	getUserCommits(urlString: string, page: number){
		//var urlString = `https://api.github.com/repositories/168768624/commits?page=` + 0;
		var urlReq = urlString + page; 
		let commits = [];
		let commitCounts: number[] = [0, 0, 0, 0, 0, 0];
		return this.httpClient.get(`${urlReq}`);
		/*
        		.subscribe(res => {
			res.map(item => {commits.push(item)});
			if(page < 20) {
			
				var prev = this.getUserCommits(urlString, ++page);
				//prev.map(item => {commits.push(item)});
				//	console.log(prev[0]);
				for(let commit of prev) {
					console.log(commit);
					commits.push(commit);
				//res.push(commit);
				}
			}
			console.log(commits.length);
			return res;
		
			//return this.get(`${url}&pageSize=2&page=${page}`);
        	});
		*/
		/*
		try{
			let i = 0;
			//while(i < 30) {
				console.log(urlString);
				this.httpClient.get(urlString).pipe(
				map((item: any) => item.map(p => <GitRepoInfo>
				{
					user: p.author.login as string,
					url: p.author.url as string,
					commits: '1'
					}))	
				).subscribe((datas) => {
					console.log(datas.length);
					if(datas.length == 0) {
						
					}
					for(let data of datas) {
						commits.push(data);
						if(data.user === "vivianmnguyen"){
							commitCounts[0]++;
                				}
                				if(data.user === "KaiboCai"){
							commitCounts[1]++;
                				}
                				if(data.user === "NFinks"){
							commitCounts[2]++;
                				}
                				if(data.user === "prilak"){
							commitCounts[3]++;
                				}
                				if(data.user === "NickPattie"){
							commitCounts[4]++;
                				}
                				if(data.user === "rkoripalli"){
							commitCounts[5]++;
                				}
						let sortedCommits: GitRepoInfo[] = [
						{
							user: 'vivianmnguyen',
							commits: commitCounts[0].toString()	
						},
						{
							user: 'KaiboCai',
							commits: commitCounts[1].toString()	
						},
						{
							user: 'NFinks',
							commits: commitCounts[2].toString()	
						},
						{
							user: 'prilak',
							commits: commitCounts[3].toString()	
						},
						{
							user: 'NickPattie',
							commits: commitCounts[4].toString()	
						},
						{
							user: 'rkoripalli',
							commits: commitCounts[5].toString()	
						}
						];
						console.log(sortedCommits);
						return sortedCommits;
					}
				});
				i++;
				//}
		}
		catch(e){
		//	console.log(commits);
		}
		finally{
			console.log(commits);
		//console.log(commits);
			for(let i of commits) {
				console.log('made it');
			}
			//		console.log(commitCounts);
			}*/
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
