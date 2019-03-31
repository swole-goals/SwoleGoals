import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github-stats/github.service';

@Component({
    selector: 'app-github-stats',
    templateUrl: './github-stats.component.html',
    styleUrls: ['./github-stats.component.css']
})
export class GithubStatsComponent implements OnInit {
/*
                if(i.user === "vivianmnguyen"){
                    i.name = "Vivian Nguyen";
                    i.bio = "Vivian is an ECE Major graduating in December of 2019";
                    i.image = "../../assets/headshots/vivian.jpg"
                    i.responsibilities = "Initialize CloudSQL database. Load web-scraped exercise data into database. " +
                      "Write notes for local database development. " +
                      "Write a script for automatically loading web-scraped text files"
                }
                if(i.user === "KaiboCai"){
                    i.name = "Kaibo Cai";
                    i.bio = "Kaibo is an ECE Major graduating in December of 2019";
                    i.image = "../../assets/headshots/kaibo.jpg"
                    i.responsibilities = "Set up the backend server using nodejs.  " +
                      "Connect the backend server with glcoud sql database. " +
                      "Create two Get request routers. Create user table in the database."
                }
                if(i.user === "NFinks"){
                    i.name = "Nicole Finks";
                    i.bio = "Nicole is an ECE Major graduating in December of 2019";
                    i.image = "../../assets/headshots/nicole.jpg"
                    i.responsibilities = "Create profile page using Bootstrap 4. Create basic aesthetic design to be " +
                      "used throughout front end. Standardization of css files. " +
                      "Correction of general front-end functionality errors."
                }
                if(i.user === "prilak"){
                    i.name = "Michael Lawrence";
                    i.bio = "Michael is an ECE Major graduating in May of 2019";
                    i.image = "../../assets/headshots/michael.jpg"
                    i.responsibilities = "Create map page and exercise list page. " +
                      "Add issue information on the about page. Work on initializing the scraping script."
                }
                if(i.user === "NickPattie"){
                    i.name = "Nick Pattie";
                    i.bio = "Nick is a BME Major graduating in May of 2019";
                    i.image = "../../assets/headshots/nick.png"
                    i.responsibilities = "Write Python script for webscraping on Bodybuilding.com utilizing selenium. " +
                      "Create test file for web scraping. " +
                      "Provide and load in exersise data into MySQL database."
                }
                if(i.user === "rkoripalli"){
                    i.name = "Rohan Koripalli";
                    i.bio = "Rohan is an ECE Major graduating in December of 2019";
                    i.image = "../../assets/headshots/rohan.png"
                    i.responsibilities = "Create angular project. Setup Bootstrap. Build Splash page and About page " +
                      "using Github API. Setup routing between Angular components."
*/
public gitAccountList = [	
					{
						user: 'vivianmnguyen',
						url: 'https://github.com/vivianmnguyen',
						commits: '0',
						name: 'Vivian Nguyen',
						bio: 'Vivian is an ECE Major graduating in December of 2019',
						image: '../../assets/headshots/vivian.jpg',
						responsibilities: "Initialize CloudSQL database. Load web-scraped exercise data into database. " +
                      "Write notes for local database development. " +
                      "Write a script for automatically loading web-scraped text files. Phase 2: "
					},
					{
						user: 'KaiboCai',
						url: 'https://github.com/KaiboCai',
						commits: '0',
						name: 'Kaibo Cai',
						bio: 'Kaibo is an ECE Major graduating in December of 2019',
						image: '../../assets/headshots/kaibo.jpg',
						responsibilities: "Set up the backend server using nodejs.  " +
                      "Connect the backend server with glcoud sql database. " +
                      "Create two Get request routers. Create user table in the database. Phase 2: Set up google firestore server, wrote routes for frontend post querying. Helped build login function and user profile page. "
					},
					{
						user: 'NFinks',
						url: 'https://github.com/NFinks',
						commits: '0',
						name: 'Nicole Finks',
						bio: 'Nicole is an ECE Major graduating in December of 2019',
						image: '../../assets/headshots/nicole.jpg',
						responsibilities: "Create profile page using Bootstrap 4. Create basic aesthetic design to be " +
                      "used throughout front end. Standardization of css files. " +
                      "Correction of general front-end functionality errors. Phase 2:"
					},
					{
						user: 'prilak',
						url: 'https://github.com/prilak',
						commits: '0',
						name: 'Michael Lawrence',
						bio: 'Michael is an ECE Major graduating in May of 2019',
						image: '../../assets/headshots/michael.jpg',
						responsibilities: "Create map page and exercise list page. " +
                      "Add issue information on the about page. Work on initializing the scraping script. Phase 2: Added filters and on click functionality to exercise list page. Created the exercise table page. Fixed issue with missing git commits. Fixed the exercise list table duplicates issue. Added tests for the sql database."
					},
					{
						user: 'NickPattie',
						url: 'https://github.com/NickPattie',
						commits: '0',
						name: 'Nick Pattie',
						bio: 'Nick is a BME Major graduating in May of 2019',
						image: '../../assets/headshots/nick.png',
						responsibilities: "Write Python script for webscraping on Bodybuilding.com utilizing selenium. " +
                      "Create test file for web scraping. " +
                      "Provide and load in exersise data into MySQL database. Phase 2: Created challenge creation page and saving the challenges in the new firebase datastore"
					},
					{
						user: 'rkoripalli',
						url: 'https://github.com/rkoripalli',
						commits: '0',
						name: 'Rohan Koripalli',
						bio: 'Rohan is an ECE Major graduating in December of 2019',
						image: '../../assets/headshots/rohan.png',
						responsibilities: "Create angular project. Setup Bootstrap. Build Splash page and About page " +
                      "using Github API. Setup routing between Angular components. Phase 2: Set up the google firestor server. Wrote some routers for front post query. Help build the login function and user profile page"
					}
					];
    public totalCommits = 0;
    public issues;
    public commits = [];
    constructor(private githubserv: GithubService) { }
   	
