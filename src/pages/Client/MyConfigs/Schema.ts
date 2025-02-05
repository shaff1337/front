import * as Yup from 'yup';
import { text } from '../../../utils/schemas';

const Schema = Yup.object().shape({ text });

export default Schema;
