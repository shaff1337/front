import * as Yup from 'yup';
import { bool } from '../../../../utils/schemas';

const Schema = Yup.object().shape({ isVerified: bool });

export default Schema;
