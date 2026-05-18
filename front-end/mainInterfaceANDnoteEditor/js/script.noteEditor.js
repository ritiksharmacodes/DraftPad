// const toolbarOptions = [
//     ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
//     ['blockquote', 'code-block'],
//     ['link', 'image', 'video', 'formula']
// ];
const quill = new Quill('#editor', {
    modules: {
        toolbar: {
            container: '#text-edit-buttons', // Selector for toolbar container
        },
    },
    theme: 'snow',
    placeholder: "Start entering text..."
});
// const quill2 = new Quill('#editor', {
//     modules: {
//         toolbar: '#image-edit-drawer',
//     },
//     theme: 'snow',
// });

const addressOfTheServer = `http://localhost:5050/`;
const addressOfTheFrontWebsite = '../index.html';


const bodY = document.querySelector('body');
const fontEditingBtn = document.querySelector('#font-editting-btn');
const textStylingOptionsPanel = document.querySelector('#text-styling-options');
const addImgBtn = document.querySelector('#add-img-btn');
const imageEditDrawer = document.querySelector('.image-height-width-change-div-class');
const editor = document.querySelector('.main-note-editor');
const editorKiIMGkiWidthIp = document.querySelector('#editor-ki-img-ki-width-ip');
const editorKiIMGkiHeightIp = document.querySelector('#editor-ki-img-ki-height-ip');
let selectedImgOfEditor = undefined;
const fontsizeInputBox = document.querySelector('#ip-font-size-for-editor-text');
const noteTitle = document.querySelector('#note-title');
const noteTimestamps = document.querySelector('#note-timestamps');
const exportBtn = document.querySelector('#export-btn');
const exportBtnMenu = document.querySelector('#export-btn-menu-id');
const confirmationKrneWalaDialog = document.querySelector('#confirmation-dialog');
const cancelConfirmationDialogBtn = document.querySelector('#cancel-confirmation');
const okayConfirmationDialogBtn = document.querySelector('#okay-confirmation');
const saveBtn = document.querySelector('#save-btn');
const loaderDialogBox = document.querySelector('#loader-dialog-box');
let changesHaveBeenMadeInTheEditor = false;

// on load editor mein fetched note ka data render krdo agar content attribute is set to NULL toh dekhlo lekin agar uspe already delta_obj pada hai toh usse render krdo




//body ke event listeners -->
bodY.addEventListener('click', (e) => {
    const targetElement = e.target;

    // export btn ke liye below line -->
    if (!(targetElement.closest('#export-btn')) && !(targetElement.closest('#export-btn-menu-id'))) exportBtnMenu.classList.remove('make-visible-export-btn-Menu');

    // image ko edit krne ke drawer ko close krne ke liye below line -->
    if (!(targetElement.closest('.main-note-editor img')) && (!(targetElement.closest('.image-height-width-change-div-class')))) closeSelectedImgOfEditorKeChangesWalaFunc();
});

