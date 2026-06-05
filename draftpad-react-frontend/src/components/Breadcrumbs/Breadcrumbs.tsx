import React, { useEffect } from 'react';
import { useWorkspaceStore } from './useWorkspaceStore';
import "./Breadcrumbs.css";

// export function Breadcrumbs() {
//     breadcrumbContainer.innerHTML = '';
//     const navArrayFromSessStrg = JSON.parse(sessionStorage.getItem('navigationArray'));
//     // const navArrayFromSessStrg = [null, 1, 2, 3];
//     const spansKiArray = [];

//     navArrayFromSessStrg.forEach((cur) => {
//         if (cur === null) {
//             const span = document.createElement('span');
//             span.classList.add('breadcrumbContainer-span');
//             span.setAttribute('data-id', null);
//             span.innerText = `[ ${parseJwt().username} ]`;
//             document.querySelector('title').innerText = `${parseJwt().username} - Notes Web Application - DraftPad`; // webpage ke title mein daaling the username
//             spansKiArray.push(span);
//         }
//         else {
//             const intID = parseInt(cur);
//             const span = document.createElement('span');
//             span.classList.add('breadcrumbContainer-span');
//             span.setAttribute('data-id', intID);

//             const fncItemsAlreadyLoaded = (JSON.parse(sessionStorage.getItem('folder_note_container_items_already_loaded'))).flat(Infinity);
//             const idPeFolder = fncItemsAlreadyLoaded.filter((cur) => cur.id === intID && cur.type === 'folder');
//             span.innerText = idPeFolder[0].title;
//             spansKiArray.push(span);
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
// }

export function Breadcrumbs() {
    // 1. Grab state and navigation actions from your Zustand store
    const navigationPath = useWorkspaceStore((state) => state.navigationPath);
    const folders = useWorkspaceStore((state) => state.folders);
    
    // Assuming your state has a navigateTo action to jump to a specific folder index
    const { navigateTo } = useWorkspaceStore((state) => state.actions);

    // Mock username—replace this with your actual auth/JWT logic variables
    const username = "User"; 

    // 2. Automatically sync the document webpage title when navigation changes
    useEffect(() => {
        const currentFolderId = navigationPath[navigationPath.length - 1];
        
        if (currentFolderId === null) {
            document.title = `${username} - Notes Web Application - DraftPad`;
        } else {
            const currentFolder = folders.find(f => f.id === currentFolderId);
            if (currentFolder) {
                document.title = `${currentFolder.title} - DraftPad`;
            }
        }
    }, [navigationPath, folders, username]);

    // 3. Handle jumping back when a user clicks a breadcrumb higher up the chain
    const handleBreadcrumbClick = (targetFolderId: number | null, index: number) => {
        // Truncate the navigation path up to the clicked breadcrumb's index
        const updatedPath = navigationPath.slice(0, index + 1);
        // sessionStorage.setItem("navigationArray", JSON.stringify(updatedPath)); 
        
        // Update your store state (assuming your store updates navigationPath)
        useWorkspaceStore.setState({ navigationPath: updatedPath });
    };

    return (
        // Matches your <div id="breadcrumbContainer"></div> perfectly
        <div className="breadcrumbContainer">
            {navigationPath.map((folderId, index) => {
                const isLast = index === navigationPath.length - 1;
                
                // Determine the visible text name
                let displayTitle = `[ ${username} ]`;
                if (folderId !== null) {
                    const matchedFolder = folders.find(f => f.id === folderId);
                    displayTitle = matchedFolder ? matchedFolder.title : `Folder ${folderId}`;
                }

                return (
                    <React.Fragment key={index}>
                        {/* Matches your .breadcrumbContainer-span CSS selectors */}
                        <span 
                            className="breadcrumbContainer-span" 
                            data-id={folderId ?? "null"}
                            onClick={() => handleBreadcrumbClick(folderId, index)}
                        >
                            {displayTitle}
                        </span>
                        
                        {/* Inserts your ' > ' string dynamically, skipping the very last item */}
                        {!isLast && <span className="breadcrumb-separator"> &gt; </span>}
                    </React.Fragment>
                );
            })}
        </div>
    );
}
