export class Challenge {
    challenge: String;
    exercises: Array<string>;
}

export class Group {
    challenge: String;
    users: Array<string>;
}

export class UserObj {
    userEmail: String;
    result: -1;
}

export class UserResultObj {
    exerciseName: String;
    userObj: Array<any>;
}

export class ResultObj {
    challengeName: String;
    groupID: String;
    resultList: Array<UserResultObj>;
}

export class DocData {
    docDataObject: ResultObj
}
