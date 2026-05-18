const addBtn = document.getElementById('add-btn');
const addBtnMenu = document.querySelector('.add-btn-menu');
const addBtnToolTip = document.querySelector('.add-btn-tooltip');
const body = document.querySelector('body');
const folderNoteContainer = document.querySelector('#folder-note-container');
const folderIconTemplate = document.querySelector('#folder-icon-template');
const noteIconTemplate = document.querySelector('#note-icon-template');
const customContextMenu = document.querySelector('#custom-context-menu');
const ccmMoveToFolderLI = document.querySelector('#ccm-move-to-folder-li');
const ccmMoveToRootBTN = document.querySelector('#ccm-move-to-root-btn');
const ccmDeleteLI = document.querySelector('#ccm-delete-li');
const ccmRenameLI = document.querySelector('#ccm-rename-li');
let navigationArray = [];
const navBackBtn = document.querySelector('#navigation-buttons-backBtn');
const breadcrumbContainer = document.querySelector('#breadcrumbContainer');
const moveToFolderDialog = document.querySelector('#move-to-folder-dialog');
const cancelMoveToFolderDialog = document.querySelector('#cancel-move-to-folder');
const okayMoveToFolder = document.querySelector('#okay-move-to-folder');
let moveToFolderKiTableKiTR = document.querySelector('tr');
const confirmationKrneWalaDialog = document.querySelector('#confirmation-dialog');
let confirmationDialogOpenedFor = undefined;
const cancelConfirmationDialogBtn = document.querySelector('#cancel-confirmation');
const okayConfirmationDialogBtn = document.querySelector('#okay-confirmation');
let diasbleTheOpeningOfFolderOrNote = undefined;
const logout_btn = document.querySelector('#logout-btn');
let yehWaleFoldersYaNotesKeFullNamesKoHideKar = [];

// let returnedData = [];
// console.log(navBackBtn);
// const dataItemsAlreadyLoaded = [];  //yeh bnayi gyi for fast go-back btn and fast breadcrumbs-onClick-rendering


const addressOfTheFrontWebsite = '../index.html';

// notes-->
// by default toh 'go back' btn ko enable rkhna hai lekin jese hee root pe aa jave user toh btn ko disable kr do
// agar koi bhi databse se contact krne wala kaam ho raha hai toh successful changes ke badd success ya error ke msg ka ek toast display ho jaaye




// body ke event listeners -->
body.addEventListener('click', (e) => {
    if (e.target.id === "add-btn" || e.target.id === "add-btn-menu-id" || e.target.id === "add-btn-menu-create-note" || e.target.id === "add-btn-menu-create-folder");
    else addBtnMenu.classList.remove('make-visible-add-btn-menu');

    customContextMenu.style.display = "none"; //custom contextmenu ko band krne ke liye

    if (yehWaleFoldersYaNotesKeFullNamesKoHideKar.length !== 0) { //'hide full name' functionality ke liye
        yehWaleFoldersYaNotesKeFullNamesKoHideKar.forEach((cur) => {
            // console.log(cur);
            if (cur.getAttribute('data-type') === 'folder') {
                cur.querySelector('#main-paragraph-of-folder').classList.add('make-invisible-the-p');
                cur.querySelector('.temporary-para-of-folder').classList.remove('make-invisible-the-p');
            }
            else if(cur.getAttribute('data-type') === 'note') {
                cur.querySelector('#main-paragraph-of-note').classList.add('make-invisible-the-p');
                cur.querySelector('.temporary-para-of-note').classList.remove('make-invisible-the-p');
            }
        });
        yehWaleFoldersYaNotesKeFullNamesKoHideKar = [];
    }
});
body.addEventListener('contextmenu', (e) => e.preventDefault());

// window ke event listeners
window.addEventListener('load', () => {
    // console.log(sessionStorage);
    // if (sessionStorage.hasOwnProperty('currentFolderID')) {
    //     // console.log('if\n', sessionStorage);

    //     // agar pehle se currentFolderID avaiable h toh, fresh data ko fetch karo -->
    //     (async () => {
    //         try {
    //             if (sessionStorage.currentFolderID === 'null') {
    //                 returnedData = await window.allFetcherFunctions.fetchAllDataFunc();     // console.log(returnedData);
    //                 navigationArray = JSON.parse(sessionStorage.navigationArray);

    //                 if (returnedData.length === 0) {
    //                     const tempPara = agarScreenKhaaliTohYehItemDaaloFunction(); //agar "folder-note container" khaali hai toh daal de "nothing to show"
    //                     folderNoteContainer.appendChild(tempPara);
    //                 }
    //                 else {
    //                     loadTheReturnedDataInTheContainer();
    //                     // foldersKoBaccheAssignKaroAurContainerMeinDaaloFunction();
    //                     breadcrumbsMeinChangesKrneWalaFunction();
    //                 }
    //             }
    //             else {
    //                 // console.log(sessionStorage);

    //                 returnedData = await window.allFetcherFunctions.fetchAllDataOfParticularIdFunc(parseInt(sessionStorage.currentFolderID));     // console.log(returnedData);
    //                 // console.log(returnedData);

    //                 navigationArray = JSON.parse(sessionStorage.navigationArray);
    //                 // console.log(navigationArray);


    //                 renderTheReceivedDataFunction(returnedData); breadcrumbsMeinChangesKrneWalaFunction();

    //                 // if (returnedData.length === 0) {
    //                 //     const tempPara = agarScreenKhaaliTohYehItemDaaloFunction(); //agar "folder-note container" khaali hai toh daal de "nothing to show"
    //                 //     folderNoteContainer.appendChild(tempPara);
    //                 // }
    //                 // else {
    //                 //     loadTheReturnedDataInTheContainer();
    //                 //     // foldersKoBaccheAssignKaroAurContainerMeinDaaloFunction();
    //                 //     breadcrumbsMeinChangesKrneWalaFunction();
    //                 // }
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     })();
    // }
    // else {
    //     (async () => {
    //         try {
    //             sessionStorage.clear();     // console.log('else\n', sessionStorage);

    //             returnedData = await window.allFetcherFunctions.fetchAllDataFunc();
    //             // console.log(fetchedData);               

    //             navigationArray.push(null); //iska mtlb hai ki yeh root page hai  

    //             sessionStorage.currentFolderID = null; //koi folder opened nhi hai; ie, root elements
    //             sessionStorage.navigationArray = JSON.stringify(navigationArray);

    //             if (returnedData.length === 0) {
    //                 const tempPara = agarScreenKhaaliTohYehItemDaaloFunction(); //agar "folder-note container" khaali hai toh daal de "nothing to show"
    //                 folderNoteContainer.appendChild(tempPara);
    //             }
    //             else {
    //                 loadTheReturnedDataInTheContainer(returnedData);
    //                 // foldersKoBaccheAssignKaroAurContainerMeinDaaloFunction();
    //                 breadcrumbsMeinChangesKrneWalaFunction();
    //             }
    //             // console.log(sessionStorage);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     })();
    // }

    // andar ghuste ke saath hee check krna hai ki localstorage mein token hai ya nhi for user authorization -->
    if (sessionStorage.getItem('first_time_user_checking_done') === 'true') {

        // ab main kaam shuru hoga neeche se -->
        (async () => {
            try {
                const navArrFromSessionStorage = JSON.parse(sessionStorage.navigationArray);
                // console.log(navArrFromSessionStorage);
                returnedData = await window.allFetcherFunctions.fetchTheChildrenOfParentIDFunc(navArrFromSessionStorage[navArrFromSessionStorage.length - 1]);

                if ((typeof returnedData) === 'string' && returnedData.includes('401')) {
                    window.location.href = addressOfTheFrontWebsite;
                    console.log(returnedData);
                }
                else {
                    if (navArrFromSessionStorage[navArrFromSessionStorage.length - 1] === null) navBackBtn.setAttribute('disabled', "true");

                    if (!(sessionStorage.getItem('folder_note_container_items_already_loaded'))) {
                        //console.log( JSON.parse( sessionStorage.getItem('folder_note_container_items_already_loaded') ) );
                        sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify([returnedData]));
                    }
                    generateBreadcrumbs();
                    renderTheReceivedDataFunction(returnedData);
                }

            } catch (error) {
                console.error(error);
            }
        })();

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
                        sessionStorage.clear();
                        sessionStorage.setItem('first_time_user_checking_done', 'true');
                        navigationArray.push(null);
                        sessionStorage.setItem('navigationArray', JSON.stringify(navigationArray));
                        window.location.reload();
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


// "add button" ke event listeners -->
addBtn.addEventListener('click', () => {
    addBtnMenu.classList.toggle('make-visible-add-btn-menu');
    addBtnToolTip.classList.remove('add-btn-tooltip-visible');
});
addBtn.addEventListener('mouseover', () => {
    //agar menu open h toh tooltip open mat kar -->
    if (!addBtnMenu.classList.contains('make-visible-add-btn-menu')) addBtnToolTip.classList.add('add-btn-tooltip-visible');
});
addBtn.addEventListener('mouseout', () => {
    addBtnToolTip.classList.remove('add-btn-tooltip-visible');
});

