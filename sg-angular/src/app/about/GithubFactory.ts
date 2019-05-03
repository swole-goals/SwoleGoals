export interface GithubFactory {
  getAccount(accountName: string): Account;
  getAll(): Array<Account>;  
  getAllCommits(): number;
  clearAllCommits(): void;  
}

export class SwoleGoalsFactory implements GithubFactory{
  
  public getAccount(accountName: string): Account {
    if(accountName === "vivianmnguyen") {
    	return Vivian.getInstance();
    }
    if(accountName === "KaiboCai") {
    	return Kaibo.getInstance();
    }
    if(accountName === "NFinks") {
    	return Nicole.getInstance();
    }
    if(accountName === "prilak") {
    	return Michael.getInstance();
    }
    if(accountName === "NickPattie") {
    	return Nick.getInstance();
    }
    if(accountName === "rkoripalli") {
    	return Rohan.getInstance();
    }
    return null;
  }
  public getAll() : Array<Account>{
    let result = [];
    result.push(Vivian.getInstance());
    result.push(Kaibo.getInstance());
    result.push(Nicole.getInstance());
    result.push(Michael.getInstance());
    result.push(Nick.getInstance());
    result.push(Rohan.getInstance());
    return result;
  }
  public getAllCommits(): number{
    let total = 0;
    total += Number(Vivian.getInstance().commits);
    total += Number(Kaibo.getInstance().commits);
    total += Number(Nicole.getInstance().commits);
    total += Number(Michael.getInstance().commits);
    total += Number(Nick.getInstance().commits);
    total += Number(Rohan.getInstance().commits);
    return total;
  }
  public clearAllCommits(): void {
    Vivian.getInstance().clearCommits();  
    Kaibo.getInstance().clearCommits();  
    Nicole.getInstance().clearCommits();  
    Michael.getInstance().clearCommits();  
    Nick.getInstance().clearCommits();  
    Rohan.getInstance().clearCommits();  
  }
}

export interface Account {
  user: string;
  url: string;
  commits: string;
  name: string;
  bio: string;
  image: string;
  responsibilities: string;
  increment(): void;
  clearCommits(): void;
}

export class Vivian implements Account {
  public user: string;
  public url: string;
  public commits: string;
  public name: string;
  public bio: string;
  public image: string;
  public responsibilities: string;
  
  private static instance: Account = new Vivian();
  private constructor() {
    this.user = 'vivianmnguyen';
    this.url = 'https://github.com/vivianmnguyen';
    this.commits = '0';
    this.name = 'Vivian Nguyen';
    this.bio = 'Vivian is an ECE Major graduating in December of 2019';
    this.image = '../../assets/headshots/vivian.jpg';
    this.responsibilities = "Initialize CloudSQL database. Load web-scraped exercise data into database. " +
    "Write notes for local database development. " +
    "Write a script for automatically loading web-scraped text files. Phase 2: " + 
    "Tested backend firestore service for adding members to a group. " + 
    "Phase 3: Set up backend API used by GameMap and Leaderboard for creating a challenge results object containing the number of repetitions the user completes. ";
  }
  public static getInstance() : Account {
    return Vivian.instance;
  }
  public increment(): void {
    let total = Number(this.commits);
    total++;
    this.commits = String(total);
  }
  public clearCommits(): void {
    this.commits = '0';
  }
}

export class Rohan implements Account {
  public user: string;
  public url: string;
  public commits: string;
  public name: string;
  public bio: string;
  public image: string;
  public responsibilities: string;
  
  private static instance: Account = new Rohan();
  private constructor() {
    this.user = 'rkoripalli';
    this.url = 'https://github.com/rkoripalli';
    this.commits = '0';
    this.name = 'Rohan Koripalli';
    this.bio = 'Rohan is an ECE Major graduating in December of 2019';
    this.image = '../../assets/headshots/rohan.png';
    this.responsibilities = "Create angular project. Setup Bootstrap. Build Splash page and About page " +
    "using Github API. Setup routing between Angular components. Phase 2: Moved frontend to AWS. Added Travis CI for testing and automatic deployment to AWS. Setup Angular build and production environments. Worked on the user profile page and new group creation, helped with backend server for Firestore. Phase 3: Created User and Group services for getting data from backend to allow for a centralized location to get this data from different components. Updated UI for consistency across pages. Created Postman tests for backend servers."; 
  }    
  public static getInstance() : Account {
    return Rohan.instance;
  }
  public increment(): void {
    let total = Number(this.commits);
    total++;
    this.commits = String(total);
  }
  public clearCommits(): void {
    this.commits = '0';
  }
}

export class Michael implements Account {
  public user: string;
  public url: string;
  public commits: string;
  public name: string;
  public bio: string;
  public image: string;
  public responsibilities: string;
  
