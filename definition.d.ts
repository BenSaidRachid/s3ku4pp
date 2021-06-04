interface Task {
    id: number;
    content: String;
    isComplete: Boolean;
    user: User;
}

interface User {
    id: number;
    email: String;
    firstname: String;
    lastname: String;
    password: String;
    tasks: Task[];
}


type ResponseError = {
    status: number;
    message: string;
};