interface UserData {
  email: string;
  pfp: {
    img: {
      data: string;
      type?: string;
    };
  };
  name: string;
  friends: number;
  roomsCreated: number;
  joinedAt: string;
}

export default UserData;