// "create folder" ka code -->
const createFolderBtn = document.querySelector('#add-btn-menu-create-folder');
const createFolderDialog = document.querySelector('#create-folder-dialog');
const cancelCreateFolderDialog = document.querySelector('#cancel-new-folder');
const inputOfCreateFolderModal = document.querySelector('#new-folder-name');
const okayCreateFolderDialog = document.querySelector("#okay-new-folder");

createFolderBtn.addEventListener('click', () => {
    createFolderDialog.showModal();
    createFolderDialog.classList.add('open-create-dialog-class');
    addBtnMenu.classList.remove('make-visible-add-btn-menu');
});

cancelCreateFolderDialog.addEventListener('click', closeTheFolderCreationModal);

okayCreateFolderDialog.addEventListener('click', () => {
    if (folderNoteContainer.querySelector('#tempFolderNoteContainerPara')) {
        //"nothing to show" ko hatane ke liye
        folderNoteContainer.removeChild(folderNoteContainer.querySelector('#tempFolderNoteContainerPara'));
    }

    const newFolder = itemBanakeReturnKarNeWalaFunction("folder", "creation");

    // below object will be sent to the database
    const data_obj = {
        title: (inputOfCreateFolderModal.value === "") ? "New Folder" : inputOfCreateFolderModal.value,
        parent_id: newFolder.querySelector('.icon').getAttribute('parent-id'),
    };

    (async () => {
        const returnedIDobj = await window.allFetcherFunctions.createFolderFunction(data_obj);

        if ((typeof returnedIDobj) === 'string' && returnedIDobj.includes('401')) {
            window.location.href = addressOfTheFrontWebsite;
            console.log(returnedIDobj);
        }
        else {
            if (returnedIDobj?.id_of_created_folder) {
                newFolder.querySelector('.icon').removeAttribute('parent-id');    // parent-id attribute ko remove kr de before appneding on the fnContainer
                newFolder.querySelector('.icon').setAttribute('data-id', returnedIDobj.id_of_created_folder);

                const fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
                fncItemsAlreadyLoaded.push(returnedIDobj.created_row);
                sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify(fncItemsAlreadyLoaded));

                folderNoteContainer.appendChild(newFolder);
                closeTheFolderCreationModal();
            }
            else {
                console.log('Invalid response: ', returnedIDobj);
            }
        }

    })();
});

function closeTheFolderCreationModal() {
    createFolderDialog.classList.remove('open-create-dialog-class');
    // Wait for animation before closing
    setTimeout(() => createFolderDialog.close(), 300);
    inputOfCreateFolderModal.value = "";
}

// function newIDproviderForFolders(newFolder) {
//     const allFoldersOfTheContainer = (folderNoteContainer.children.length === 0) ? [] : Array.from(folderNoteContainer.children).filter((cur) => cur.classList.contains('folder'));

//     if (allFoldersOfTheContainer.length === 0) newFolder.querySelector('.icon').id = "folder1";
//     else {
//         let numberOflastFolderKiID = parseInt(((allFoldersOfTheContainer[allFoldersOfTheContainer.length - 1].id).substring(6)));
//         newFolder.querySelector('.icon').id = "folder" + (numberOflastFolderKiID + 1);
//     }

//     return newFolder;
// }

// "create note" ka code -->
const createNoteBtn = document.querySelector('#add-btn-menu-create-note');
const createNoteDialog = document.querySelector('#create-note-dialog');
const inputOfCreateNoteModal = document.querySelector('#new-note-name');
const cancelCreateNoteDialog = document.querySelector('#cancel-new-note');
const okayCreateNoteDialog = document.querySelector("#okay-new-note");

createNoteBtn.addEventListener('click', () => {
    createNoteDialog.showModal();
    createNoteDialog.classList.add('open-create-dialog-class');
    addBtnMenu.classList.remove('make-visible-add-btn-menu');
});

cancelCreateNoteDialog.addEventListener('click', closeTheNoteCreationModal);

