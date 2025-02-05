import * as Yup from 'yup';
import { username, password } from '../../../utils/schemas';

const Schema = Yup.object().shape({
	username,
	password,
});

export default Schema;
