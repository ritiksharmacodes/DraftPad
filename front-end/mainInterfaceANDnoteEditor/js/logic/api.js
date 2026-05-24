const addressOfTheServer = `http://localhost:5050/`;
// "Authorization": `Bearer ${localStorage.token}`

const fetchAllFolders = async function () {
    try {
        const fetchedData = await fetch(addressOfTheServer + 'fetchAllFolders', {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        });
        const jsonFetchedData = await fetchedData.json();

        if (fetchedData.status === 401) {
            return `unauthorized_user: ${jsonFetchedData.msg} : 401`;
        }
        else {
            return jsonFetchedData;
        }

        // window.currentState.data = jsonFetchedData;
    } catch (error) {
        console.error(error);
    }
};

const createFolderFunc = async function (data_obj) {
    try {
        const response = await fetch(addressOfTheServer + 'createFolder', {
            method: "POST",
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data_obj),
        });
        const jsonResponse = await response.json();

        if (response.status === 401) {
            return `unauthorized_user: ${json_resp.msg} : 401`;
        }
        else {
            return jsonResponse;
        }
    }
    catch (e) {
        console.error(e);
    }
};
const createNoteFunc = async function (data_obj) {
    try {
        const response = await fetch(addressOfTheServer + 'createNote', {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(data_obj),
        });
        const jsonResponse = await response.json();

        if (response.status === 401) {
            return `unauthorized_user: ${json_resp.msg} : 401`;
        }
        else {
            return jsonResponse;
        }

    }
    catch (e) {
        console.error(e);
    }
};

const deleteItemFunc = async function (id, data_type) {
    try {
        const response = await fetch(addressOfTheServer + `deleteItem?id=${id}&data_type=${data_type}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        });
        const data = await response.json();

        if (response.status === 401) {
            return `unauthorized_user: ${data.msg} : 401`;
        }
        else {
            return data;
        }


    } catch (error) {
        console.error(error);
    }
};

const updateParentIDFunc = async function (data_obj) {
    try {
        const response = await fetch(addressOfTheServer + `updateTheParentID`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(data_obj),
        });
        const fetched_data = await response.json();

        if (response.status === 401) {
            return `unauthorized_user: ${fetched_data.msg} : 401`;
        }
        else {
            return fetched_data;
        }

    } catch (error) {
        console.error(error);
    }
};
const updateParentIDSetNullFunc = async function (data_obj) {
    try {
        const response = await fetch(addressOfTheServer + `updateTheParentIDSetNull`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(data_obj),
        });
        const fetched_data = await response.json();

        if (response.status === 401) {
            return `unauthorized_user: ${fetched_data.msg} : 401`;
        }
        else {
            return fetched_data;
        }

    } catch (error) {
        console.error(error);
    }
};

const changeTheTitleFunc = async function (data_obj) {
    try {
        const response = await fetch(addressOfTheServer + `changeTheTitle`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(data_obj),
        });
        const fetched_data = await response.json();

        if (response.status === 401) {
            return `unauthorized_user: ${fetched_data.msg} : 401`;
        }
        else {
            return fetched_data;
        }

    } catch (error) {
        console.error(error);
    }
};

const drag_dropShiftingIDsetterFunc = async function (data_obj) {
    try {
        const response = await fetch(addressOfTheServer + `drag_dropShiftingIDsetterRoute`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(data_obj),
        });
        const fetched_data = await response.json();

        if (response.status === 401) {
            return `unauthorized_user: ${fetched_data.msg} : 401`;
        }
        else {
            return fetched_data;
        }

    } catch (error) {
        console.error(error);
    }
};

const childrenOfTheFolderFetcherFunc = async function (id) {
    try {
        const responsE = await fetch(addressOfTheServer + `childrenOfTheFolderFetcherRoute?id=${id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        });
        const data = await responsE.json();

        if (responsE.status === 401) {
            return `unauthorized_user: ${data.msg} : 401`;
        }
        else {
            return data;
        }

    } catch (error) {
        console.error(error);
    }
};

const fetchAllDataOfParticularId = async (id) => {
    try {
        const fetchedData = await fetch(addressOfTheServer + `fetchAllDataOfParticularId?id=${id}`);
        const jsonFetchedData = await fetchedData.json();

        return jsonFetchedData;
    } catch (error) {
        console.error(error);
    }
};

const fetchTheParticularFolderAtID = async (id) => {
    try {
        const fetchedData = await fetch(addressOfTheServer + `fetchTheParticularFolderAtID?id=${id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        });
        const jsonFetchedData = await fetchedData.json();

        if (fetchedData.status === 401) {
            return `unauthorized_user: ${jsonFetchedData.msg} : 401`;
        }
        else {
            return jsonFetchedData;
        }
        
    } catch (error) {
        console.error(error);
    }
};

const fetchTheChildrenOfParentID = async (parent_id) => {
    try {
        const resp = await fetch(addressOfTheServer + `fetchTheChildren?parent_id=${parent_id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        });
        const json_resp = await resp.json();

        if (resp.status === 401) {
            return `unauthorized_user: ${json_resp.msg} : 401`;
        }
        else {
            return json_resp;
        }

    } catch (error) {
        console.error(error);
    }
};


window.allFetcherFunctions = {
    fetchAllFoldersFunc: fetchAllFolders,
    createFolderFunction: createFolderFunc,
    createNoteFunction: createNoteFunc,
    deleteItemFunction: deleteItemFunc,
    updateParentIDFunction: updateParentIDFunc,
    updateParentIDSetNullFunction: updateParentIDSetNullFunc,
    changeTheTitleFunction: changeTheTitleFunc,
    drag_dropShiftingIDsetterFunction: drag_dropShiftingIDsetterFunc,
    childrenOfTheFolderFetcherFunction: childrenOfTheFolderFetcherFunc,
    fetchAllDataOfParticularIdFunc: fetchAllDataOfParticularId,
    fetchTheParticularFolderAtIDfunc: fetchTheParticularFolderAtID,
    fetchTheChildrenOfParentIDFunc: fetchTheChildrenOfParentID,
};