// on load pe query-string se note-id utha le, below code
window.addEventListener('load', () => {
    // andar ghuste ke saath hee check krna hai ki localstorage mein token hai ya nhi for user authorization -->
    if (sessionStorage.getItem('first_time_user_checking_done') === 'true') {

        const idOfTheNote = (new URL(document.location.toString()).searchParams).get('id');

        const fnc_items_already_loaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
        const noteIDKa = (fnc_items_already_loaded.filter((cur) => cur.id === parseInt(idOfTheNote) && cur.type === 'note')).find((cur, ind) => ind === 0);

        // initial data daaling below at on load
        document.querySelector('title').textContent = noteIDKa.title + " - Note Editor - Great Notes";
        noteTitle.textContent = noteIDKa.title;

        // neeche database ke timestamp ko normal timestamp mein convert kring
        const isoDate = noteIDKa.created_at;
        const localDate = new Date(isoDate);
        // Convert to desired format:
        const formatted = localDate.getFullYear() + "-" +
            String(localDate.getMonth() + 1).padStart(2, '0') + "-" +
            String(localDate.getDate()).padStart(2, '0') + "&nbsp;&nbsp;&nbsp;" +
            String(localDate.getHours()).padStart(2, '0') + ":" +
            String(localDate.getMinutes()).padStart(2, '0') + ":" +
            String(localDate.getSeconds()).padStart(2, '0');

        noteTimestamps.innerHTML = formatted;


        // editor ke andar note ka delta loading
        if (noteIDKa.content !== null && noteIDKa.content !== 'null') {
            const delta_obj = JSON.parse(noteIDKa.content);
            quill.setContents(delta_obj);
        }


        // tooltips ke liye-->
        tippy('[data-tippy-content]', {
            delay: [1000, 0] // aane mein delay kr 1s ka but jaane mein bilkul bhi delay mt kar
        });

        // ab main kaam shuru hoga neeche se -->
        // (async () => {
        // try {
        // const navArrFromSessionStorage = JSON.parse(sessionStorage.navigationArray);
        // console.log(navArrFromSessionStorage);
        // returnedData = await window.allFetcherFunctions.fetchTheChildrenOfParentIDFunc(navArrFromSessionStorage[navArrFromSessionStorage.length - 1]);

        // if ((typeof returnedData) === 'string' && returnedData.includes('401')) {
        //     window.location.href = '/front-end/website.html';
        //     console.log(returnedData);
        // }
        // else {
        // if (navArrFromSessionStorage[navArrFromSessionStorage.length - 1] === null) navBackBtn.setAttribute('disabled', "true");

        // if (!(sessionStorage.getItem('folder_note_container_items_already_loaded'))) {
        //     //console.log( JSON.parse( sessionStorage.getItem('folder_note_container_items_already_loaded') ) );
        //     sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify([returnedData]));
        // }
        // generateBreadcrumbs();
        // renderTheReceivedDataFunction(returnedData);
        //     }

        // } catch (error) {
        //     console.error(error);
        // }
        // })();
    }
    else {
        if (localStorage.hasOwnProperty('token')) {
            const token = localStorage.token;
            (async () => {
                try {
                    const retData = await fetch(addressOfTheServer + 'verifyJWT', {
                        method: "GET",
                        mode: "cors",
                        headers: {
                            'Authorization': `Bearer ${localStorage.token}`
                        }
                    });
                    const json_retData = await retData.json();

                    if (retData.status === 401) {
                        console.log(json_retData.msg);
                        window.location.href = addressOfTheFrontWebsite;
                    }
                    else {
                        sessionStorage.setItem('first_time_user_checking_done', 'true');
                        window.location.reload();
                        // navigationArray.push(null);
                        // sessionStorage.setItem('navigationArray', JSON.stringify(navigationArray));
                    }

                } catch (error) {
                    console.error(error);
                }
            })();
        }
        else {
            window.location.href = addressOfTheFrontWebsite;
        }
    }
});

// 'unsaved changes detected' ka code
window.addEventListener('beforeunload', (e) => {
    if (changesHaveBeenMadeInTheEditor) {
        e.preventDefault();
        return '';
    }
});


// koi image ke upar click krne se image-edit drawer ko open kro, event-delegation krenge by placing the event on the #editor
editor.addEventListener('click', (e) => {
    const targetElement = e.target;
    if (targetElement.closest('img')) {
        selectedImgOfEditor = targetElement;
        imageEditDrawer.classList.add('open-image-height-width-change-div-class'); //drawer open krne ke liye

        // nayi images pe border lagane ke pehle purani imgs ka border noraml kr ne ka code below
        const allImgsOfEditor = document.querySelectorAll('.main-note-editor img');
        allImgsOfEditor.forEach((cur) => {
            if (cur.classList.contains('clicked-editor-image-border-class')) cur.classList.remove('clicked-editor-image-border-class');
        });
        // ab selected img ka border neela kr de
        selectedImgOfEditor.classList.add('clicked-editor-image-border-class');

        // current height-width inpput boxes mein daaling -->
        let imgKiCurrentH = selectedImgOfEditor.getBoundingClientRect().height;
        let imgKiCurrentW = selectedImgOfEditor.getBoundingClientRect().width;
        editorKiIMGkiHeightIp.value = parseInt(imgKiCurrentH);
        editorKiIMGkiWidthIp.value = parseInt(imgKiCurrentW);
    }
});
editor.addEventListener("keydown", (e) => {
    // for 'unsaved changes detected'

    if(e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'AltGraph' || e.key === 'CapsLock' || e.key === 'Escape' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'Meta' || e.key === 'ContextMenu' || e.key === 'Home' || e.key === 'End' || e.key === 'PageUp' || e.key === 'PageDown' || e.key === 'Insert');
    else {
        // console.log(`${e.key} pressed`);
        changesHaveBeenMadeInTheEditor = true;
    }
}); 


