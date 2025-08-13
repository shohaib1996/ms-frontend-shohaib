import localforage from 'localforage';
import * as memoryDriver from 'localforage-driver-memory';

localforage.defineDriver(memoryDriver);
localforage.setDriver([
    localforage.LOCALSTORAGE,
    localforage.INDEXEDDB,
    localforage.WEBSQL,
    memoryDriver._driver,
]);

localforage.config({
    // driver: localforage.INDEXEDDB,
    name: 'multischool_branch_admin_data',
});

export default localforage;