  private static instance: Account = new Michael();
  private constructor() {
    this.user = 'prilak';
    this.url = 'https://github.com/prilak';
    this.commits = '0';
    this.name = 'Michael Lawrence';
    this.bio = 'Michael is an ECE Major graduating in May of 2019';
    this.image = '../../assets/headshots/michael.jpg';
    this.responsibilities = "Create map page and exercise list page. " +
    "Add issue information on the about page. Work on initializing the scraping script. Phase 2: Added filters and on click functionality to exercise list page. Created the exercise table page. Fixed issue with missing git commits. Fixed the exercise list table duplicates issue. Added tests for the sql database. Phase 3: Finalized format for performance table, Game Map, Exercise Result, Current Exercise. Added exercise selection and results initialization functionality to Game Map. Created Game Map, Exercise Result, and Current Exercise page. Established connection for entering user results on the frontend.";
  }
  public static getInstance() : Account {
    return Michael.instance;
  }
  public increment(): void {
    let total = Number(this.commits);
    total++;
    this.commits = String(total);
  }
  public clearCommits(): void {
    this.commits = '0';
  }
}
export class Nick implements Account {
  public user: string;
  public url: string;
  public commits: string;
  public name: string;
  public bio: string;
  public image: string;
  public responsibilities: string;
  
  private static instance: Account = new Nick();
  private constructor() {
    this.user = 'NickPattie';
    this.url = 'https://github.com/NickPattie';
    this.commits = '0';
    this.name = 'Nick Pattie';
    this.bio = 'Nick is a BME Major graduating in May of 2019';
    this.image = '../../assets/headshots/nick.png';
    this.responsibilities = "Write Python script for webscraping on Bodybuilding.com utilizing selenium. " +
    "Create test file for web scraping. " +
    "Provide and load in exersise data into MySQL database. Phase 2: Created challenge creation page and saving the challenges in the new firebase datastore. Phase 3: Connected challenge creation to the backend and the rest of the components. Made the leaderboard component. Helped fix/make various http post and get requests to share information between the different components.";
  }
  public static getInstance() : Account {
    return Nick.instance;
  }
  public increment(): void {
    let total = Number(this.commits);
    total++;
    this.commits = String(total);
  }
  public clearCommits(): void {
    this.commits = '0';
  }
}
export class Kaibo implements Account {
  public user: string;
  public url: string;
  public commits: string;
  public name: string;
  public bio: string;
  public image: string;
  public responsibilities: string;
  
  private static instance: Account = new Kaibo();
  private constructor() {
    this.user = 'KaiboCai';
    this.url = 'https://github.com/KaiboCai';
    this.commits = '0';
    this.name = 'Kaibo Cai';
    this.bio = 'Kaibo is an ECE Major graduating in December of 2019';
    this.image = '../../assets/headshots/kaibo.jpg';
    this.responsibilities = "Set up the backend server using nodejs.  " +
    "Connect the backend server with glcoud sql database. " +
    "Create two Get request routers. Create user table in the database. Phase 2: Set up google firestore server, wrote routes for frontend post querying. Helped build login function and user profile page. Phase 3: Added and modified routers for firestore and sql server to ensure front end functionalities. Help with setting up challenge group reference function on front end and firestore server. Help re-setting the dataservice inside the Angular framework.";
  }
  public static getInstance() : Account {
    return Kaibo.instance;
  }
  public increment(): void {
    let total = Number(this.commits);
    total++;
    this.commits = String(total);
  }
  public clearCommits(): void {
    this.commits = '0';
  }
}
export class Nicole implements Account {
  public user: string;
  public url: string;
  public commits: string;
  public name: string;
  public bio: string;
  public image: string;
  public responsibilities: string;
  
  private static instance: Account = new Nicole();
  private constructor() {
    this.user = 'NFinks';
    this.url = 'https://github.com/NFinks';
    this.commits = '0';
    this.name = 'Nicole Finks';
    this.bio = 'Nicole is an ECE Major graduating in December of 2019';
    this.image = '../../assets/headshots/nicole.jpg';
    this.responsibilities = "Create profile page using Bootstrap 4. Create basic aesthetic design to be " +
    "used throughout front end. Standardization of css files. " +
    "Correction of general front-end functionality errors. Phase 2: Countinued to modify the User Profile Page. Phase 3: Worked on formatting the Map page. Added a home page for the website. Fixed errors caused by html sytax that shut down the login capbabilities.  ";
  }
  public static getInstance() : Account {
    return Nicole.instance;
  }
  public increment(): void {
    let total = Number(this.commits);
    total++;
    this.commits = String(total);
  }
  public clearCommits(): void {
    this.commits = '0';
  }
}
