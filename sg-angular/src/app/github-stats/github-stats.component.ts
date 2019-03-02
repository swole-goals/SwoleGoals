import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github-stats/github.service';

@Component({
    selector: 'app-github-stats',
    templateUrl: './github-stats.component.html',
    styleUrls: ['./github-stats.component.css']
})
export class GithubStatsComponent implements OnInit {

    public gitAccountList;
    public totalCommits = 0;
    constructor(private githubserv: GithubService) { }

    ngOnInit() {
        this.loadGithubRepos();
    }

    public loadGithubRepos() {
        this.githubserv.getUserRepos().subscribe((data) => {
            this.gitAccountList = data;

            this.gitAccountList.forEach(i => {
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
                }
                this.totalCommits += i.commits;
            });
        });
    }
}
