const https = require('https');
const fs = require('fs');

const config = fs.readFileSync('C:\\Users\\User\\AppData\\Roaming\\xdg.config\\.wrangler\\config\\default.toml', 'utf8');
const match = config.match(/oauth_token\s*=\s*"([^"]+)"/);
const token = match[1];
const accountId = '9a02348778c61e7f9c2b572cabae682e';

const req = https.request(`https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.result) {
        console.log("Pages projects:", parsed.result.map(p => ({
          name: p.name,
          domains: p.domains,
          subdomain: p.subdomain
        })));
      } else {
        console.log("Error:", data);
      }
    } catch (e) {
      console.error(e);
    }
  });
});

req.on('error', console.error);
req.end();
