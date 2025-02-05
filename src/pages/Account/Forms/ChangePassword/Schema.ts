import * as Yup from 'yup';
import { password, confirmPassword } from '../../../../utils/schemas';

const Schema = Yup.object().shape({
	currentPassword: password,
	password,
	confirmPassword,
});

export default Schema;
