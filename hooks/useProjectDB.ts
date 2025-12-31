import { openDB, deleteDB, wrap, unwrap } from "idb";
import {useCallback, useEffect, useState} from "react";


export interface Project {
    id: string;
    name: string;
    description?: string;
    images: string[];
    url: string;
}

const DB_NAME = 'designmatchDB';
const STORE_NAME = 'projects';
const DB_VERSION = 1;

export function useProjectDB() {
    const [db, setDB] = useState<any>(null);
    const [loading,setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function initDB() {
            const database = await openDB(DB_NAME, DB_VERSION, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains(STORE_NAME)) {
                        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                    }
                },
            });
            setDB(database);
            setLoading(false);
        }
        initDB();

    }, []);

    const getAllProjects = useCallback(async (): Promise<Project[]> => {
        if (!db) return [];
        return await db.getAll(STORE_NAME);
    }, [db]);

    const saveProject = useCallback(async (project: Project): Promise<void> => {
        if (!db) return;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        await tx.store.put(project);
        await tx.done;
    }, [db]);

    const deleteProject = useCallback(async (id: string): Promise<void> => {
        if (!db) return;
        await db.delete(STORE_NAME, id);
    }, [db]);

    return { getAllProjects, saveProject, deleteProject, loading };
}