document.querySelector('#close-krne-ka-span-of-img-hANDw').addEventListener('click', () => {
    if (imageEditDrawer.classList.contains('open-image-height-width-change-div-class')) closeSelectedImgOfEditorKeChangesWalaFunc();
});
editorKiIMGkiHeightIp.addEventListener('input', () => {
    if (selectedImgOfEditor) {
        selectedImgOfEditor.style.height = editorKiIMGkiHeightIp.value + "px";
    }
});
editorKiIMGkiWidthIp.addEventListener('input', () => {
    if (selectedImgOfEditor) {
        selectedImgOfEditor.style.width = editorKiIMGkiWidthIp.value + "px";
    }
});

function closeSelectedImgOfEditorKeChangesWalaFunc() {
    imageEditDrawer.classList.remove('open-image-height-width-change-div-class');
    if (selectedImgOfEditor) selectedImgOfEditor.classList.remove('clicked-editor-image-border-class');
    selectedImgOfEditor = undefined;
}

// console.log(exportBtnMenu);


// export button pe click se khol do popover
exportBtn.addEventListener('click', () => {
    exportBtnMenu.classList.toggle('make-visible-export-btn-Menu');
});
// export-btn ke "As text" ka code below
const ebmAsText = document.querySelector('#export-btn-menu-as-text');
ebmAsText.addEventListener('click', (e) => {
    e.preventDefault(); //kyunki yeh 'a' h toh iska default kaam band kro

    // data uthaing from editor
    const data = quill.getContents();
    const data_obj = {
        "delta": data
    };
    makeRequestForExportAsText(data_obj);
});
// export-btn ke "As pdf" ka code below
const ebmAspdf = document.querySelector('#export-btn-menu-as-pdf');
ebmAspdf.addEventListener('click', (e) => {
    e.preventDefault(); //kyunki yeh 'a' h toh iska default kaam band kro

    // data uthaing from editor
    const data = quill.getContents();
    const data_obj = {
        "delta": data
    };
    makeRequestForExportAsPdf(data_obj);
});

// delete btn ka code below -->
document.querySelector('#delete-btn').addEventListener('click', async () => {
    // confirmation dialog box ko activate krne ka code below--> 
    const idOfTheNote = (new URL(document.location.toString()).searchParams).get('id');
    const fnc_items_already_loaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
    const noteIDKa = (fnc_items_already_loaded.filter((cur) => cur.id === parseInt(idOfTheNote) && cur.type === 'note')).find((cur, ind) => ind === 0);

    confirmationKrneWalaDialog.querySelector('.model-div h3 span').textContent = `delete '${noteIDKa.title}'?`;
    confirmationKrneWalaDialog.showModal();
    confirmationKrneWalaDialog.classList.add('open-create-dialog-class');
});

okayConfirmationDialogBtn.addEventListener('click', async () => {
    try {
        const id = parseInt((new URL(document.location.toString()).searchParams).get('id'));
        const fetchedMsg = await deleteItemFunc(id, 'note');

        if ((typeof fetchedMsg) === 'string' && fetchedMsg.includes('401')) {
            window.location.href = addressOfTheFrontWebsite;
            console.log(fetchedMsg);
        }
        else {
            console.log(fetchedMsg);

            let fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
            fncItemsAlreadyLoaded = fncItemsAlreadyLoaded.filter((cur) => !(cur.id === id && cur.type === 'note'));
            sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify(fncItemsAlreadyLoaded));

            GoBackWithRefresh();
            closeConfirmationDialog();

            // window.history.back(); // ek page peeche le jaane ke liye
            // window.location = document.referrer;

            // mainItemNotimgORp.remove();

            // if ((Array.from(folderNoteContainer.children)).length === 0) {
            //     const tempPara = agarScreenKhaaliTohYehItemDaaloFunction();
            //     folderNoteContainer.append(tempPara);
            // }

        }

        // Toastify({
        //     text: "The note has been deleted",
        //     duration: 2000,
        //     destination: "https://github.com/apvarun/toastify-js",
        //     newWindow: true,
        //     // close: true,
        //     gravity: "bottom", // `top` or `bottom`
        //     position: "center", // `left`, `center` or `right`
        //     stopOnFocus: false, // Prevents dismissing of toast on hover
        //     style: {
        //         background: "black",
        //         cursor: 'default',
        //     },
        //     // onClick: function () { } // Callback after click
        // }).showToast();

    } catch (error) {
        console.log(error);
    }
});

