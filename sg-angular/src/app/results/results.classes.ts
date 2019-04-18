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

export class ResultObj {
    exerciseName: String;
    //userObj: Array<UserObj>;
}