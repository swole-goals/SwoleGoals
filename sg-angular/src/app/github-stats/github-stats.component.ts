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
                }
                if(i.user === "KaiboCai"){
                    i.name = "Kaibo Cai";
                    i.bio = "Kaibo is an ECE Major graduating in December of 2019";
                    i.image = "../../assets/headshots/kaibo.jpg"
                }
                if(i.user === "NFinks"){
                    i.name = "Nicole Finks";
                    i.bio = "Nicole is an ECE Major graduating in December of 2019";
                    i.image = "../../assets/headshots/nicole.jpg"
                }
                if(i.user === "prilak"){
                    i.name = "Michael Lawrence";
                    i.bio = "Michael is an ECE Major graduating in May of 2019";
                    i.image = "../../assets/headshots/michael.jpg"
                }
                if(i.user === "NickPattie"){
                    i.name = "Nick Pattie";
                    i.bio = "Nick is a BME Major graduating in May of 2019";
                    i.image = "../../assets/headshots/nick.png"
                }
                if(i.user === "rkoripalli"){
                    i.name = "Rohan Koripalli";
                    i.bio = "Rohan is an ECE Major graduating in December of 2019";
                    i.image = "../../assets/headshots/rohan.png"
                }
                this.totalCommits += i.commits;
            });
        });
    }
}
