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
            this.gitAccountList.name = "Test";
        });
    }

    public addPersonInfo(){
        this.gitAccountList.forEach(element => {
        });
    }
}
