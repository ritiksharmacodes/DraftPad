import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import supabase from './db.js'; 

async function insert_user(user_data) {
    if (user_data.auth_provider === 'google') {
        try {
            const { data, error } = await supabase
                .from('users')
                .insert([{ 
                    email: user_data.dataToBeStored.email, 
                    auth_provider: 'google', 
                    google_id: user_data.dataToBeStored.sub 
                }])
                .select('id'); 

            if (error) throw error;
            return data[0].id;

        } catch (error) {
            console.error("Supabase Google Insert Error:", error);
        }
    }
    else if (user_data.auth_provider === 'local') {
        try {
            const username = user_data.username;
            const password = user_data.password;
            const email = user_data.email;
            const auth_provider = user_data.auth_provider;

            const saltRounds = 10;
            const hashedPwd = await bcrypt.hash(password, saltRounds);
            
            const { data, error } = await supabase
                .from('users')
                .insert([{ 
                    username: username, 
                    email: email, 
                    password: hashedPwd, 
                    auth_provider: auth_provider 
                }])
                .select('id'); 

            if (error) throw error;
            return data[0].id;

        } catch (error) {
            console.error("Supabase Local Insert Error:", error);
        }
    }
}

const client = new OAuth2Client();

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  
    });
    const payload = ticket.getPayload();
    return payload;
}

async function checkIfUserExistsIntheDB(secretText, auth_provider, dataObj = {}) {
    if (auth_provider === 'google') {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('google_id', secretText);

            if (error) throw error;
            return data; 
            
        } catch (error) {
            console.error("Supabase Google Select Error:", error);
        }
    }
    else if (auth_provider === 'local') {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', dataObj.email);          

            if (error) throw error;

            if (!data || data.length === 0) {
                return "email_not_found"; 
            } else {
                const user = data[0]; 
                const returnedPWDhash = user.password;
                const passwordMatched = await bcrypt.compare(dataObj.password, returnedPWDhash);
                
                return [passwordMatched, user];
            }

        } catch (error) {
            console.error("Supabase Local Select Error:", error);
        }
    }
}

function createJWT(item, auth_provider) {
    if (auth_provider === 'google') {
        const token = jwt.sign({
            username: item.name,
            email: item.email
        }, process.env.SERVER_SECRET_FOR_JWT, { expiresIn: '7d' });

        return token;
    }
    else if (auth_provider === 'local') {
        const token = jwt.sign({
            username: item.username,
            email: item.email
        }, process.env.SERVER_SECRET_FOR_JWT, { expiresIn: '7d' });

        return token;
    }
}

export { insert_user, verify, checkIfUserExistsIntheDB, createJWT };