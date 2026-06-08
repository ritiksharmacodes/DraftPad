import React, { useEffect } from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore.ts';
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
    const navigationPath = useWorkspaceStore((state) => state.navigationPath);
    const folders = useWorkspaceStore((state) => state.folders);
    const navigateToBreadcrumb = useWorkspaceStore((state)=>state.actions.navigateToBreadcrumb);

    return (
        // Matches your <div id="breadcrumbContainer"></div> perfectly
        <div className="breadcrumbContainer">
            {navigationPath.map((folderId, index) => {
                const isLast = index === navigationPath.length - 1;
                
                // Determine the visible text name
                let displayTitle:string;
                if (folderId === null) {
                    displayTitle = `[REPLACE_WITH_THE_USRNAME_OF_THE_USER]`;
                } else {
                    displayTitle = `${(folders.find((folder)=>folder.id === folderId))?.title}`;
                }

                return (
                    <React.Fragment key={index}>
                        {/* Matches your .breadcrumbContainer-span CSS selectors */}
                        <span 
                            className="breadcrumbContainer-span" 
                            data-id={folderId ?? "null"}
                            onClick={() => navigateToBreadcrumb(index)}
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
