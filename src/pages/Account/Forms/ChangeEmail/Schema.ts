import * as Yup from 'yup';
import { email, confirmEmail } from '../../../../utils/schemas';

const Schema = Yup.object().shape({
	email,
	confirmEmail,
});

export default Schema;