    ngOnInit() {
    	this.loadGithubRepos();
	this.loadGithubIssues();
    }
	public loadGithubIssues() {
		this.githubserv.getIssues().subscribe((data) => {
			this.issues = data;	
		});
	}
	public loadService(page){
		var urlString = `https://api.github.com/repositories/168768624/commits?page=`;
		this.githubserv.getUserCommits(urlString, page).subscribe(item => {
		var cs = item as Array<any>;
		//console.log(item.length);
		//	for(let item of item)
			
			if(cs.length != null && cs.length > 0) {
				cs.forEach(commit => {this.commits.push(commit)});	
				this.loadService(++page);
				console.log(this.commits);
				}
				
			else {//done
				var commitCounts = [0, 0, 0, 0, 0, 0];
				
				this.commits.forEach(commit => {
					var user = 'rkoripalli';
					if(commit.author != null)
						user = commit.author.login;
					if(user === "vivianmnguyen"){
                                                        commitCounts[0]++;
                                                }
                                                if(user === "KaiboCai"){
                                                        commitCounts[1]++;
                                                }
                                                if(user === "NFinks"){
                                                        commitCounts[2]++;
                                                }
                                                if(user === "prilak"){
                                                        commitCounts[3]++;
                                                }
                                                if(user === "NickPattie"){
                                                        commitCounts[4]++;
                                                }
                                                if(user === "rkoripalli"){
                                                        commitCounts[5]++;
                                                }	
						});
				this.gitAccountList[0].commits = commitCounts[0].toString();
				this.gitAccountList[1].commits = commitCounts[1].toString();
				this.gitAccountList[2].commits = commitCounts[2].toString();
				this.gitAccountList[3].commits = commitCounts[3].toString();
				this.gitAccountList[4].commits = commitCounts[4].toString();
				this.gitAccountList[5].commits = commitCounts[5].toString();
				console.log(commitCounts);
				this.totalCommits = 0;
				commitCounts.forEach(count => this.totalCommits += count);
			}
			
		});
	}
	public loadGithubRepos() {
	this.loadService(1);
	/*
	this.githubserv.getUserRepos().subscribe((data) => {
            this.gitAccountList = data;
		
            this.gitAccountList.forEach(i => {
                }
                this.totalCommits += i.commits;
            });
	    });
	    */
    }
}
