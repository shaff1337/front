import * as Yup from 'yup';
import { role } from '../../../../utils/schemas';

const Schema = Yup.object().shape({ role });

export default Schema;
