const { syncDigiflazzHarga } = require("./src/utils/sync-katalog");
// @ts-ignore
syncDigiflazzHarga().then(console.log).catch(console.error);
