export class GithubFactory {
  getAccount(accountName: string): Account {
    return new Account();
  }
}

export class SwoleGoalsFactory implements GithubFactory{
  
  getAccount(accountName: string): Account {
    if(accountName === "vivianmnguyen") {
    	return new Vivian();
    }
    if(accountName === "KaiboCai") {
    	return new Kaibo();
    }
    if(accountName === "NFinks") {
    	return new Nicole();
    }
    if(accountName === "prilak") {
    	return new Michael();
    }
    if(accountName === "NickPattie") {
    	return new Nick();
    }
    if(accountName === "rkoripalli") {
    	return new Rohan();
    }
    
  }
}

export class Account {
  user: string;
  url: string;
  commits: string;
  name: string;
  bio: string;
  image: string;
  responsibilities: string;
  public getInstance: Account() {
    return null;
  }
}

export class Vivian implements Account {
  private static instance: Account = new Vivian();
  private constructor() {
    user = 'vivianmnguyen';
    url = 'https://github.com/vivianmnguyen';
    commits = '0';
    name = 'Vivian Nguyen';
    bio = 'Vivian is an ECE Major graduating in December of 2019';
    image = '../../assets/headshots/vivian.jpg';
    responsibilities = "Initialize CloudSQL database. Load web-scraped exercise data into database. " +
    "Write notes for local database development. " +
    "Write a script for automatically loading web-scraped text files. Phase 2: ";
  }
  public getInstance: Account() {
    return Vivian.instance;
  }
}

export class Rohan implements Account {
  private static instance: Account = new Rohan();
  private constructor() {
    user = 'rkoripalli';
    url = 'https://github.com/rkoripalli';
    commits = '0';
    name = 'Rohan Koripalli';
    bio = 'Rohan is an ECE Major graduating in December of 2019';
    image = '../../assets/headshots/rohan.png';
    responsibilities = "Create angular project. Setup Bootstrap. Build Splash page and About page " +
    "using Github API. Setup routing between Angular components. Phase 2: Moved frontend to AWS. Added Travis CI for testing and automatic deployment to AWS. Setup Angular build and production environments. Worked on the user profile page and new group creation, helped with backend server for Firestore. Phase 3: Created User and Group services for getting data from backend to allow for a centralized location to get this data from different components. Updated UI for consistency across pages. Created Postman tests for backend servers."; 
  }    
  public getInstance: Account() {
    return Rohan.instance;
  }
}

export class Michael implements Account {
  private static instance: Account = new Michael();
  private constructor() {
    user = 'prilak';
    url = 'https://github.com/prilak';
    commits = '0';
    name = 'Michael Lawrence';
    bio = 'Michael is an ECE Major graduating in May of 2019';
    image = '../../assets/headshots/michael.jpg';
    responsibilities = "Create map page and exercise list page. " +
    "Add issue information on the about page. Work on initializing the scraping script. Phase 2: Added filters and on click functionality to exercise list page. Created the exercise table page. Fixed issue with missing git commits. Fixed the exercise list table duplicates issue. Added tests for the sql database. Phase 3: Finalized format for performance table, Game Map, Exercise Result, Current Exercise. Added exercise selection and results initialization functionality to Game Map. Created Game Map, Exercise Result, and Current Exercise page. Established connection for entering user results on the frontend.";
  }
  public getInstance: Account() {
    return Michael.instance;
  }
}
export class Nick implements Account {
  private static instance: Account = new Nick();
  private constructor() {
    user = 'NickPattie';
    url = 'https://github.com/NickPattie';
    commits = '0';
    name = 'Nick Pattie';
    bio = 'Nick is a BME Major graduating in May of 2019';
    image = '../../assets/headshots/nick.png';
    responsibilities = "Write Python script for webscraping on Bodybuilding.com utilizing selenium. " +
    "Create test file for web scraping. " +
    "Provide and load in exersise data into MySQL database. Phase 2: Created challenge creation page and saving the challenges in the new firebase datastore. Phase 3: Connected challenge creation to the backend and the rest of the components. Made the leaderboard component. Helped fix/make various http post and get requests to share information between the different components.";
  }
  public getInstance: Account() {
    return Nick.instance;
  }
}
export class Kaibo implements Account {
  private static instance: Account = new Kaibo();
  private constructor() {
    user = 'KaiboCai';
    url = 'https://github.com/KaiboCai';
    commits = '0';
    name = 'Kaibo Cai';
    bio = 'Kaibo is an ECE Major graduating in December of 2019';
    image = '../../assets/headshots/kaibo.jpg';
    responsibilities = "Set up the backend server using nodejs.  " +
    "Connect the backend server with glcoud sql database. " +
    "Create two Get request routers. Create user table in the database. Phase 2: Set up google firestore server, wrote routes for frontend post querying. Helped build login function and user profile page. Phase 3: Added and modified routers for firestore and sql server to ensure front end functionalities. Help with setting up challenge group reference function on front end and firestore server. Help re-setting the dataservice inside the Angular framework.";
  }
  public getInstance: Account() {
    return Kaibo.instance;
  }
}
export class Nicole implements Account {
  private static instance: Account = new Nicole();
  private constructor() {
    user = 'NFinks';
    url = 'https://github.com/NFinks';
    commits = '0';
    name = 'Nicole Finks';
    bio = 'Nicole is an ECE Major graduating in December of 2019';
    image = '../../assets/headshots/nicole.jpg';
    responsibilities = "Create profile page using Bootstrap 4. Create basic aesthetic design to be " +
    "used throughout front end. Standardization of css files. " +
    "Correction of general front-end functionality errors. Phase 2:. Phase 3: ";
  }
  public getInstance: Account() {
    return Nicole.instance;
  }
}