okayCreateNoteDialog.addEventListener('click', () => {
    if (folderNoteContainer.querySelector('#tempFolderNoteContainerPara')) {
        //"nothing to show" ko hatane ke liye
        folderNoteContainer.removeChild(folderNoteContainer.querySelector('#tempFolderNoteContainerPara'));
    }

    const newNote = itemBanakeReturnKarNeWalaFunction("note", "creation");

    // below object will be sent to the database
    const data_obj = {
        title: (inputOfCreateNoteModal.value === "") ? "New Folder" : inputOfCreateNoteModal.value,
        parent_id: newNote.querySelector('.icon').getAttribute('parent-id'),
        content: null
    };

    (async () => {
        try {
            const returnedIDobj = await window.allFetcherFunctions.createNoteFunction(data_obj);

            if ((typeof returnedIDobj) === 'string' && returnedIDobj.includes('401')) {
                window.location.href = addressOfTheFrontWebsite;
                console.log(returnedIDobj);
            }
            else {
                if (returnedIDobj?.id_of_created_note) {
                    newNote.querySelector('.icon').removeAttribute('parent-id');    // parent-id attribute ko remove kr de before appneding on the fnContainer
                    newNote.querySelector('.icon').setAttribute('data-id', returnedIDobj.id_of_created_note);
                    // console.log(returnedIDobj);            

                    const fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
                    fncItemsAlreadyLoaded.push(returnedIDobj.created_row);
                    sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify(fncItemsAlreadyLoaded));

                    folderNoteContainer.appendChild(newNote);
                    closeTheNoteCreationModal();
                }
                else {
                    console.log('Invalid response: ', returnedIDobj);
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    })();
});


function closeTheNoteCreationModal() {
    createNoteDialog.classList.remove('open-create-dialog-class');
    // Wait for animation before closing
    setTimeout(() => createNoteDialog.close(), 300);
    inputOfCreateNoteModal.value = "";
}

// function newIDproviderForNotes(newNote) {
//     const allNotesOfTheContainer = (folderNoteContainer.children.length === 0) ? [] : Array.from(folderNoteContainer.children).filter((cur) => cur.classList.contains('note'));

//     if (allNotesOfTheContainer.length === 0) newNote.querySelector('.icon').id = "note1";
//     else {
//         let numberOflastNoteKiID = parseInt(((allNotesOfTheContainer[allNotesOfTheContainer.length - 1].id).substring(4)));
//         newNote.querySelector('.icon').id = "note" + (numberOflastNoteKiID + 1);
//     }

//     return newNote;
// }


// loading the data ka code --> 
// function loadTheReturnedDataInTheContainer(returnedData) {
//     // console.log(returnedData);

//     const saareRootMeinRehneWaaleItems = returnedData.filter((cur) => (cur.type === "folder" || cur.type === "note") && cur.parent_id === null);
//     // console.log(saareRootMeinRehneWaaleItems);

//     if (saareRootMeinRehneWaaleItems.length === 0) {
//         const tempPara = agarScreenKhaaliTohYehItemDaaloFunction(); //agar "folder-note container" khaali hai toh daal de "nothing to show"
//         folderNoteContainer.appendChild(tempPara);
//     }
//     else {
//         saareRootMeinRehneWaaleItems.forEach((cur) => {
//             if (cur.type === "folder") {
//                 const newFolder = itemBanakeReturnKarNeWalaFunction("folder", "", cur);
//                 folderNoteContainer.appendChild(newFolder);
//             }
//             else if (cur.type === "note") {
//                 const newNote = itemBanakeReturnKarNeWalaFunction("note", "", cur);
//                 folderNoteContainer.appendChild(newNote);
//             }
//         });
//     }

//     return saareRootMeinRehneWaaleItems;
// }



// let y = 0;
// function foldersKoBaccheAssignKaroAurContainerMeinDaaloFunction() {
//     let currentFoldersOfTheContainer = (Array.from(folderNoteContainer.children)).filter((cur) => cur.getAttribute('data-type') === "folder");
//     let foldersLinkedWithRespectiveChildern = [];

//     // mapping chl rhi hai folder ids aur unke respective children ki
//     currentFoldersOfTheContainer.forEach((cur) => {
//         let id = cur.getAttribute('data-id');
//         // console.log(returnedData);
//         let bacche = returnedData.filter((cur) => cur.parent_id === parseInt(id));
//         let object = {
//             "id": id,
//             "bacche": bacche
//         }
//         foldersLinkedWithRespectiveChildern.push(object);
//     });

//     const onlyFoldersOfFolderNoteContainer = (Array.from(folderNoteContainer.children)).filter((cur) => cur.getAttribute("data-type") === "folder");
//     const onlyNotesOfFolderNoteContainer = (Array.from(folderNoteContainer.children)).filter((cur) => cur.getAttribute("data-type") === "note");

//     //foldernotecontainer ke folders ko click pe kaam krne ka code below
//     onlyFoldersOfFolderNoteContainer.forEach((cur) => {
//         cur.addEventListener('click', (e) => {
//             if (diasbleTheOpeningOfFolderOrNote === true) { //yeh kra gya hai "rename" ke liye
//                 e.stopPropagation();
//                 return;
//             }


//             let idOfCURfolder = cur.getAttribute('data-id');
//             let idKaFolder = foldersLinkedWithRespectiveChildern.filter((cur) => cur.id === idOfCURfolder);
//             let idKaFolderKeBacche = idKaFolder[0].bacche;

//             // pehle navigationArray ka code below -->
//             navigationArray.push(idOfCURfolder); //currently opened folder ko array pe chadha diya
//             if (navBackBtn.hasAttribute('disabled')) navBackBtn.removeAttribute('disabled'); //agar back btn disabled h toh usko enabled kr do
//             breadcrumbsMeinChangesKrneWalaFunction();
//             // console.log(navigationArray);

//             //continuing with the process 
//             folderNoteContainer.innerHTML = ""; //pehle waale maal ko khaali kro
//             if (idKaFolderKeBacche.length === 0) {
//                 const tempPara = agarScreenKhaaliTohYehItemDaaloFunction();
//                 folderNoteContainer.appendChild(tempPara);
//             }
//             else {
//                 idKaFolderKeBacche.forEach((cur) => {
//                     if (cur.type === "folder") {
//                         const newFolder = itemBanakeReturnKarNeWalaFunction("folder", "", cur);
//                         folderNoteContainer.appendChild(newFolder);
//                     }
//                     else if (cur.type === "note") {
//                         const newNote = itemBanakeReturnKarNeWalaFunction("note", "", cur);
//                         folderNoteContainer.appendChild(newNote);
//                     }
//                 });
//             }

//             // foldersKoBaccheAssignKaroAurContainerMeinDaaloFunction();
//         });
//     });

//     // folderNoteContainer ke notes ko click pe edit krne ka content below
//     onlyNotesOfFolderNoteContainer.forEach((cur) => {
//         cur.addEventListener('click', () => {
//             let idOfCURnote = cur.getAttribute('data-id');
//             // console.log(idKaNote);
//             window.location.href = `note_editor.html?id=${idOfCURnote}`;
//         });
//     });

// }

// let z = 0;
// navback button ka code below -->
navBackBtn.addEventListener('click', () => {
    const navArrSessStrg = JSON.parse(sessionStorage.navigationArray);

    if (!(navArrSessStrg.length === 1 && navArrSessStrg[0] === null)) {
        const topOfnavArrSessStrg = parseInt(navArrSessStrg[navArrSessStrg.length - 1]);
        cleanseKaroSessionStorageKo(topOfnavArrSessStrg);
        navArrSessStrg.pop(); //jese hee back pe click ho toh pop the top lekin agr keval null hai array mein toh mt kar
        sessionStorage.setItem('navigationArray', JSON.stringify(navArrSessStrg));
    }

    // breadcrumbsMeinChangesKrneWalaFunction();
    generateBreadcrumbs();

    // console.log(navArrSessStrg);
    if (navArrSessStrg.length === 1 && navArrSessStrg[0] === null) {
        // root pe aa gye hein
        navBackBtn.setAttribute('disabled', "true");
        folderNoteContainer.innerHTML = "";
        let idKaFolderKeBacche = returnKaroIdKaFolderKeBacche(null);
        // console.log(idKaFolderKeBacche);

        renderTheReceivedDataFunction(idKaFolderKeBacche);
        // loadTheReturnedDataInTheContainer(); // saare perentID === null wale items load krde in the container
        // foldersKoBaccheAssignKaroAurContainerMeinDaaloFunction();
    }
    else {
        let idOfCURfolder = parseInt(navArrSessStrg[navArrSessStrg.length - 1]);
        let idKaFolderKeBacche = returnKaroIdKaFolderKeBacche(idOfCURfolder);

        folderNoteContainer.innerHTML = ""; //pehle waale maal ko khaali kro
        if (idKaFolderKeBacche.length === 0) {
            const tempPara = agarScreenKhaaliTohYehItemDaaloFunction();
            folderNoteContainer.appendChild(tempPara);
        }
        else {
            idKaFolderKeBacche.forEach((cur) => {
                if (cur.type === "folder") {
                    const newFolder = itemBanakeReturnKarNeWalaFunction("folder", "", cur);
                    folderNoteContainer.appendChild(newFolder);
                }
                else if (cur.type === "note") {
                    const newNote = itemBanakeReturnKarNeWalaFunction("note", "", cur);
                    folderNoteContainer.appendChild(newNote);
                }
            });
        }

        // console.log( JSON.parse( sessionStorage.getItem('folder_note_container_items_already_loaded') ) );

        // foldersKoBaccheAssignKaroAurContainerMeinDaaloFunction();
    }

});
function returnKaroIdKaFolderKeBacche(idOfCURfolder) {
    const currentSessStrg = JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'));
    const flatenedCurrentSessStrg = currentSessStrg.flat(Infinity);
    const bacche = flatenedCurrentSessStrg.filter((cur) => cur.parent_id === idOfCURfolder);
    return bacche;
}

function cleanseKaroSessionStorageKo(top_index) {
    const FNCitemsAlreadyLoaded = JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'));
    const flatenedFNCitemsAlreadyLoaded = FNCitemsAlreadyLoaded.flat(Infinity);

    const newFNCitemsAlreadyLoaded = flatenedFNCitemsAlreadyLoaded.filter((cur) => (cur.parent_id !== top_index));
    sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify(newFNCitemsAlreadyLoaded));
}


// breadcrumbs ka code below -->
breadcrumbContainer.addEventListener('click', (e) => {
    if (e.target.closest('span')) {
        // ab neeche se main kaam shuru kring -->
        const stringID = e.target.getAttribute('data-id');

        if (stringID === 'null') {
            navBackBtn.setAttribute('disabled', 'true');
            const fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
            const nullParentChildren = fncItemsAlreadyLoaded.filter((cur) => cur.parent_id === null);
            navArrayANDfncialKoUpdateKrneWalaFunc(null);
            generateBreadcrumbs();
            renderTheReceivedDataFunction(nullParentChildren);
        }
        else {
            const intStringID = parseInt(stringID);
            const fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
            const issParentKeChildren = fncItemsAlreadyLoaded.filter((cur) => cur.parent_id === intStringID);
            navArrayANDfncialKoUpdateKrneWalaFunc(intStringID);
            generateBreadcrumbs();
            renderTheReceivedDataFunction(issParentKeChildren);
        }
    }
});
function navArrayANDfncialKoUpdateKrneWalaFunc(item) {
    const navArrFromSessStrg = JSON.parse(sessionStorage.getItem('navigationArray'));
    // const navArrFromSessStrg = [null, 10, 17, 19];
    let newNavArr = [], index;

    for (let i = 0; i < navArrFromSessStrg.length; i++) {
        newNavArr.push(navArrFromSessStrg[i]);
        if (navArrFromSessStrg[i] === item) {
            index = ++i;
            break;
        }
    }

    // ab fncItemsAlreadyLoaded mein se hatao maal masala -->
    let fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
    for (let i = index; i < navArrFromSessStrg.length; i++) {
        fncItemsAlreadyLoaded = fncItemsAlreadyLoaded.filter((cur) => cur.parent_id !== navArrFromSessStrg[i]);
    }

    sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify(fncItemsAlreadyLoaded));
    sessionStorage.setItem('navigationArray', JSON.stringify(newNavArr));
}
function generateBreadcrumbs() {
    breadcrumbContainer.innerHTML = '';
    const navArrayFromSessStrg = JSON.parse(sessionStorage.getItem('navigationArray'));
    // const navArrayFromSessStrg = [null, 1, 2, 3];
    const spansKiArray = [];

    navArrayFromSessStrg.forEach((cur) => {
        if (cur === null) {
            const span = document.createElement('span');
            span.classList.add('breadcrumbContainer-span');
            span.setAttribute('data-id', null);
            span.innerText = `[ ${parseJwt().username} ]`;
            document.querySelector('title').innerText = `${parseJwt().username} - Notes Web Application - Great Notes`; // webpage ke title mein daaling the username
            spansKiArray.push(span);
        }
        else {
            const intID = parseInt(cur);
            const span = document.createElement('span');
            span.classList.add('breadcrumbContainer-span');
            span.setAttribute('data-id', intID);

            const fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
            const idPeFolder = fncItemsAlreadyLoaded.filter((cur) => cur.id === intID && cur.type === 'folder');
            span.innerText = idPeFolder[0].title;
            spansKiArray.push(span);
        }
    });

    // spansKiArray ke items going in the container ka code below -->
    if (spansKiArray.length === 1) {
        breadcrumbContainer.appendChild(spansKiArray[0]);
    }
    else {
        for (let i = 0; i < spansKiArray.length; i++) {
            if (i === 0) {
                const textEl = document.createTextNode(' > ');
                breadcrumbContainer.appendChild(spansKiArray[0]);
                breadcrumbContainer.appendChild(textEl);
            }
            else if (i === spansKiArray.length - 1) {
                breadcrumbContainer.appendChild(spansKiArray[i]);
            }
            else {
                const textEl = document.createTextNode(' > ');
                breadcrumbContainer.appendChild(spansKiArray[i]);
                breadcrumbContainer.appendChild(textEl);
            }
        }
    }
}
function parseJwt() {
    const token = localStorage.getItem('token');
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


// let a = 0;

// function breadcrumbsMeinChangesKrneWalaFunction() {
//     breadcrumbContainer.innerHTML = ""; //pehle waale maal ko khaali kar
//     const spansKiArray = [];


//     // spansKiArray ke andar spans going below -->
//     navigationArray.forEach((cur, index) => {
//         if (cur === null) {
//             const span = document.createElement('span');
//             span.classList.add('breadcrumbContainer-span');
//             span.innerText = `[${parseJwt().username}]`;

//             span.addEventListener('click', () => {
//                 // sessionStorage.navigationArray = JSON.stringify(navigationArray);

//                 folderNoteContainer.innerHTML = "";
//                 navBackBtn.setAttribute('disabled', "true");
//                 (async () => {
//                     try {
//                         const data = await window.allFetcherFunctions.fetchAllDataFunc();
//                         loadTheReturnedDataInTheContainer(data);
//                         // foldersKoBaccheAssignKaroAurContainerMeinDaaloFunction();
//                         navArrayKoUpdateKrneWalaFunc(0);
//                         breadcrumbsMeinChangesKrneWalaFunction();
//                     } catch (error) {
//                         console.error(error);
//                     }
//                 })();
//             });

//             spansKiArray.push(span);
//         }
//         else {
//             const intID = parseInt(cur);
//             // const idPeFolder = returnedData.filter((cur) => cur.id === intID && cur.type === "folder");
//             (async () => {
//                 try {
//                     const idPeFolder = await window.allFetcherFunctions.fetchTheParticularFolderAtIDfunc(intID);

//                     const span = document.createElement('span');
//                     span.classList.add('breadcrumbContainer-span');
//                     span.innerText = idPeFolder[0].title;

//                     span.addEventListener('click', () => {
//                         folderNoteContainer.innerHTML = "";
//                         let idKaFolderKeBacche = returnedData;

//                         if (idKaFolderKeBacche.length === 0) {
//                             const tempPara = agarScreenKhaaliTohYehItemDaaloFunction();
//                             folderNoteContainer.appendChild(tempPara);
//                         }
//                         else {
//                             idKaFolderKeBacche.forEach((current) => {
//                                 if (current.type === "folder") {
//                                     const newFolder = itemBanakeReturnKarNeWalaFunction("folder", "", current);
//                                     folderNoteContainer.appendChild(newFolder);
//                                 }
//                                 else if (current.type === "note") {
//                                     const newNote = itemBanakeReturnKarNeWalaFunction("note", "", current);
//                                     folderNoteContainer.appendChild(newNote);
//                                 }
//                             });
//                         }

//                         // foldersKoBaccheAssignKaroAurContainerMeinDaaloFunction();
//                         navArrayKoUpdateKrneWalaFunc(index);
//                         breadcrumbsMeinChangesKrneWalaFunction();
//                     });

//                     spansKiArray.push(span);
//                 } catch (error) {
//                     console.error(error);
//                 }
//             })();
//         }
//     });

//     // spansKiArray ke items going in the container ka code below -->
//     if (spansKiArray.length === 1) {
//         breadcrumbContainer.appendChild(spansKiArray[0]);
//     }
//     else {
//         for (let i = 0; i < spansKiArray.length; i++) {
//             if (i === 0) {
//                 const textEl = document.createTextNode(' > ');
//                 breadcrumbContainer.appendChild(spansKiArray[0]);
//                 breadcrumbContainer.appendChild(textEl);
//             }
//             else if (i === spansKiArray.length - 1) {
//                 breadcrumbContainer.appendChild(spansKiArray[i]);
//             }
//             else {
//                 const textEl = document.createTextNode(' > ');
//                 breadcrumbContainer.appendChild(spansKiArray[i]);
//                 breadcrumbContainer.appendChild(textEl);
//             }
//         }
//     }
//     // console.log(spansKiArray);
// }




// let b = 0;

// let c = 0;

// "folder-note container" ke event listeners
let mainItemNotimgORp = undefined, folderJiskeAndarDaalnaHai = undefined, folderToBeChanged = undefined, indexOfFolderToBeChanged = -1, indexOfNoteToBeChanged = -1, someRowIsSelected = undefined, noteToBeChanged = undefined, returnedData = null;
const messageDIV = document.querySelector('#move-to-folder-dialog-messageDIV');
folderNoteContainer.addEventListener('contextmenu', (e) => {
    const clickedEl = e.target;
    if (clickedEl.closest('[data-type="folder"]') || clickedEl.closest('[data-type="note"]')) {
        e.preventDefault(); //jo by-default khulta usse band kro        

        customContextMenu.style.left = e.clientX + "px";
        customContextMenu.style.top = e.clientY + "px";
        customContextMenu.style.display = "block";

        // particular context-menu option pe click kiya toh kya hoga -->
        // BELOW always selecting the folder not img or p

        if ((e.target.tagName).toLowerCase() === "img") {
            mainItemNotimgORp = e.target.parentElement;
        }
        else if ((e.target.tagName).toLowerCase() === "p") {
            mainItemNotimgORp = e.target.parentElement;
        }
        else mainItemNotimgORp = e.target;
        // console.log(mainItemNotimgORp);

        // "move to root" ko enable krne ka code below -->
        const idOfTheItem = parseInt(mainItemNotimgORp.getAttribute('data-id'));
        const typeOfTheItem = mainItemNotimgORp.getAttribute('data-type');

        const fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
        if (((fncItemsAlreadyLoaded.filter((cur) => cur.id === idOfTheItem && cur.type === typeOfTheItem)).find((cur, index) => index === 0)).parent_id !== null) {
            ccmMoveToRootBTN.removeAttribute('disabled');
        }
        else {
            ccmMoveToRootBTN.setAttribute('disabled', 'true');
        }
    }
});
folderNoteContainer.addEventListener('focusin', (e) => {
    const targetEl = e.target;
    if (targetEl.closest('#main-paragraph-of-folder') || targetEl.closest('#main-paragraph-of-note')) {
        diasbleTheOpeningOfFolderOrNote = true;
    }
});
folderNoteContainer.addEventListener('focusout', (e) => {
    const targetEl = e.target;
    if (targetEl.closest('#main-paragraph-of-folder') || targetEl.closest('#main-paragraph-of-note')) {
        diasbleTheOpeningOfFolderOrNote = undefined;
        abChangedTitleKoFixKrDeInDataFUNCTION(targetEl);
    }
});
folderNoteContainer.addEventListener('keydown', (e) => {
    const targetEl = e.target;
    if ((targetEl.closest('#main-paragraph-of-folder') || targetEl.closest('#main-paragraph-of-note')) && e.key === 'Enter') {
        e.preventDefault(); //next-line pe jaane se rokne ke liye likhi yeh line
        abChangedTitleKoFixKrDeInDataFUNCTION(targetEl);
    }
});
//drag-drop feature provide krne ka code below -->
let dragstartWalaEl = undefined, jisElmentPeDropKringVoh = undefined;
folderNoteContainer.addEventListener("dragstart", (e) => {
    const clickedEl = e.target;
    dragstartWalaEl = clickedEl;
    ghostItemBananeWalaFunction(e, clickedEl);
});
folderNoteContainer.addEventListener("dragend", (e) => {
    // dragstartWalaEl = undefined;
    const ghostItem = document.querySelector('#ghost-item-created-at-dragstart');
    if (ghostItem) {
        ghostItem.remove();
    }
});
folderNoteContainer.addEventListener('dragover', (e) => {
    if (e.target.closest('[data-type="folder"]') && dragstartWalaEl && e.target.closest(`[data-id="${dragstartWalaEl.getAttribute('data-id')}"]`) && e.target.closest(`[data-type="${dragstartWalaEl.getAttribute('data-type')}"]`));
    else if (e.target.closest('[data-type="folder"]') && dragstartWalaEl && e.target.getAttribute('data-id') !== dragstartWalaEl.getAttribute('data-id')) {
        e.preventDefault();
    }
});
folderNoteContainer.addEventListener('drop', (e) => {
    if (e.target.closest('[data-type="folder"]') && dragstartWalaEl && e.target.closest(`[data-id="${dragstartWalaEl.getAttribute('data-id')}"]`) && e.target.closest(`[data-type="${dragstartWalaEl.getAttribute('data-type')}"]`));
    else if (e.target.closest('[data-type="folder"]') && dragstartWalaEl && e.target.getAttribute('data-id') !== dragstartWalaEl.getAttribute('data-id')) {
        // BELOW always selecting the folder not img or p
        let tempItem = undefined;
        if ((e.target.tagName).toLowerCase() === "img") {
            tempItem = e.target.parentElement;
        }
        else if ((e.target.tagName).toLowerCase() === "p") {
            tempItem = e.target.parentElement;
        }
        else tempItem = e.target;
        // console.log(tempItem);

        jisElmentPeDropKringVoh = tempItem;

        // confirmation dialog box ko activate krne ka code below-->
        if (dragstartWalaEl.getAttribute('data-type') === "folder") {
            confirmationKrneWalaDialog.querySelector('.model-div h3 span').textContent = `move '${dragstartWalaEl.querySelector('#main-paragraph-of-folder').textContent}' to '${tempItem.querySelector('#main-paragraph-of-folder').textContent}'?`;
            confirmationKrneWalaDialog.showModal();
            confirmationKrneWalaDialog.classList.add('open-create-dialog-class');
            confirmationDialogOpenedFor = "drag-drop-shifting";
        }
        else if (dragstartWalaEl.getAttribute('data-type') === "note") {
            confirmationKrneWalaDialog.querySelector('.model-div h3 span').textContent = `move '${dragstartWalaEl.querySelector('#main-paragraph-of-note').textContent}' to '${tempItem.querySelector('#main-paragraph-of-folder').textContent}'?`;
            confirmationKrneWalaDialog.showModal();
            confirmationKrneWalaDialog.classList.add('open-create-dialog-class');
            confirmationDialogOpenedFor = "drag-drop-shifting";
        }
        else {
            console.log(`Kuch toh gadbad hai drop event mein`);

        }
    }
});
function ghostItemBananeWalaFunction(e, clickedEl) {
    let newItem = clickedEl.cloneNode(true);
    newItem.setAttribute('id', 'ghost-item-created-at-dragstart');
    newItem.style.border = 'none';
    newItem.style.boxShadow = 'none';
    newItem.style.margin = '20px';
    newItem.style.position = 'absolute';
    newItem.style.top = '-1000px';
    document.body.appendChild(newItem);
    e.dataTransfer.setDragImage(newItem, 70, 70);
}
// children of folder ko show krne wala function, note editor open krne wala function, this time with event-delegation
folderNoteContainer.addEventListener('click', (e) => {
    if (e.target.closest('[data-type="folder"]')) {

        if (e.target.classList.contains('temporary-para-of-folder')) { //'display full name' functionality ke liye
            let parentFolder = e.target.parentElement;
            parentFolder.querySelector('#main-paragraph-of-folder').classList.remove('make-invisible-the-p');
            e.target.classList.add('make-invisible-the-p');

            yehWaleFoldersYaNotesKeFullNamesKoHideKar.push(parentFolder);
        }

        if (diasbleTheOpeningOfFolderOrNote === true || e.target.classList.contains('temporary-para-of-folder')) { //for 'rename' functionality and 'display full name' functionality
            e.stopPropagation();
            return;
        }

        // BELOW always selecting the folder not img or p
        let mainFolder = undefined;
        if ((e.target.tagName).toLowerCase() === "img") {
            mainFolder = e.target.parentElement;
        }
        else if ((e.target.tagName).toLowerCase() === "p") {
            mainFolder = e.target.parentElement;
        }
        else mainFolder = e.target;
        // console.log(mainFolder);

        // ab main kaam shuru kring -->
        const id_of_clicked_folder = parseInt(mainFolder.getAttribute('data-id'));
        (async () => {
            try {
                const receivedData = await window.allFetcherFunctions.childrenOfTheFolderFetcherFunction(id_of_clicked_folder);

                if ((typeof receivedData) === 'string' && receivedData.includes('401')) {
                    window.location.href = addressOfTheFrontWebsite;
                    console.log(receivedData);
                }
                else {
                    renderTheReceivedDataFunction(receivedData);

                    // navigationArray ka code below -->
                    const navArrSessStrg = JSON.parse(sessionStorage.navigationArray);
                    navArrSessStrg.push(id_of_clicked_folder); //currently opened folder ko array pe chadha diya
                    if (navBackBtn.hasAttribute('disabled')) navBackBtn.removeAttribute('disabled'); //agar back btn disabled h toh usko enabled kr do
                    // breadcrumbsMeinChangesKrneWalaFunction();

                    // sessionStorage.currentFolderID = id_of_clicked_folder; //koi folder opened nhi hai; ie, root elements                    

                    sessionStorage.setItem('navigationArray', JSON.stringify(navArrSessStrg));
                    const fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
                    fncItemsAlreadyLoaded.push(receivedData);
                    sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify([fncItemsAlreadyLoaded]));
                    generateBreadcrumbs();
                    // console.log(fncItemsAlreadyLoaded);

                    // console.log( JSON.parse( sessionStorage.getItem('folder_note_container_items_already_loaded') ) );

                    // const dataItemsAlreadyLoadedSessStrg = JSON.parse(sessionStorage.dataItemsAlreadyLoaded);
                    // dataItemsAlreadyLoadedSessStrg.push(receivedData);
                    // sessionStorage.dataItemsAlreadyLoaded = JSON.stringify(dataItemsAlreadyLoadedSessStrg);
                }

            } catch (error) {
                console.error(error);
            }
        })();
    }
    else if (e.target.closest('[data-type="note"]')) {

        if (e.target.classList.contains('temporary-para-of-note')) { //'display full name' functionality ke liye
            let parentFolder = e.target.parentElement;
            parentFolder.querySelector('#main-paragraph-of-note').classList.remove('make-invisible-the-p');
            e.target.classList.add('make-invisible-the-p');

            yehWaleFoldersYaNotesKeFullNamesKoHideKar.push(parentFolder);
        }

        if (diasbleTheOpeningOfFolderOrNote === true || e.target.classList.contains('temporary-para-of-note')) { //for 'rename' functionality and 'display full name' functionality
            e.stopPropagation();
            return;
        }

        // BELOW always selecting the note not img or p
        let mainNote = undefined;
        if ((e.target.tagName).toLowerCase() === "img") {
            mainNote = e.target.parentElement;
        }
        else if ((e.target.tagName).toLowerCase() === "p") {
            mainNote = e.target.parentElement;
        }
        else mainNote = e.target;
        // console.log(mainNote);

        // ab main kaam shuru kring -->
        const id_of_clicked_note = parseInt(mainNote.getAttribute('data-id'));
        window.location.href = `note_editor.html?id=${id_of_clicked_note}`;
    }
});
function renderTheReceivedDataFunction(receivedData) {
    // console.log(receivedData);
    if (receivedData.length === 0) {
        folderNoteContainer.innerHTML = '';
        const tempPara = agarScreenKhaaliTohYehItemDaaloFunction(); //agar "folder-note container" khaali hai toh daal de "nothing to show"
        folderNoteContainer.appendChild(tempPara);
    }
    else {
        folderNoteContainer.innerHTML = '';
        receivedData.forEach((cur) => {
            if (cur.type === "folder") {
                const newFolder = itemBanakeReturnKarNeWalaFunction("folder", "", cur);
                folderNoteContainer.appendChild(newFolder);
            }
            else if (cur.type === "note") {
                const newNote = itemBanakeReturnKarNeWalaFunction("note", "", cur);
                folderNoteContainer.appendChild(newNote);
            }
        });
    }
}


