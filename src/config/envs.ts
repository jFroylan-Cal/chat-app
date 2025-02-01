import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    SOCKET_PORT: get('SOCKET_PORT').required().asPortNumber(),
}
