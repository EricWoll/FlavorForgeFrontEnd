interface ICreator {
    creatorId: string;
    creatorUsername: string;
    creatorImageId: string;
    followerCount: number;
    creatorAboutText: string;
    creatorRole: string;

    followed: boolean | undefined;
}
