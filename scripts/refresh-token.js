const https = require('https');
const fs = require('fs');

const configPath = 'C:\\Users\\User\\AppData\\Roaming\\xdg.config\\.wrangler\\config\\default.toml';
const config = fs.readFileSync(configPath, 'utf8');
const match = config.match(/refresh_token\s*=\s*"([^"]+)"/);
if (!match) {
  console.error("Refresh token not found");
  process.exit(1);
}
const refreshToken = match[1];

const body = new URLSearchParams({
  grant_type: 'refresh_token',
  client_id: '54d11594-84e4-41aa-b438-e81b8fa78ee7',
  refresh_token: refreshToken
}).toString();

const req = https.request('https://dash.cloudflare.com/oauth2/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(body)
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.access_token) {
        console.log("Got new access token!");
        const newConfig = config
          .replace(/oauth_token\s*=\s*"[^"]+"/, `oauth_token = "${parsed.access_token}"`)
          .replace(/refresh_token\s*=\s*"[^"]+"/, `refresh_token = "${parsed.refresh_token || refreshToken}"`);
        fs.writeFileSync(configPath, newConfig);
        console.log("Updated default.toml successfully!");
      } else {
        console.log("Response:", data);
      }
    } catch (e) {
      console.error(e, data);
    }
  });
});

req.on('error', console.error);
req.write(body);
req.end();
