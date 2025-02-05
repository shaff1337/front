import { useOutletContext } from 'react-router-dom';
import { UserContextType } from './IUser';

function useUser(): UserContextType {
	return useOutletContext<UserContextType>();
}

export default useUser;
