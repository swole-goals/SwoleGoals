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

//export class Account
