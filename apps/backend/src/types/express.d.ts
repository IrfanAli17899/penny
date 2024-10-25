import { User } from '../users/user.schema'; 

declare global {
    interface Request {
        user?: User;
    }
    
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}