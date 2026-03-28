const fs = require('fs');
let b = fs.readFileSync('src/app/(protected)/dashboard/page.tsx', 'utf8');
// Fix \` to `
b = b.replace(/\\`/g, '`');
// Fix \$ to $
b = b.replace(/\\\$/g, '$');
fs.writeFileSync('src/app/(protected)/dashboard/page.tsx', b);