cancelConfirmationDialogBtn.addEventListener('click', closeConfirmationDialog);
function closeConfirmationDialog() {
    confirmationKrneWalaDialog.classList.remove('open-create-dialog-class');
    // Wait for animation before closing
    setTimeout(() => confirmationKrneWalaDialog.close(), 300);
    confirmationDialogOpenedFor = undefined;
}
function GoBackWithRefresh() {
    if ('referrer' in document) {
        window.location = document.referrer;
        /* OR */
        //location.replace(document.referrer);
    } else {
        window.history.back();
    }
}

// save-btn ka code below -->
saveBtn.addEventListener('click', async () => {
    try {
        const idOfTheNote = parseInt((new URL(document.location.toString()).searchParams).get('id'));
        const data_obj = {
            id: idOfTheNote,
            delta: JSON.stringify(quill.getContents())
        };

        // 'Saving the note' ka toast aa jave
        Toastify({
            text: "Saving the note...",
            duration: 1000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            // close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            style: {
                background: "black",
                cursor: 'default',
            },
            // onClick: function () { } // Callback after click
        }).showToast();

        const data = await updateContentOfNote(data_obj);

        if ((typeof data) === 'string' && data.includes('401')) {
            window.location.href = addressOfTheFrontWebsite;
            console.log(data);
        }
        else {
            console.log(data);

            let fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
            fncItemsAlreadyLoaded = fncItemsAlreadyLoaded.filter((cur) => !(cur.id === idOfTheNote && cur.type === 'note'));
            fncItemsAlreadyLoaded.push(data.updated_row);
            sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify(fncItemsAlreadyLoaded));

            Toastify({
                text: "The note has been saved",
                duration: 2000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                // close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: false, // Prevents dismissing of toast on hover
                style: {
                    background: "black",
                    cursor: 'default',
                },
                // onClick: function () { } // Callback after click
            }).showToast();

            changesHaveBeenMadeInTheEditor = false;
        }

    } catch (error) {
        console.log(error);
    }
});






// note ke title ko change krne ka code below -->
noteTitle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();

        //change kr de title in the database
        const data_obj = {
            id: (new URL(document.location.toString()).searchParams).get('id'),
            type: 'note',
            changed_title: noteTitle.textContent,
        };

        (async () => {
            try {
                // 'changing the note-title' ka toast aa jave
                Toastify({
                    text: "Changing the note title...",
                    duration: 1000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    // close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: false, // Prevents dismissing of toast on hover
                    style: {
                        background: "black",
                        cursor: 'default',
                    },
                    // onClick: function () { } // Callback after click
                }).showToast();


                // ab main kaam shuru hoing
                const receivedMsg = await changeTheTitleFunc(data_obj);

                if ((typeof receivedMsg) === 'string' && receivedMsg.includes('401')) {
                    window.location.href = addressOfTheFrontWebsite;
                    console.log(receivedMsg);
                }
                else {
                    let fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
                    fncItemsAlreadyLoaded = fncItemsAlreadyLoaded.filter((cur) => !(cur.id === parseInt((new URL(document.location.toString()).searchParams).get('id')) && cur.type === 'note'));
                    fncItemsAlreadyLoaded.push(receivedMsg.updated_row);
                    sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify(fncItemsAlreadyLoaded));

                    //note title has been changed ka toast aa jave
                    Toastify({
                        text: "The note title has been changed",
                        duration: 2000,
                        destination: "https://github.com/apvarun/toastify-js",
                        newWindow: true,
                        // close: true,
                        gravity: "bottom", // `top` or `bottom`
                        position: "center", // `left`, `center` or `right`
                        stopOnFocus: false, // Prevents dismissing of toast on hover
                        style: {
                            background: "black",
                            cursor: 'default',
                        },
                        // onClick: function () { } // Callback after click
                    }).showToast();
                }

            } catch (error) {
                console.log(error);
            }
        })();



    }
});
noteTitle.addEventListener('blur', (e) => {
    //change kr de title in the database
    const data_obj = {
        id: (new URL(document.location.toString()).searchParams).get('id'),
        type: 'note',
        changed_title: noteTitle.textContent,
    };

    (async () => {
        try {
            // 'changing the note-title' ka toast aa jave
            Toastify({
                text: "Changing the note title...",
                duration: 1000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                // close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: false, // Prevents dismissing of toast on hover
                style: {
                    background: "black",
                    cursor: 'default',
                },
                // onClick: function () { } // Callback after click
            }).showToast();


            // ab main kaam shuru hoing
            const receivedMsg = await changeTheTitleFunc(data_obj);

            if ((typeof receivedMsg) === 'string' && receivedMsg.includes('401')) {
                window.location.href = addressOfTheFrontWebsite;
                console.log(receivedMsg);
            }
            else {
                let fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
                fncItemsAlreadyLoaded = fncItemsAlreadyLoaded.filter((cur) => !(cur.id === parseInt((new URL(document.location.toString()).searchParams).get('id')) && cur.type === 'note'));
                fncItemsAlreadyLoaded.push(receivedMsg.updated_row);
                sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify(fncItemsAlreadyLoaded));

                //note title has been changed ka toast aa jave
                Toastify({
                    text: "The note title has been changed",
                    duration: 2000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    // close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: false, // Prevents dismissing of toast on hover
                    style: {
                        background: "black",
                        cursor: 'default',
                    },
                    // onClick: function () { } // Callback after click
                }).showToast();
            }

        } catch (error) {
            console.log(error);
        }
    })();

}
);