// "move to folder" ka code below -->
function moveToFolderDialogKeAndarMaalLoadKarneWalaFunction(id, dataType) {
    if (dataType === "folder") {
        const allFolders = JSON.parse(JSON.stringify(returnedData));
        const itemContainer = moveToFolderDialog.querySelector('.move-to-folder-dialog-main-container .move-to-folder-dialog-main-container-items');
        const validFoldersArray = []; const finalArr = [];
        const intID = parseInt(id);
        const itemNTS = document.createElement('div');
        itemNTS.id = 'yeh-id-taaki-aage-jaake-dialog-ko-band-kar-skein-iss-element-ko';
        itemNTS.style = "text-align: center;";
        itemNTS.innerText = "⚠ Nothing To Show ⚠";
        // console.log(allFolders, itemContainer, id);

        // main checking-sheking huing neeche
        if (allFolders.length === 0) {
            itemContainer.innerHTML = '';
            itemContainer.appendChild(itemNTS);
        }
        else if (allFolders.length === 1 && allFolders[0].id === intID) {
            itemContainer.innerHTML = '';
            itemContainer.appendChild(itemNTS);
        }
        else {
            // id Ke Children AND grandchildren pata kring neeche
            let idKeChildren = idKeChildrenANDgrandchildrenReturnFunction(intID, allFolders, finalArr);
            idKeChildren = idKeChildren.flat(Infinity);  // console.log(idKeChildren);

            // below; agar folder koi child ya grandchild nahi hai apne folder ka toh hee use valid maana jaega
            allFolders.forEach((cur) => {
                let valid = 1;
                idKeChildren.forEach((current) => {
                    if (cur.id === current.id) valid = 0;
                });
                if (cur.id === intID) valid = 0;
                if (valid === 1) validFoldersArray.push(cur);
            });
            // console.log(validFoldersArray);


            //folder to table data below; neeche wala table stucture follow kra jaega-->
            // <table>
            //     <tr>
            //         <th>Folder</th>
            //         <th>Parent</th>
            //     </tr>
            //     <tr>
            //         <td>beta1</td>
            //         <td>baap1</td>
            //     </tr>
            //     <tr>
            //         <td>beta2</td>
            //         <td>baap1</td>
            //     </tr>
            //     <tr>
            //         <td>beta3</td>
            //         <td>baap3</td>
            //     </tr>
            // </table>
            const table = document.createElement('table');
            const tr = document.createElement('tr');
            const th1 = document.createElement('th');
            const th2 = document.createElement('th');
            th1.innerText = "Folder"; th2.innerHTML = "Parent";
            tr.appendChild(th1); tr.appendChild(th2); table.appendChild(tr);

            validFoldersArray.forEach((cur) => {
                const tr_temp = document.createElement('tr');
                const td1 = document.createElement('td');
                const td2 = document.createElement('td');
                td1.innerText = cur.title;
                td2.innerText = (cur.parent_id === null) ? "-" : (allFolders.filter((current) => cur.parent_id === current.id))[0].title;
                tr_temp.setAttribute('data-id', cur.id);
                tr_temp.setAttribute('data-type-of-caller', 'folder');
                tr_temp.appendChild(td1); tr_temp.appendChild(td2); table.appendChild(tr_temp);
            });

            itemContainer.innerHTML = ""; //pehle wale maal ko khaali ka
            itemContainer.appendChild(table);
            // console.log(table);
        }
    }
    else if (dataType === "note") {
        const allFolders = JSON.parse(JSON.stringify(returnedData));
        const itemContainer = moveToFolderDialog.querySelector('.move-to-folder-dialog-main-container .move-to-folder-dialog-main-container-items');
        const intID = parseInt(id);
        const itemNTS = document.createElement('div');
        itemNTS.id = 'yeh-id-taaki-aage-jaake-dialog-ko-band-kar-skein-iss-element-ko';
        itemNTS.style = "text-align: center;";
        itemNTS.innerText = "⚠ Nothing To Show ⚠";
        // console.log(allFolders, itemContainer, id);

        // main checking-sheking huing neeche
        if (allFolders.length === 0) {
            itemContainer.innerHTML = '';
            itemContainer.appendChild(itemNTS);
        }
        else {
            //folder to table data below; neeche wala table stucture follow kra jaega-->
            // <table>
            //     <tr>
            //         <th>Folder</th>
            //         <th>Parent</th>
            //     </tr>
            //     <tr>
            //         <td>beta1</td>
            //         <td>baap1</td>
            //     </tr>
            //     <tr>
            //         <td>beta2</td>
            //         <td>baap1</td>
            //     </tr>
            //     <tr>
            //         <td>beta3</td>
            //         <td>baap3</td>
            //     </tr>
            // </table>
            const table = document.createElement('table');
            const tr = document.createElement('tr');
            const th1 = document.createElement('th');
            const th2 = document.createElement('th');
            th1.innerText = "Folder"; th2.innerHTML = "Parent";
            tr.appendChild(th1); tr.appendChild(th2); table.appendChild(tr);

            allFolders.forEach((cur) => {
                const tr_temp = document.createElement('tr');
                const td1 = document.createElement('td');
                const td2 = document.createElement('td');
                td1.innerText = cur.title;
                td2.innerText = (cur.parent_id === null) ? "-" : (allFolders.filter((current) => cur.parent_id === current.id))[0].title;
                tr_temp.setAttribute('data-id', cur.id);
                tr_temp.setAttribute('data-type-of-caller', 'note');
                tr_temp.appendChild(td1); tr_temp.appendChild(td2); table.appendChild(tr_temp);
            });

            itemContainer.innerHTML = ""; //pehle wale maal ko khaali ka
            itemContainer.appendChild(table);
            // console.log(table);
        }
    }
}
ccmMoveToFolderLI.addEventListener('click', () => {
    (async () => {
        try {
            returnedData = await window.allFetcherFunctions.fetchAllFoldersFunc(); //fresh data ko extract krne ke liye

            if ((typeof returnedData) === 'string' && returnedData.includes('401')) {
                window.location.href = addressOfTheFrontWebsite;
                console.log(returnedData);
            }
            else {
                if (mainItemNotimgORp) {
                    moveToFolderDialogKeAndarMaalLoadKarneWalaFunction(mainItemNotimgORp.getAttribute('data-id'), mainItemNotimgORp.getAttribute('data-type'));
                    moveToFolderDialog.showModal();
                    moveToFolderDialog.classList.add('open-move-to-folder-dialog-class');
                }
            }

            // returnedData = window.currentState.data;
            // console.log(window.currentState);
        } catch (error) {
            console.error(error)
        }
    })();
});
cancelMoveToFolderDialog.addEventListener('click', () => {
    moveToFolderDialogKoCloseKrneWalaFunction();
});
moveToFolderDialog.addEventListener('click', (e) => { //delegating the handling of click event to movetofolder dialog trigggered when 'tr' is clicked 
    let element = undefined;

    if (e.target.closest('tr') && e.target.closest('tr').hasAttribute('data-id') && e.target.closest('tr').getAttribute('data-type-of-caller') === 'folder' && mainItemNotimgORp) {
        element = e.target.closest('tr');
        someRowIsSelected = true;
        const id = parseInt(element.getAttribute('data-id'));
        folderJiskeAndarDaalnaHai = returnedData.find((cur) => cur.id === id);
        folderToBeChanged = (returnedData.filter((cur) => cur.id === parseInt(mainItemNotimgORp.getAttribute('data-id')))).find((cur, index) => index === 0);
        // indexOfFolderToBeChanged = returnedData.findIndex((cur) => cur.id === parseInt(mainItemNotimgORp.getAttribute('data-id')));
        // console.log(folder, indexOfFolderToBeChanged);
        // console.log(mainItemNotimgORp);
        messageDIV.textContent = `You want to move '${folderToBeChanged.title}' to '${folderJiskeAndarDaalnaHai.title}'`;
    }
    else if (e.target.closest('tr') && e.target.closest('tr').hasAttribute('data-id') && e.target.closest('tr').getAttribute('data-type-of-caller') === 'note' && mainItemNotimgORp) {
        element = e.target.closest('tr');
        someRowIsSelected = true;
        const id = parseInt(element.getAttribute('data-id'));
        folderJiskeAndarDaalnaHai = returnedData.find((cur) => cur.id === id);
        const fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
        noteToBeChanged = (fncItemsAlreadyLoaded.filter((cur) => cur.id === parseInt(mainItemNotimgORp.getAttribute('data-id')) && cur.type === "note")).find((cur, index) => index === 0);
        // indexOfNoteToBeChanged = fncItemsAlreadyLoaded.findIndex((cur) => cur.id === parseInt(mainItemNotimgORp.getAttribute('data-id')) && cur.type === "note");
        // console.log(folder, indexOfFolderToBeChanged);
        // console.log(mainItemNotimgORp);
        messageDIV.textContent = `You want to move '${noteToBeChanged.title}' to '${folderJiskeAndarDaalnaHai.title}'`;
    }
});
okayMoveToFolder.addEventListener('click', () => {
    if (!someRowIsSelected) {
        const itemContainer = moveToFolderDialog.querySelector('.move-to-folder-dialog-main-container .move-to-folder-dialog-main-container-items');
        const itemNTS_hai_kya = itemContainer.children[0];

        if (itemNTS_hai_kya.id === 'yeh-id-taaki-aage-jaake-dialog-ko-band-kar-skein-iss-element-ko') moveToFolderDialogKoCloseKrneWalaFunction();
        else messageDIV.textContent = `Select Something First`;
    }
    else if (someRowIsSelected && folderJiskeAndarDaalnaHai && folderToBeChanged) {
        const data_obj = {
            folderJiskeAndarDaalnaHai_id: folderJiskeAndarDaalnaHai.id,
            folderToBeChanged_id: folderToBeChanged.id,
            data_type: "folder"
        };

        (async () => {
            try {
                const data = await window.allFetcherFunctions.updateParentIDFunction(data_obj);

                if ((typeof data) === 'string' && data.includes('401')) {
                    window.location.href = addressOfTheFrontWebsite;
                    console.log(data);
                }
                else {
                    console.log(data);

                    let fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
                    fncItemsAlreadyLoaded = fncItemsAlreadyLoaded.filter((cur) => !(cur.id === parseInt(folderToBeChanged.id) && cur.type === 'folder'));
                    fncItemsAlreadyLoaded.push(data.updated_row);
                    sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify(fncItemsAlreadyLoaded));

                    mainItemNotimgORp.remove();

                    if ((Array.from(folderNoteContainer.children)).length === 0) {
                        const tempPara = agarScreenKhaaliTohYehItemDaaloFunction();
                        folderNoteContainer.append(tempPara);
                    }

                    moveToFolderDialogKoCloseKrneWalaFunction();
                }
            } catch (error) {
                console.error(error);
            }
        })();
        // let temp_object = JSON.parse(JSON.stringify(folderToBeChanged));
        // // console.log(temp_object, folderToBeChanged);
        // temp_object.parent_id = folderJiskeAndarDaalnaHai.id;
        // returnedData.splice(indexOfFolderToBeChanged, 1, temp_object); //replacing the old with new
        // // console.log(returnedData, indexOfFolderToBeChanged);
    }
    else if (someRowIsSelected && folderJiskeAndarDaalnaHai && noteToBeChanged) {
        // let temp_object = JSON.parse(JSON.stringify(noteToBeChanged));
        // console.log(temp_object, noteToBeChanged);
        // temp_object.parent_id = folderJiskeAndarDaalnaHai.id;
        // returnedData.splice(indexOfNoteToBeChanged, 1, temp_object); //replacing the old with new
        // console.log(returnedData, indexOfFolderToBeChanged);

        const data_obj = {
            folderJiskeAndarDaalnaHai_id: folderJiskeAndarDaalnaHai.id,
            noteToBeChanged_id: noteToBeChanged.id,
            data_type: "note"
        };

        (async () => {
            try {
                const data = await window.allFetcherFunctions.updateParentIDFunction(data_obj);

                if ((typeof data) === 'string' && data.includes('401')) {
                    window.location.href = addressOfTheFrontWebsite;
                    console.log(data);
                }
                else {
                    console.log(data);

                    let fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
                    fncItemsAlreadyLoaded = fncItemsAlreadyLoaded.filter((cur) => !(cur.id === parseInt(noteToBeChanged.id) && cur.type === 'note'));
                    fncItemsAlreadyLoaded.push(data.updated_row);
                    sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify(fncItemsAlreadyLoaded));

                    mainItemNotimgORp.remove();

                    if ((Array.from(folderNoteContainer.children)).length === 0) {
                        const tempPara = agarScreenKhaaliTohYehItemDaaloFunction();
                        folderNoteContainer.append(tempPara);
                    }

                    moveToFolderDialogKoCloseKrneWalaFunction();
                    // sessionStorage.clear();
                    // window.location.reload();
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }
    else {
        console.log('Kuch toh gadbad hai okayMoveToFolder mein');
    }
});
function moveToFolderDialogKoCloseKrneWalaFunction() {
    moveToFolderDialog.classList.remove('open-move-to-folder-dialog-class');
    messageDIV.textContent = "";
    someRowIsSelected = undefined;
    // Wait for animation before closing
    setTimeout(() => moveToFolderDialog.close(), 300);
}
// "move to root" ka code below -->
ccmMoveToRootBTN.addEventListener('click', (e) => {
    if (mainItemNotimgORp) {
        const type = mainItemNotimgORp.getAttribute('data-type');
        const id = parseInt(mainItemNotimgORp.getAttribute('data-id'));
        const fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
        const objectOfItem = (fncItemsAlreadyLoaded.filter((cur) => cur.id === id && cur.type === type)).find((cur, index) => index === 0);

        // confirmation dialog box ko activate krne ka code below--> 
        confirmationKrneWalaDialog.querySelector('.model-div h3 span').textContent = `move '${objectOfItem.title}' to the root?`;
        confirmationKrneWalaDialog.showModal();
        confirmationKrneWalaDialog.classList.add('open-create-dialog-class');
        confirmationDialogOpenedFor = "moveToRoot";
    }
});
// "delete" ka code below -->
ccmDeleteLI.addEventListener('click', () => {
    if (mainItemNotimgORp) {
        const type = mainItemNotimgORp.getAttribute('data-type');
        const id = parseInt(mainItemNotimgORp.getAttribute('data-id'));
        // console.log(type, id);

        let fnc_items_already_loaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
        const objectOfItem = (fnc_items_already_loaded.filter((cur) => cur.id === id && cur.type === type)).find((cur, index) => index === 0);

        // confirmation dialog box ko activate krne ka code below--> 
        confirmationKrneWalaDialog.querySelector('.model-div h3 span').textContent = `delete '${objectOfItem.title}'?`;
        confirmationKrneWalaDialog.showModal();
        confirmationKrneWalaDialog.classList.add('open-create-dialog-class');
        confirmationDialogOpenedFor = "delete";
    }
});
// "rename" ka code below -->
ccmRenameLI.addEventListener('click', () => {
    if (mainItemNotimgORp && mainItemNotimgORp.getAttribute('data-type') === "folder") {
        const theParaElement = mainItemNotimgORp.querySelector('#main-paragraph-of-folder');
        const theTempParaElement = mainItemNotimgORp.querySelector('.temporary-para-of-folder');
        // console.log(theParaElement.style.display, theTempParaElement.style.display+"ddfg");        

        if (theParaElement.style.display === "none" && theTempParaElement) {
            theParaElement.style.display = "block";
            theTempParaElement.style.display = "none";

            theParaElement.setAttribute('contenteditable', 'true');
            theParaElement.focus();
        }
        else {
            theParaElement.setAttribute('contenteditable', 'true');
            theParaElement.focus();
        }
    }
    else if (mainItemNotimgORp && mainItemNotimgORp.getAttribute('data-type') === "note") {
        const theParaElement = mainItemNotimgORp.querySelector('#main-paragraph-of-note');
        const theTempParaElement = mainItemNotimgORp.querySelector('.temporary-para-of-note');
        // console.log(theParaElement.style.display, theTempParaElement.style.display+"ddfg");        

        if (theParaElement.style.display === "none" && theTempParaElement) {
            theParaElement.style.display = "block";
            theTempParaElement.style.display = "none";

            theParaElement.setAttribute('contenteditable', 'true');
            theParaElement.focus();
        }
        else {
            theParaElement.setAttribute('contenteditable', 'true');
            theParaElement.focus();
        }
    }
    else {
        console.log('Kuch toh gadbad hai rename ke code mein');
    }
});
function abChangedTitleKoFixKrDeInDataFUNCTION(targetElement) {
    // ab data ke andar changes honge -->
    const iconKiID = parseInt((targetElement.parentElement).getAttribute('data-id'));
    const iconKaType = (targetElement.parentElement).getAttribute('data-type');

    const data_obj = {
        id: iconKiID,
        type: iconKaType,
        changed_title: targetElement.textContent,
    };

    (async () => {
        try {
            const receivedMsg = await window.allFetcherFunctions.changeTheTitleFunction(data_obj);

            if ((typeof receivedMsg) === 'string' && receivedMsg.includes('401')) {
                window.location.href = addressOfTheFrontWebsite;
                console.log(receivedMsg);
            }
            else {
                console.log(receivedMsg);

                let fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
                fncItemsAlreadyLoaded = fncItemsAlreadyLoaded.filter((cur) => !(cur.id === iconKiID && cur.type === iconKaType));
                fncItemsAlreadyLoaded.push(receivedMsg.updated_row);
                sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify(fncItemsAlreadyLoaded));

                targetElement.removeAttribute('contenteditable');
                targetElement.blur();
                window.location.reload();
            }
        }
        catch (e) {
            console.error(e);
        }

    })();

    // const mainDataItem = (returnedData.filter((cur) => cur.id === iconKiID && cur.type === iconKaType)).find((cur, ind) => ind === 0);
    // const mainDataItemKiIndex = returnedData.findIndex((cur) => cur.id === iconKiID && cur.type === iconKaType);
    // const temp_item = JSON.parse(JSON.stringify(mainDataItem));
    // temp_item.title = targetElement.textContent;
    // returnedData.splice(mainDataItemKiIndex, 1, temp_item);
    // console.log(returnedData);
    // console.log(temp_item, mainDataItemKiIndex);
}

// "confirmation dialog" ka code below -->
okayConfirmationDialogBtn.addEventListener('click', () => {
    if (confirmationDialogOpenedFor && confirmationDialogOpenedFor === "moveToRoot") {
        const type = mainItemNotimgORp.getAttribute('data-type');
        const id = parseInt(mainItemNotimgORp.getAttribute('data-id'));

        const data_obj = {
            data_type: type,
            itemToBeChanged_id: id,
        };

        (async () => {
            try {
                const data = await window.allFetcherFunctions.updateParentIDSetNullFunction(data_obj);
                if ((typeof data) === 'string' && data.includes('401')) {
                    window.location.href = addressOfTheFrontWebsite;
                    console.log(data);
                }
                else {
                    console.log(data);

                    let fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
                    fncItemsAlreadyLoaded = fncItemsAlreadyLoaded.filter((cur) => !(cur.id === id && cur.type === type));
                    fncItemsAlreadyLoaded.push(data.updated_row);
                    sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify(fncItemsAlreadyLoaded));

                    mainItemNotimgORp.remove();

                    if ((Array.from(folderNoteContainer.children)).length === 0) {
                        const tempPara = agarScreenKhaaliTohYehItemDaaloFunction();
                        folderNoteContainer.append(tempPara);
                    }

                    closeConfirmationDialog();
                }
            } catch (error) {
                console.error(error);
            }
        })();

        // const objectOfItem = (returnedData.filter((cur) => cur.id === id && cur.type === type)).find((cur, index) => index === 0);
        // const index = returnedData.findIndex((cur) => cur.id === id && cur.type === type);
        // let temp_object = JSON.parse(JSON.stringify(objectOfItem));
        // temp_object.parent_id = null;
        // console.log(temp_object, index);
        // returnedData.splice(index, 1, temp_object);
    }
    else if (confirmationDialogOpenedFor && confirmationDialogOpenedFor === "delete") {
        const type = mainItemNotimgORp.getAttribute('data-type');
        const id = parseInt(mainItemNotimgORp.getAttribute('data-id'));

        // const objectOfItem = (returnedData.filter((cur) => cur.id === id && cur.type === type)).find((cur, index) => index === 0);

        (async () => {
            try {
                const fetchedMsg = await window.allFetcherFunctions.deleteItemFunction(id, type);

                if ((typeof fetchedMsg) === 'string' && fetchedMsg.includes('401')) {
                    window.location.href = addressOfTheFrontWebsite;
                    console.log(fetchedMsg);
                }
                else {
                    console.log(fetchedMsg);

                    let fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
                    fncItemsAlreadyLoaded = fncItemsAlreadyLoaded.filter((cur) => !(cur.id === id && cur.type === type));
                    sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify(fncItemsAlreadyLoaded));

                    mainItemNotimgORp.remove();

                    if ((Array.from(folderNoteContainer.children)).length === 0) {
                        const tempPara = agarScreenKhaaliTohYehItemDaaloFunction();
                        folderNoteContainer.append(tempPara);
                    }

                    closeConfirmationDialog();
                }

                // console.log(fetchedMsg);

                // const index = returnedData.findIndex((cur) => cur.id === id && cur.type === type);
                // returnedData.splice(index, 1);

                // folderNoteContainer.innerHTML = '';
                // folderNoteContainer.appendChild(agarScreenKhaaliTohYehItemDaaloFunction());
            } catch (error) {
                console.error(error);
            }
        })();
    }
    else if (confirmationDialogOpenedFor && confirmationDialogOpenedFor === "drag-drop-shifting") {
        // console.log(dragstartWalaEl, jisElmentPeDropKringVoh);

        const data_obj = {
            dragstartWalaEl_id: parseInt(dragstartWalaEl.getAttribute('data-id')),
            dragstartWalaEl_type: dragstartWalaEl.getAttribute('data-type'),
            jisFolderPeDropKringVoh_id: parseInt(jisElmentPeDropKringVoh.getAttribute('data-id')),
        };

        (async () => {
            try {
                const receivedMsg = await window.allFetcherFunctions.drag_dropShiftingIDsetterFunction(data_obj);

                if ((typeof receivedMsg) === 'string' && receivedMsg.includes('401')) {
                    window.location.href = addressOfTheFrontWebsite;
                    console.log(receivedMsg);
                }
                else {
                    console.log(receivedMsg);

                    let fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
                    fncItemsAlreadyLoaded = fncItemsAlreadyLoaded.filter((cur) => !(cur.id === parseInt(dragstartWalaEl.getAttribute('data-id')) && cur.type === dragstartWalaEl.getAttribute('data-type')));
                    // fncItemsAlreadyLoaded.push(receivedMsg.updated_row);
                    sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify(fncItemsAlreadyLoaded));

                    dragstartWalaEl.remove();

                    closeConfirmationDialog();
                }


            } catch (error) {
                console.error(error);
            }
        })();
    }
    else if (confirmationDialogOpenedFor && confirmationDialogOpenedFor === 'logout_operation') {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
    }
    else {
        console.log('Confirmation dialog ko okay krne mein kuch to gadbad hai');
    }
});
cancelConfirmationDialogBtn.addEventListener('click', closeConfirmationDialog);
function closeConfirmationDialog() {
    confirmationKrneWalaDialog.classList.remove('open-create-dialog-class');
    // Wait for animation before closing
    setTimeout(() => confirmationKrneWalaDialog.close(), 300);
    confirmationDialogOpenedFor = undefined;
}

