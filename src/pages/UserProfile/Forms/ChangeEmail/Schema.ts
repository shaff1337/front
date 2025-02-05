import * as Yup from 'yup';
import { email } from '../../../../utils/schemas';

const Schema = Yup.object().shape({ email });

export default Schema;
