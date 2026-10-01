const https = require('https');
const fs = require('fs');

const config = fs.readFileSync('C:\\Users\\User\\AppData\\Roaming\\xdg.config\\.wrangler\\config\\default.toml', 'utf8');
const match = config.match(/oauth_token\s*=\s*"([^"]+)"/);
const token = match[1];
const zoneId = '3b170e606f6f2875e55264b4440a2c32';

const dnsRecord = {
  type: 'CNAME',
  name: 'dog',
  content: 'dog-pregnancy-calculator.pages.dev',
  ttl: 1, // automatic
  proxied: true
};

const body = JSON.stringify(dnsRecord);

const req = https.request(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
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
    console.log('Create DNS response:', data);
  });
});

req.on('error', console.error);
req.write(body);
req.end();
