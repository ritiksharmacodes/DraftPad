import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import { processDelta } from "./services/exportNotes.js";
import supabase from './services/db.js'; 
import { insert_user, verify, checkIfUserExistsIntheDB, createJWT } from './services/auth.js';


const app = express();

const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}));


// -----------------------------user-defined middlewares-----------------------------------//

// updated
async function checkForUniquenessOfEmailANDusername(req, res, next) {
  try {
    // 1. Check Email
    const { data: emailResults, error: emailError } = await supabase
      .from('users')
      .select('id')
      .eq('email', req.body.email);

    if (emailError) throw emailError;

    // 2. Check Username
    const { data: usernameResults, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('username', req.body.username);

    if (userError) throw userError;

    const emailExists = emailResults.length > 0;
    const usernameExists = usernameResults.length > 0;

    if (!emailExists && !usernameExists) {
      // yaani ki email bhi unique hai aur usrname bhi unique
      next();
    }
    else if (emailExists && !usernameExists) {
      // yaani ki email unique nhi hai but usrname unique hai
      res.status(409).json({ err_no: 1062, err_code: 'ER_DUP_ENTRY', err_for: "email" });
    }
    else if (!emailExists && usernameExists) {
      // yaani ki email unique hai but usrname unique nhi hai
      res.status(409).json({ err_no: 1062, err_code: 'ER_DUP_ENTRY', err_for: "username" });
    }
    else {
      // dono hee unique nahi hai
      res.status(409).json({ err_no: 1062, err_code: 'ER_DUP_ENTRY', err_for: ["email", "username"] });
    }

  } catch (error) {
    console.error("Uniqueness Check Error:", error);
    // Added a server response so the frontend doesn't hang if the DB fails
    res.status(500).json({ error: "Database error during validation" }); 
  }
}

// updated
function verifyJWTandReturnUserID(request, response, next) {
  const token = request.headers.authorization?.split(' ')[1];

  jwt.verify(token, process.env.SERVER_SECRET_FOR_JWT, function (err, decoded) {
    if (err) {
      return response.status(401).json({ msg: err.message });
    }
    else {
      (async () => {
        try {
          const { data, error } = await supabase
            .from('users')
            .select('id')
            .eq('email', decoded.email)
            .single(); 

          if (error) throw error;
          
          request.decodedEmailKiUserID = data.id;
          next();

        } catch (error) {
          console.error("Middleware Error:", error);
          response.status(500).json({ error: "Auth lookup failed" });
        }
      })();
    }
  });
}

// -----------------------------all of the routes below------------------------------------//

// updated
app.post('/exportAsText', async (request, response) => {
  console.log('Request aa gyi hai -- docx banane vaste');

  try {
    const delta = request.body.delta;

    // Await the delta processing
    const data = await processDelta(delta, 'docx');
    
    // Await the buffer conversion
    const arrBuff = await data.arrayBuffer();
    const buffer = Buffer.from(arrBuff);
    
    // Send the response
    response.set('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    response.send(buffer);
    
    console.log(`Response has been sent -- docx bana di thi`);

  } catch (error) {
    console.error("DOCX Export Error:", error);
    // Always good to send a proper error status back to the frontend
    response.status(500).json({ error: "Failed to generate DOCX document" }); 
  }
});

// updated
app.post('/exportAsPdf', async (request, response) => {
  console.log('Request aa gyi hai -- pdf banane vaste');

  try {
    const delta = request.body.delta;

    // Await the delta processing
    const data = await processDelta(delta, 'pdf');
    
    // Await the buffer conversion
    const arrBuff = await data.arrayBuffer();
    const buffer = Buffer.from(arrBuff);
    
    // Send the response
    response.set('Content-Type', 'application/pdf');
    response.send(buffer);
    
    console.log(`Response has been sent -- pdf bana di thi`);

  } catch (error) {
    console.error("PDF Export Error:", error);
    // Added 500 response so the frontend knows if it failed
    response.status(500).json({ error: "Failed to generate PDF document" }); 
  }
});

// updated
app.get('/fetchAllFolders', verifyJWTandReturnUserID, async (request, response) => {
  try {
    const { data, error } = await supabase
      .from('folder')
      .select('*')
      .eq('user_id', request.decodedEmailKiUserID);

    if (error) throw error;

    // Send the data back, or an empty array if they don't have any folders yet
    response.json(data || []);

  } catch (error) {
    console.error("Fetch Folders Error:", error);
    response.status(500).json({ error: "Failed to fetch folders" });
  }
});

// updated
app.post('/createFolder', verifyJWTandReturnUserID, async (request, response) => {
  try {
    const body = request.body;
    
    // Cleanly handle the string 'null' from the frontend
    const parentId = body.parent_id === 'null' ? null : parseInt(body.parent_id);

    const { data, error } = await supabase
      .from('folder')
      .insert([{ 
        title: body.title, 
        parent_id: parentId, 
        user_id: parseInt(request.decodedEmailKiUserID) 
      }])
      .select(); // This instantly returns the inserted row!

    if (error) throw error;

    const insertedRow = data[0];

    return response.json({ 
      id_of_created_folder: insertedRow.id, 
      created_row: insertedRow 
    });

  } catch (error) {
    console.error("Create Folder Error:", error);
    response.status(500).json({ error: "Failed to create folder" });
  }
});

// updated
app.post('/createNote', verifyJWTandReturnUserID, async (request, response) => {
  try {
    const Body = request.body;

    // Cleanly handle the string 'null' from the frontend
    const parentId = Body.parent_id === 'null' ? null : parseInt(Body.parent_id);

    const { data, error } = await supabase
      .from('note')
      .insert([{ 
        title: Body.title, 
        parent_id: parentId, 
        user_id: parseInt(request.decodedEmailKiUserID) 
        // 'content' will automatically default to NULL in your Supabase table
      }])
      .select(); // Instantly captures the newly created row!

    if (error) throw error;

    const insertedRow = data[0];

    return response.json({ 
      id_of_created_note: insertedRow.id, 
      created_row: insertedRow 
    });

  } catch (error) {
    console.error("Create Note Error:", error);
    response.status(500).json({ error: "Failed to create note" });
  }
});

// updated
app.delete('/deleteItem', verifyJWTandReturnUserID, async (request, response) => {
  try {
    const id = parseInt(request.query.id);
    const dataType = request.query.data_type; // 'folder' or 'note'
    const userId = parseInt(request.decodedEmailKiUserID);

    // Dynamically set the table name ('folder' or 'note')
    const table = dataType === 'folder' ? 'folder' : 'note';

    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;

    response.json({ msg: `successfully deleted the ${dataType} with id number ${id}` });

  } catch (error) {
    console.error("Delete Item Error:", error);
    response.status(500).json({ error: `Failed to delete ${request.query.data_type || 'item'}` });
  }
});

// updated
app.put('/updateTheParentID', verifyJWTandReturnUserID, async (request, response) => {
  try {
    const Body = request.body;
    const userId = parseInt(request.decodedEmailKiUserID);
    const newParentId = parseInt(Body.folderJiskeAndarDaalnaHai_id);
    
    // 1. Dynamically determine the target table
    const table = Body.data_type === 'folder' ? 'folder' : 'note';
    
    // 2. Dynamically extract the target item's ID based on type
    const targetId = Body.data_type === 'folder' 
      ? parseInt(Body.folderToBeChanged_id) 
      : parseInt(Body.noteToBeChanged_id);

    // 3. Perform the update and grab the updated row in one go
    const { data, error } = await supabase
      .from(table)
      .update({ parent_id: newParentId })
      .eq('id', targetId)
      .eq('user_id', userId)
      .select();

    if (error) throw error;

    response.json({ 
      msg: `Done with updating the parent_id of the ${Body.data_type}`, 
      updated_row: data[0] 
    });

  } catch (error) {
    console.error("Update Parent ID Error:", error);
    response.status(500).json({ error: "Failed to move the item to the new folder location" });
  }
});

// updated
app.put('/updateTheParentIDSetNull', verifyJWTandReturnUserID, async (request, response) => {
  try {
    const Body = request.body;
    const userId = parseInt(request.decodedEmailKiUserID);
    const targetId = parseInt(Body.itemToBeChanged_id);

    // 1. Dynamically determine the target table
    const table = Body.data_type === 'folder' ? 'folder' : 'note';

    // 2. Perform the update setting parent_id to null and return the row
    const { data, error } = await supabase
      .from(table)
      .update({ parent_id: null })
      .eq('id', targetId)
      .eq('user_id', userId)
      .select();

    if (error) throw error;

    response.json({ 
      msg: `Done with updating the parent_id of the ${Body.data_type}`, 
      updated_row: data[0] 
    });

  } catch (error) {
    console.error("Update Parent ID Set Null Error:", error);
    response.status(500).json({ error: "Failed to move the item to the root folder" });
  }
});

// updated
app.put('/changeTheTitle', verifyJWTandReturnUserID, async (request, response) => {
  try {
    const Body = request.body;
    const userId = parseInt(request.decodedEmailKiUserID);
    const targetId = parseInt(Body.id);

    // 1. Dynamically determine the target table ('folder' or 'note')
    const table = Body.type === 'folder' ? 'folder' : 'note';

    // 2. Perform the update and grab the updated row in one go
    const { data, error } = await supabase
      .from(table)
      .update({ title: Body.changed_title })
      .eq('id', targetId)
      .eq('user_id', userId)
      .select();

    if (error) throw error;

    response.json({ 
      msg: `Changed the title of the ${Body.type}`, 
      updated_row: data[0] 
    });

  } catch (error) {
    console.error("Change Title Error:", error);
    response.status(500).json({ error: `Failed to change the title of the ${request.body.type || 'item'}` });
  }
});

// updated
app.put('/drag_dropShiftingIDsetterRoute', verifyJWTandReturnUserID, async (request, response) => {
  try {
    const Body = request.body;
    const userId = parseInt(request.decodedEmailKiUserID);
    const targetId = parseInt(Body.dragstartWalaEl_id);
    const newParentId = parseInt(Body.jisFolderPeDropKringVoh_id);

    // 1. Dynamically determine the target table ('folder' or 'note')
    const table = Body.dragstartWalaEl_type === 'folder' ? 'folder' : 'note';

    // 2. Update parent_id and fetch the modified row in one network request
    const { data, error } = await supabase
      .from(table)
      .update({ parent_id: newParentId })
      .eq('id', targetId)
      .eq('user_id', userId)
      .select();

    if (error) throw error;

    // 3. Keep your custom Hinglish success messages matching the type
    const successMsg = Body.dragstartWalaEl_type === 'folder' 
      ? 'drag-drop se shifting kra di folder ki' 
      : 'drag-drop se shifting kra di note ki';

    response.json({ 
      msg: successMsg, 
      updated_row: data[0] 
    });

  } catch (error) {
    console.error("Drag & Drop Shifting Error:", error);
    response.status(500).json({ error: "Failed to shift the item during drag and drop" });
  }
});

// updated
app.get('/childrenOfTheFolderFetcherRoute', verifyJWTandReturnUserID, async (request, response) => {
  try {
    const id = parseInt(request.query.id);
    const userId = parseInt(request.decodedEmailKiUserID);

    // 1. Fetch all child folders
    const { data: folders, error: folderError } = await supabase
      .from('folder')
      .select('*')
      .eq('parent_id', id)
      .eq('user_id', userId);

    if (folderError) throw folderError;

    // 2. Fetch all child notes
    const { data: notes, error: noteError } = await supabase
      .from('note')
      .select('*')
      .eq('parent_id', id)
      .eq('user_id', userId);

    if (noteError) throw noteError;

    // 3. Combine both collections into a single flat array
    const finalData = [...(folders || []), ...(notes || [])];

    return response.json(finalData);

  } catch (error) {
    console.error("Fetch Children Error:", error);
    response.status(500).json({ error: "Failed to fetch children elements of this folder" });
  }
});

// updated
app.get('/fetchAllDataOfParticularId', async (request, response) => {
  try {
    const id = parseInt(request.query.id);

    // 1. Fetch folders belonging to this parent ID
    const { data: folders, error: folderError } = await supabase
      .from('folder')
      .select('*')
      .eq('parent_id', id);

    if (folderError) throw folderError;

    // 2. Fetch notes belonging to this parent ID
    const { data: notes, error: noteError } = await supabase
      .from('note')
      .select('*')
      .eq('parent_id', id);

    if (noteError) throw noteError;

    // 3. Combine both results into a single flattened array
    const flatArr = [...(folders || []), ...(notes || [])];

    response.json(flatArr);

  } catch (error) {
    console.error("Fetch All Data Of Particular Id Error:", error);
    response.status(500).json({ error: "Failed to fetch data for this particular ID" });
  }
});

// updated
app.get('/fetchTheParticularFolderAtID', verifyJWTandReturnUserID, async (request, response) => {
  try {
    const id = parseInt(request.query.id);
    const userId = parseInt(request.decodedEmailKiUserID);

    const { data, error } = await supabase
      .from('folder')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;

    response.json(data);

  } catch (error) {
    console.error("Fetch Particular Folder Error:", error);
    response.status(500).json({ error: "Failed to fetch the folder details" });
  }
});

// updated
app.post('/login', async (request, response) => {
  try {
    // Notice: connection parameter removed as configured in your services/auth.js
    const results = await checkIfUserExistsIntheDB(null, 'local', request.body);

    if (results === 'email_not_found') {
      return response.status(404).json({ message: "User not found" });
    }
    else if (results !== 'email_not_found' && results[0] === false) {
      return response.status(404).json({ message: "User not found" });
    }
    else {
      const token = createJWT(results[1], 'local');
      return response.json({ "token": token });
    }

  } catch (error) {
    console.error("Login Route Error:", error);
    return response.status(500).json({ error: "Internal server error during login" });
  }
});

// updated
app.post('/signup', checkForUniquenessOfEmailANDusername, async (request, response) => {
  try {
    // Notice: connection parameter removed as configured in your services/auth.js
    const insertId = await insert_user(request.body);
    const token = createJWT(request.body, 'local');
    
    return response.json({ "token": token });

  } catch (error) {
    console.error("Signup Route Error:", error);
    return response.status(500).json({ error: "Internal server error during signup" });
  }
});

// updated
app.post('/auth/google', async (request, response) => {
  try {
    const item = await verify(request.body.id_token);

    // Notice: connection parameter removed as configured in your services/auth.js
    const results = await checkIfUserExistsIntheDB(item.sub, 'google');
    
    if (!results || results.length === 0) {
      //mtlb ki user exist nhi krta toh usko insert karo aur fir JWT send krdo 
      const user_data = {
        dataToBeStored: item,
        auth_provider: 'google'
      };
      const insertId = await insert_user(user_data);
      const token = createJWT(item, 'google');
      return response.json({ "token": token });
    }
    else {
      //mtlb ki user exist krta hai toh JWT send krdo
      const token = createJWT(item, 'google');
      return response.json({ "token": token });
    }
  } catch (error) {
    console.error("Google Auth Route Error:", error);
    return response.status(500).json({ error: "Internal server error during Google Authentication" });
  }
});

// updated
app.get('/verifyJWT', (request, response) => {
  const token = request.headers.authorization?.split(' ')[1];

  jwt.verify(token, process.env.SERVER_SECRET_FOR_JWT, function (err, decoded) {
    if (err) {
      return response.status(401).json({ msg: err.message });
    }
    
    return response.status(200).json({ msg: 'valid jwt' });
  });
});

// updated
app.get('/fetchTheChildren', verifyJWTandReturnUserID, async (request, response) => {
  try {
    const userId = parseInt(request.decodedEmailKiUserID);
    const isRoot = request.query.parent_id === 'null';
    const parentId = isRoot ? null : parseInt(request.query.parent_id);

    // 1. Build and execute Folders query
    let folderQuery = supabase
      .from('folder')
      .select('*')
      .eq('user_id', userId);

    if (isRoot) {
      folderQuery = folderQuery.is('parent_id', null);
    } else {
      folderQuery = folderQuery.eq('parent_id', parentId);
    }

    const { data: folders, error: folderError } = await folderQuery;
    if (folderError) throw folderError;

    // 2. Build and execute Notes query
    let noteQuery = supabase
      .from('note')
      .select('*')
      .eq('user_id', userId);

    if (isRoot) {
      noteQuery = noteQuery.is('parent_id', null);
    } else {
      noteQuery = noteQuery.eq('parent_id', parentId);
    }

    const { data: notes, error: noteError } = await noteQuery;
    if (noteError) throw noteError;

    // 3. Combine both datasets into a single flat array
    const finalData = [...(folders || []), ...(notes || [])]; 

    return response.json(finalData);

  } catch (error) {
    console.error("Fetch Children Error:", error);
    return response.status(500).json({ error: "Failed to fetch children components" });
  }
});

// updated
app.put('/updateContentOfNoteRoute', verifyJWTandReturnUserID, async (request, response) => {
  try {
    const id = parseInt(request.body.id);
    const userId = parseInt(request.decodedEmailKiUserID);

    // Update the note content and get the full row back in one shot
    const { data, error } = await supabase
      .from('note')
      .update({ content: request.body.delta })
      .eq('id', id)
      .eq('user_id', userId)
      .select();

    if (error) throw error;

    return response.json({ 
      msg: 'Changed the content of the note', 
      updated_row: data[0] 
    });

  } catch (error) {
    console.error("Update Note Content Error:", error);
    return response.status(500).json({ error: "Failed to update note content" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running smoothly on port ${PORT}`);
});