/**
 * HELPERS
 */
const toUTC = (stringDate) => (
  new Date(`${stringDate}T00:00:00Z`)
);

const generateNumberDigits = (digits) => (
  Math.floor(Math.random() * 10**digits)
);

const generateNumberQuantity = (quantity) => (
  Math.floor(Math.random() * quantity)
);

const generateDate = () => {
  const currentDate = new Date();
  const treeMonthsInMiliseconds = 3 * 30 * 24 * 60 * 60 * 1000;
  const threeMonthsAgo = new Date(currentDate.getTime() - treeMonthsInMiliseconds);

  const randomTime = Math.random() 
    * (currentDate.getTime() - threeMonthsAgo.getTime()) 
    + threeMonthsAgo.getTime();
  return new Date(randomTime);
};

const getRandomItem = (list) => (
  list[generateNumberQuantity(list.length)]
);

/** 
 * MOCK SAMPLES 
 */
const userOwner = { 
  _id: UUID('6ddf9759-23fa-4df9-a85d-0c3cb1027fe0'), 
  username: 'juan.perez'
};
const userViewer1 = { 
  _id: UUID('d3d210e0-956f-4ae2-b3aa-1ded882b1045'), 
  username: 'paula.lopez'
};
const userViewer2 = { 
  _id: UUID('1af9de4a-825c-4d6e-b15f-f4f575d9c319'), 
  username: 'ana.ramirez'
};

const priority = ['high', 'medium', 'low'];

const generateFiles = (length, users) => (
  Array.from({ length }, () => ({
    _id: UUID(),
    nombre: `File ${generateNumberDigits(3)}`,
    date: generateDate(),
    priority: getRandomItem(priority),
    ...users
  }))
);

/**
 * MONGO CONFIG
 */
const globalUser = {
  user: 'root',
  pwd: 'root',
  roles: ['readWriteAnyDatabase', 'dbAdminAnyDatabase']
};
db = db.getSiblingDB('admin');
db.createUser(globalUser);

/**
 * MONGO DATA
 */
db = db.getSiblingDB('db1');
db.createCollection('db1_users');
db.db1_users.insertMany([
  userOwner, 
  userViewer1, 
  userViewer2
]);

db = db.getSiblingDB('db2');
db.createCollection('db2_files');

db.db2_files.insertMany([
  ...generateFiles(10, {
    owner: userOwner._id,
    viewers: [
      userViewer1._id,
      userViewer2._id
    ]
  })
]);
