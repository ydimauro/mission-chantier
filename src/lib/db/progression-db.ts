import type { StudentFile } from "@/lib/schemas/student-file";

/**
 * Cache local de progression (IndexedDB, docs/SAUVEGARDE.md).
 *
 * Le magasin est indexé par `studentCode` plutôt que par un seul
 * emplacement fixe : un poste du collège est partagé par plusieurs élèves
 * au fil de la journée, et chacun doit retrouver sa propre progression sans
 * jamais écraser celle d’un autre élève qui aurait utilisé la même machine
 * (voir docs/SAUVEGARDE.md, note sur les postes partagés).
 */

const DB_NAME = "mission-chantier-progression";
const DB_VERSION = 1;
const STORE_STUDENT_FILES = "student-files";
const STORE_DIRECTORY_HANDLES = "directory-handles";

function isIndexedDbAvailable(): boolean {
  return typeof indexedDB !== "undefined";
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_STUDENT_FILES)) {
        db.createObjectStore(STORE_STUDENT_FILES, { keyPath: "studentCode" });
      }
      if (!db.objectStoreNames.contains(STORE_DIRECTORY_HANDLES)) {
        db.createObjectStore(STORE_DIRECTORY_HANDLES, { keyPath: "studentCode" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore<T>(
  storeName: string,
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<T> | Promise<T>,
): Promise<T> {
  const db = await openDatabase();
  try {
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    const result = run(store);
    return result instanceof IDBRequest ? await requestToPromise(result) : await result;
  } finally {
    db.close();
  }
}

export async function getStudentFile(studentCode: string): Promise<StudentFile | null> {
  if (!isIndexedDbAvailable()) return null;
  const result = await withStore<StudentFile | undefined>(
    STORE_STUDENT_FILES,
    "readonly",
    (store) => store.get(studentCode) as IDBRequest<StudentFile | undefined>,
  );
  return result ?? null;
}

export async function putStudentFile(file: StudentFile): Promise<void> {
  if (!isIndexedDbAvailable()) return;
  await withStore(STORE_STUDENT_FILES, "readwrite", (store) => store.put(file));
}

export async function deleteStudentFile(studentCode: string): Promise<void> {
  if (!isIndexedDbAvailable()) return;
  await withStore(STORE_STUDENT_FILES, "readwrite", (store) => store.delete(studentCode));
}

export async function listStudentCodes(): Promise<string[]> {
  if (!isIndexedDbAvailable()) return [];
  const keys = await withStore<IDBValidKey[]>(STORE_STUDENT_FILES, "readonly", (store) =>
    store.getAllKeys(),
  );
  return keys.map((key) => String(key));
}

export async function clearAllStudentFiles(): Promise<void> {
  if (!isIndexedDbAvailable()) return;
  await withStore(STORE_STUDENT_FILES, "readwrite", (store) => store.clear());
}

type StoredDirectoryHandle = {
  studentCode: string;
  handle: FileSystemDirectoryHandle;
};

export async function getDirectoryHandle(
  studentCode: string,
): Promise<FileSystemDirectoryHandle | null> {
  if (!isIndexedDbAvailable()) return null;
  const result = await withStore<StoredDirectoryHandle | undefined>(
    STORE_DIRECTORY_HANDLES,
    "readonly",
    (store) => store.get(studentCode) as IDBRequest<StoredDirectoryHandle | undefined>,
  );
  return result?.handle ?? null;
}

export async function putDirectoryHandle(
  studentCode: string,
  handle: FileSystemDirectoryHandle,
): Promise<void> {
  if (!isIndexedDbAvailable()) return;
  const entry: StoredDirectoryHandle = { studentCode, handle };
  await withStore(STORE_DIRECTORY_HANDLES, "readwrite", (store) => store.put(entry));
}

export async function clearAllDirectoryHandles(): Promise<void> {
  if (!isIndexedDbAvailable()) return;
  await withStore(STORE_DIRECTORY_HANDLES, "readwrite", (store) => store.clear());
}

/**
 * Efface tout le cache de progression de ce poste, tous élèves confondus
 * (page /privacy, bouton « Effacer mes données locales »).
 */
export async function clearProgressionDatabase(): Promise<void> {
  await Promise.all([clearAllStudentFiles(), clearAllDirectoryHandles()]);
}
