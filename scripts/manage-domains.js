const https = require('https');
const fs = require('fs');

const config = fs.readFileSync('C:\\Users\\User\\AppData\\Roaming\\xdg.config\\.wrangler\\config\\default.toml', 'utf8');
const match = config.match(/oauth_token\s*=\s*"([^"]+)"/);
const token = match[1];
const accountId = '9a02348778c61e7f9c2b572cabae682e';
const projectName = 'dog-pregnancy-calculator';

function listDomains() {
  const req = https.request(`https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/domains`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Project domains response:', data);
    });
  });
  req.on('error', console.error);
  req.end();
}

listDomains();
