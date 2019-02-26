import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
    selector: 'app-github-stats',
    templateUrl: './github-stats.component.html',
    styleUrls: ['./github-stats.component.css']
})
export class GithubStatsComponent implements OnInit {
    public gitAccountList;
    constructor(private githubserv: GithubService) { }

    ngOnInit() {
        this.loadGithubRepos();
    }

    public loadGithubRepos() {
        this.githubserv.getUserRepos().subscribe((data) => {
            this.gitAccountList = data;
            this.gitAccountList[0].name = "Vivian Nguyen";
            this.gitAccountList[0].bio = "Vivian is an ECE Major graduating in December of 2019";
            this.gitAccountList[0].image = "../../assets/images/vivian.jpg"

            this.gitAccountList[1].name = "Kaibo Cai";
            this.gitAccountList[1].bio = "Kaibo is an ECE Major graduating in December of 2019";
            this.gitAccountList[1].image = "../../assets/images/kaibo.jpg"

            this.gitAccountList[2].name = "Nicole Finks";
            this.gitAccountList[2].bio = "Nicole is an ECE Major graduating in December of 2019";
            this.gitAccountList[2].image = "../../assets/images/nicole.jpg"

            this.gitAccountList[3].name = "Michael Lawrence";
            this.gitAccountList[3].bio = "Michael is an ECE Major graduating in May of 2019";
            this.gitAccountList[3].image = "../../assets/images/michael.jpg"

            this.gitAccountList[4].name = "Nick Pattie";
            this.gitAccountList[4].bio = "Nick is a BME Major graduating in May of 2019";
            this.gitAccountList[4].image = "../../assets/images/nick.png"

            this.gitAccountList[5].name = "Rohan Koripalli";
            this.gitAccountList[5].bio = "Rohan is an ECE Major graduating in December of 2019";
            this.gitAccountList[5].image = "../../assets/images/rohan.png"
        });
    }

    public addPersonInfo(){
        this.gitAccountList.forEach(element => {
        });
    }
}
