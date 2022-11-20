import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });


// GET function
export const getDb = async (value) => {
  console.log('Get request for jateDB');
  // connect to DB and version we want to use
  const jateDb = await openDB('jate', 1);
  // New readwrite transaction.
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open the object store
  const objStore = tx.objectStore('jate');
  // use getAll() method to get all content in the DB
  const req = objStore.getAll()
  // confirm the data was fetched
  const result = await req;
  console.log(result);
};

// PUT function
export const putDb = async (id, value) => {
  console.log('PUT request to update the jateDB');
  // connect to DB and version we want to use
  const jateDb = await openDB('jate', 1);
  // New readwrite transaction.
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open the object store
  const objStore = tx.objectStore('jate');
  // Use put() method to pass in content
  const req = objStore.put({ id, value })
  // Confirm the data was added
  const result = await req;
  console.log('Data saved to the database', result);
};

initdb();
