export type UserFile={
    id: number;
    name: string;
    ownerId: number;
    fileLink: string;
    encryptedLink: string;
    filePassword: string;
    fileType: string;
    createdAt: Date;
    isActive: boolean;

}
