export interface IPost {
    id: number,
    title: string,
    body: string,
    date?: any,
    userId: number,
    reactions?: IReactions
}

export interface IPAramPost {
    title: string,
    userId: number,
    body: string,
}

export interface IReactions {
    thumbsUp: number,
    heart: number,
}

export interface IUser {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string
        }
    }
}