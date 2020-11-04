interface VuexState {
  users: User[];
  totalUsersCount: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
