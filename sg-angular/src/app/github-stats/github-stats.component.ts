import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-github-stats',
  templateUrl: './github-stats.component.html',
  styleUrls: ['./github-stats.component.css']
})
export class GithubStatsComponent implements OnInit {

  public gitRepoList;
  constructor(private githubserv: GithubService) { }

  ngOnInit() {
      this.loadGithubRepos();
  }

  public loadGithubRepos() {
      this.githubserv.getUserRepos().subscribe((data) => {
          this.gitRepoList = data;
      });
  }
}