//--------------------------------------------------- saare server ko request bhejne waale function neeche ------------------------------------------------------------------//
async function makeRequestForExportAsText(data) {
    try {
        const options = {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
            mode: "cors"
        };

        fetch(`http://localhost:5050/exportAsText`, options)
            .then((response) => response.blob())
            .then((myBlob) => {
                // neeche waali 2 lines taaki note ka title mil sake
                const idOfTheNote = (new URL(document.location.toString()).searchParams).get('id');
                const noteIDKa = (returnedData.filter((cur) => cur.id === parseInt(idOfTheNote) && cur.type === 'note')).find((cur, ind) => ind === 0);

                // main kaam neeche se
                const uri = URL.createObjectURL(myBlob);
                const temp_a = document.createElement('a'); // Creating a temporary link element
                temp_a.href = uri;
                temp_a.download = `${noteIDKa.title}.docx`; // have set its href to the file URL and download attribute has also been set
                temp_a.click(); // Programmatically click that element to trigger the download
            })
            .catch((e) => console.error(`Kuch toh gadbad hai in fetching-makeRequestForExportAsText func: ${e}`));
    }
    catch (e) {
        console.error('Kuch toh gadbad hai in makeRequestForExportAsText: ' + e);
    }
}
async function makeRequestForExportAsPdf(data) {
    try {
        const options = {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
            mode: "cors"
        };

        fetch(`http://localhost:5050/exportAsPdf`, options)
            .then((response) => response.blob())
            .then((myBlob) => {
                // neeche waali 2 lines taaki note ka title mil sake
                const idOfTheNote = (new URL(document.location.toString()).searchParams).get('id');
                const noteIDKa = (returnedData.filter((cur) => cur.id === parseInt(idOfTheNote) && cur.type === 'note')).find((cur, ind) => ind === 0);

                // main kaam neeche se
                const uri = URL.createObjectURL(myBlob);
                const temp_a = document.createElement('a'); // Creating a temporary link element
                temp_a.href = uri;
                temp_a.download = `${noteIDKa.title}.pdf`; // have set its href to the file URL and download attribute has also been set
                temp_a.click(); // Programmatically click that element to trigger the download
            })
            .catch((e) => console.error(`Kuch toh gadbad hai in fetching-makeRequestForExportAsPdf func: ${e}`));
    }
    catch (e) {
        console.error('Kuch toh gadbad hai in makeRequestForExportAsPdf: ' + e);
    }
}
const deleteItemFunc = async function (id, data_type) {
    try {
        // console.log(addressOfTheServer + `deleteItem?id=${id}&data_type=${data_type}`);

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

async function updateContentOfNote(data_obj) {
    try {
        const response = await fetch(addressOfTheServer + `updateContentOfNoteRoute`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(data_obj)
        });
        const data = await response.json();

        if (response.status === 401) {
            return `unauthorized_user: ${data.msg} : 401`;
        }
        else {
            return data;
        }

    } catch (error) {
        console.log(error);
    }
}

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