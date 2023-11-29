import User from '../types/user';

type RootStackParamList = {
  Home: undefined;
  UserDetails: {user: User};
};

export default RootStackParamList;