// "LOGOUT" btn ka code below -->
logout_btn.addEventListener('click', () => {

    // confirmation dialog box ko activate krne ka code below--> 
    confirmationKrneWalaDialog.querySelector('.model-div h3 span').textContent = `logout?`;
    confirmationKrneWalaDialog.showModal();
    confirmationKrneWalaDialog.classList.add('open-create-dialog-class');
    confirmationDialogOpenedFor = "logout_operation";
});

// utlitly functions ka code below -->
function itemBanakeReturnKarNeWalaFunction(item, action, cur = undefined) {
    navigationArray = JSON.parse(sessionStorage.navigationArray);

    if (item === "folder" && action === "creation") {
        let newFolder = folderIconTemplate.content.cloneNode(true);
        newFolder.querySelector('.icon').classList.add('folder');
        newFolder.querySelector('.icon p').textContent = (inputOfCreateFolderModal.value === "") ? "New Folder" : inputOfCreateFolderModal.value;
        // data-id attribute upar lgega     // newFolder.querySelector('.icon').setAttribute("data-id", currentMaxFolderID + 1);
        newFolder.querySelector('.icon').setAttribute("data-type", "folder");
        newFolder.querySelector('.icon').setAttribute("parent-id", navigationArray.at(navigationArray.length - 1)); //only for database purposes

        //folder-name shortener -->
        if (newFolder.querySelector('p').textContent.length > 15) {
            newFolder.querySelector('p').classList.add('make-invisible-the-p');

            const tempPara = document.createElement('p');
            tempPara.classList.add('temporary-para-of-folder');
            tempPara.innerText = newFolder.querySelector('p').textContent.substring(0, 15) + "...";
            newFolder.querySelector('p').parentElement.appendChild(tempPara);
        }

        return newFolder;
    }
    else if (item === "folder" && cur !== undefined) {
        let newFolder = folderIconTemplate.content.cloneNode(true);
        newFolder.querySelector('.icon').classList.add('folder');
        newFolder.querySelector('.icon p').textContent = (cur.title === "") ? "New Folder" : cur.title;
        newFolder.querySelector('.icon').setAttribute("data-id", cur.id);
        newFolder.querySelector('.icon').setAttribute("data-type", "folder");

        //folder-name shortener -->
        if (newFolder.querySelector('p').textContent.length > 15) {
            newFolder.querySelector('p').classList.add('make-invisible-the-p');

            const tempPara = document.createElement('p');
            tempPara.classList.add('temporary-para-of-folder');
            tempPara.innerText = newFolder.querySelector('p').textContent.substring(0, 15) + "...";
            newFolder.querySelector('p').parentElement.appendChild(tempPara);
        }

        return newFolder;
    }
    else if (item === "note" && action === "creation") {
        let newNote = noteIconTemplate.content.cloneNode(true);
        newNote.querySelector('.icon').classList.add('note');
        newNote.querySelector('.icon p').textContent = (inputOfCreateNoteModal.value === "") ? "New Note" : inputOfCreateNoteModal.value;
        // data-id attribute upar lgega     // newNote.querySelector('.icon').setAttribute("data-id", currentMaxNoteID + 1);
        newNote.querySelector('.icon').setAttribute("data-type", "note");
        newNote.querySelector('.icon').setAttribute("parent-id", navigationArray.at(navigationArray.length - 1)); //only for database purposes

        // context-menu ke liye -->
        // newNote.querySelector('.icon').addEventListener('contextmenu', (e) => {
        //     e.preventDefault(); //jo by-default khulta usse band kro

        //     customContextMenu.style.left = e.clientX + "px";
        //     customContextMenu.style.top = e.clientY + "px";

        //     customContextMenu.style.display = "block";
        // });

        //note-name shortener -->
        if (newNote.querySelector('p').textContent.length > 15) {
            newNote.querySelector('p').classList.add('make-invisible-the-p');

            const tempPara = document.createElement('p');
            tempPara.classList.add('temporary-para-of-note');
            tempPara.innerText = newNote.querySelector('p').textContent.substring(0, 15) + "...";
            newNote.querySelector('p').parentElement.appendChild(tempPara);
        }

        return newNote;
    }
    else if (item === "note" && cur !== undefined) {
        let newNote = noteIconTemplate.content.cloneNode(true);
        newNote.querySelector('.icon').classList.add('note');
        newNote.querySelector('.icon p').textContent = (cur.title === "") ? "New Note" : cur.title;
        newNote.querySelector('.icon').setAttribute("data-id", cur.id);
        newNote.querySelector('.icon').setAttribute("data-type", "note");

        // context-menu ke liye -->
        // newNote.querySelector('.icon').addEventListener('contextmenu', (e) => {
        //     e.preventDefault(); //jo by-default khulta usse band kro

        //     customContextMenu.style.left = e.clientX + "px";
        //     customContextMenu.style.top = e.clientY + "px";

        //     customContextMenu.style.display = "block";
        // });

        //note-name shortener -->
        if (newNote.querySelector('p').textContent.length > 15) {
            newNote.querySelector('p').classList.add('make-invisible-the-p');

            const tempPara = document.createElement('p');
            tempPara.classList.add('temporary-para-of-note');
            tempPara.innerText = newNote.querySelector('p').textContent.substring(0, 15) + "...";
            newNote.querySelector('p').parentElement.appendChild(tempPara);
        }
        return newNote;
    }
}

function agarScreenKhaaliTohYehItemDaaloFunction() {
    const tempPara = document.createElement('p');
    tempPara.id = "tempFolderNoteContainerPara";
    tempPara.style = `position:absolute; top:50%; left:50%; transform: translate(-50%, -50%); font-family: "Montserrat", sans-serif; font-weight:700; font-size:1.5rem; text-wrap: nowrap;`
    tempPara.innerHTML = "&#x26A0; Nothing To Show &#x26A0;";

    return tempPara;
}

function idKeChildrenANDgrandchildrenReturnFunction(integerID, allFolders, accArr) {
    const bacche = allFolders.filter((cur) => cur.parent_id === integerID);
    if (bacche.length !== 0) accArr.push(bacche);

    bacche.forEach((baccha) => {
        // if (bacche.length === 0) console.log('khaali bacche array print kr di');
        idKeChildrenANDgrandchildrenReturnFunction(parseInt(baccha.id), allFolders, accArr);
    });

    return accArr;
}   