const https = require('https');
const fs = require('fs');

const config = fs.readFileSync('C:\\Users\\User\\AppData\\Roaming\\xdg.config\\.wrangler\\config\\default.toml', 'utf8');
const match = config.match(/oauth_token\s*=\s*"([^"]+)"/);
const token = match[1];
const accountId = '9a02348778c61e7f9c2b572cabae682e';
const projectName = 'dog-pregnancy-calculator';
const targetDomain = 'dog.vadisabilitycalculator.org';

const body = JSON.stringify({ name: targetDomain });

const req = https.request(`https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/domains`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Add domain response:', data);
  });
});

req.on('error', console.error);
req.write(body);
req.end();
