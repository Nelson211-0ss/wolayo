# ============================================
# WOLAYO DEPLOYMENT GUIDE - RAILWAY + HOSTINGER
# ============================================

## 🚀 DEPLOY TO RAILWAY (Backend + Database)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

### Step 2: Create Railway Project
1. Go to https://railway.app and sign in
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your wolayo repository
4. Railway will auto-detect Node.js

### Step 3: Add MongoDB Database
1. In your Railway project, click "New" → "Database"
2. Select "MongoDB"
3. Wait for it to provision

### Step 4: Configure Environment Variables
1. Go to "Variables" tab in Railway
2. Add these variables (get values from your .env or generate new secure ones):

```
MONGODB_URI=<auto-filled from MongoDB plugin>
APP_URL=https://yourdomain.com

# Generate secure random values for production:
# Use: https://1password.com/password-generator/
PAYPAL_CLIENT_ID=<your PayPal Client ID>
PAYPAL_SECRET=<your PayPal Secret>
PAYPAL_MODE=sandbox  # Change to 'live' when ready

ADMIN_USERNAME=<secure admin username>
ADMIN_PASSWORD=<secure admin password>
ADMIN_TOKEN=<generate random 32-char string>

EMAIL_SERVICE=gmail
EMAIL_USER=<your gmail>
EMAIL_APP_PASSWORD=<gmail app password>
JWT_SECRET=<generate random 32-char string>
RESET_TOKEN_EXPIRY=3600
```

### Step 5: Deploy
1. Click "Deploy" on Railway dashboard
2. Wait for build to complete
3. Note your Railway URL (e.g., https://wolayo.up.railway.app)

---

## 🌐 CONNECT HOSTINGER DOMAIN

### Step 1: Configure Railway Custom Domain
1. Go to Railway project → "Settings" → "Domains"
2. Click "Add Domain"
3. Enter: `www.wolayochildrestoration.org`
4. Railway will provide DNS records

### Step 2: Update Hostinger DNS
1. Log into Hostinger → "Domains" → Manage DNS
2. Add these DNS records:

```
Type: CNAME
Name: www
Value: your-railway-app.up.railway.app
TTL: 3600

Type: A
Name: @
Value: 76.76.21.21 (Railway's IP)
TTL: 3600
```

### Step 3: Wait for DNS Propagation
- DNS changes can take 15-60 minutes
- Verify with: https://dnschecker.org

---

## 🔒 SECURITY CHECKLIST

### Before Going Live:
- [ ] Change ADMIN_PASSWORD to something secure
- [ ] Generate new ADMIN_TOKEN (not "wolayo-admin-secret-token-2024")
- [ ] Generate new JWT_SECRET
- [ ] Change PayPal from sandbox to live mode
- [ ] Update APP_URL to your actual domain
- [ ] Remove test credentials from .env

### Generate Secure Tokens:
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📋 ENVIRONMENT VARIABLES REFERENCE

| Variable | Required | Description |
|----------|----------|-------------|
| MONGODB_URI | Yes | MongoDB connection string |
| APP_URL | Yes | Your production URL |
| PAYPAL_CLIENT_ID | Yes (donations) | PayPal API client ID |
| PAYPAL_SECRET | Yes (donations) | PayPal API secret |
| PAYPAL_MODE | Yes | 'sandbox' for testing, 'live' for production. REQUIRED - must be set to either sandbox or live |
| ADMIN_USERNAME | Yes | Admin login username |
| ADMIN_PASSWORD | Yes | Admin login password |
| ADMIN_TOKEN | Yes | Admin API token |
| EMAIL_SERVICE | Yes | Email provider (gmail, etc.) |
| EMAIL_USER | Yes | Email address |
| EMAIL_APP_PASSWORD | Yes | Email app password |
| JWT_SECRET | Yes | JWT signing secret |
| RESET_TOKEN_EXPIRY | No | Token expiry in seconds (default: 3600) |

---

## 🐛 TROUBLESHOOTING

### MongoDB Connection Issues:
- Ensure MONGODB_URI is set correctly in Railway variables
- Check MongoDB plugin is active 

### PayPal Not Working:
- Verify PAYPAL_MODE is set to 'live' for production
- Check PayPal app is approved in PayPal developer dashboard

### Domain Not Loading:
- Wait 15-60 minutes for DNS propagation
- Verify DNS records are correct
- Check Railway shows domain as "Healthy"

### Build Failures:
- Check Railway build logs
- Ensure package.json has correct dependencies
- Verify node version compatibility (use Node 18+)

---

## 📞 SUPPORT

- Railway Docs: https://docs.railway.app
- MongoDB Atlas: https://docs.atlas.mongodb.com
- PayPal Developer: https://developer.paypal.com
