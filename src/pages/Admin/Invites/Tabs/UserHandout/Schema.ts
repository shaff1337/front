import * as Yup from 'yup';
import { text, amount } from '../../../../../utils/schemas';

const Schema = Yup.object().shape({
	text,
	amount,
});

export default Schema;
