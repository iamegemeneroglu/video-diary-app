// Purpose: SQLite database helper functions for Video Diary app. 
// But not used.
import * as SQLite from "expo-sqlite";

interface SQLTransaction {
  executeSql: (
    sql: string,
    params?: any[],
    successCallback?: (tx: SQLTransaction, result: any) => void,
    errorCallback?: (tx: SQLTransaction, error: any) => boolean
  ) => void;
}

interface ExtendedSQLiteDatabase {
  transaction: (
    callback: (tx: SQLTransaction) => void,
    errorCallback?: (error: any) => void,
    successCallback?: () => void
  ) => void;
}

const db = SQLite.openDatabaseAsync(
  "videoDiary.db"
) as unknown as ExtendedSQLiteDatabase;

if (!db) {
  console.error(
    "DB is undefined. Make sure you're running on a device or a custom dev build."
  );
  throw new Error("SQLite database object is undefined.");
}

export const initDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx: SQLTransaction) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS videos (
            id INTEGER PRIMARY KEY NOT NULL,
            videoUri TEXT NOT NULL,
            name TEXT NOT NULL,
            description TEXT NOT NULL
          );`,
          [],
          () => {
            console.log("Database initialized successfully.");
            resolve();
          },
          (_: any, error: any) => {
            console.error("DB init error", error);
            reject(error);
            return false;
          }
        );
      },
      (error: any) => {
        console.error("Transaction error during initDB", error);
        reject(error);
      },
      () => resolve()
    );
  });
};

export const insertVideo = (
  id: number,
  videoUri: string,
  name: string,
  description: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx: SQLTransaction) => {
        tx.executeSql(
          `INSERT INTO videos (id, videoUri, name, description) VALUES (?, ?, ?, ?);`,
          [id, videoUri, name, description],
          (_: any, result: any) => {
            console.log("Video inserted successfully.");
            resolve(result);
          },
          (_: any, error: any) => {
            console.error("Insert video error", error);
            reject(error);
            return false;
          }
        );
      },
      (error: any) => {
        console.error("Transaction error during insertVideo", error);
        reject(error);
      }
    );
  });
};

export const fetchVideos = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx: SQLTransaction) => {
        tx.executeSql(
          `SELECT * FROM videos;`,
          [],
          (_: any, result: any) => {
            console.log("Videos fetched successfully.");
            resolve(result.rows._array);
          },
          (_: any, error: any) => {
            console.error("Fetch videos error", error);
            reject(error);
            return false;
          }
        );
      },
      (error: any) => {
        console.error("Transaction error during fetchVideos", error);
        reject(error);
      }
    );
  });
};

export const updateVideo = (
  id: number,
  data: Partial<{ videoUri: string; name: string; description: string }>
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const { videoUri, name, description } = data;
    db.transaction(
      (tx: SQLTransaction) => {
        tx.executeSql(
          `UPDATE videos SET name = ?, description = ? WHERE id = ?;`,
          [name, description, id],
          (_: any, result: any) => {
            console.log("Video updated successfully.");
            resolve(result);
          },
          (_: any, error: any) => {
            console.error("Update video error", error);
            reject(error);
            return false;
          }
        );
      },
      (error: any) => {
        console.error("Transaction error during updateVideo", error);
        reject(error);
      }
    );
  });
};

export const deleteVideo = (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx: SQLTransaction) => {
        tx.executeSql(
          `DELETE FROM videos WHERE id = ?;`,
          [id],
          (_: any, result: any) => {
            console.log("Video deleted successfully.");
            resolve(result);
          },
          (_: any, error: any) => {
            console.error("Delete video error", error);
            reject(error);
            return false;
          }
        );
      },
      (error: any) => {
        console.error("Transaction error during deleteVideo", error);
        reject(error);
      }
    );
  });
};

export default db;
