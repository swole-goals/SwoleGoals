import { Component, OnInit } from '@angular/core';
import { GithubService } from './github.service';
import { GithubFactory, SwoleGoalsFactory, Account, Vivian, Kaibo, Nick, Nicole, Rohan, Michael } from './GithubFactory';


@Component({
	selector: 'app-about',
	templateUrl: './about.html',
	styleUrls: ['./about.css']
})
export class AboutComponent implements OnInit {
  public factory: GithubFactory = new SwoleGoalsFactory();
  public gitAccountList: Array<Account> = [];
	public totalCommits: number = 0;
	public issues;
	public commits = [];
	constructor(private githubserv: GithubService) { 
		this.gitAccountList = this.factory.getAll();
	
	}

	ngOnInit() {
		this.loadGithubRepos();
		this.loadGithubIssues();
	}
	public loadGithubIssues() {
		this.githubserv.getIssues().subscribe((data) => {
			this.issues = data;
		});
	}
	public loadService(page) {
		var urlString = `https://api.github.com/repositories/168768624/commits?page=`;
		this.githubserv.getUserCommits(urlString, page).subscribe(item => {
			var cs = item as Array<any>;

			if (cs.length != null && cs.length > 0) {
				cs.forEach(commit => { this.commits.push(commit) });
				this.loadService(++page);
			}
			
			else {//done
				var commitCounts = [0, 0, 0, 0, 0, 0];

				this.commits.forEach(commit => {
				        var user = 'rkoripalli';
					
					if (commit.author != null)
						user = commit.author.login;
					let a = this.factory.getAccount(user);
					a.increment();
				});
				this.totalCommits = this.factory.getAllCommits();
			}

		});
	}
	public loadGithubRepos() {
		this.loadService(1);
	}
}
