# GitHub Actions Self-Hosted Runner Setup - Orange Pi

## Prerequisites
- Orange Pi with Linux (Armbian/Ubuntu)
- SSH access to Orange Pi
- GitHub repository admin access
- Docker installed on Orange Pi

## Part 1: GitHub Repository Configuration

### Step 1: Navigate to Repository Settings
1. Go to your GitHub repository
2. Click **Settings** tab
3. In the left sidebar, click **Actions** → **Runners**
4. Click the **New self-hosted runner** button

### Step 2: Select Runner Configuration
1. **Operating System**: Linux
2. **Architecture**: ARM64 (for Orange Pi)
3. GitHub will display the setup commands - **keep this page open**

## Part 2: Orange Pi Setup

### Step 1: Connect to Orange Pi via SSH
```bash
ssh user@orange-pi-ip
```

### Step 2: Create Actions Runner Directory
```bash
mkdir -p ~/actions-runner
cd ~/actions-runner
```

### Step 3: Download Runner Package
Copy the download command from GitHub (it will look like this):
```bash
# Example - use the exact command from GitHub Settings page
curl -o actions-runner-linux-arm64-2.XXX.X.tar.gz -L https://github.com/actions/runner/releases/download/vX.XXX.X/actions-runner-linux-arm64-2.XXX.X.tar.gz
```

### Step 4: Extract the Package
```bash
tar xzf ./actions-runner-linux-arm64-*.tar.gz
```

### Step 5: Configure the Runner
Copy the config command from GitHub (it will include your repository token):
```bash
# Example - use the exact command from GitHub Settings page
./config.sh --url https://github.com/YOUR_USERNAME/YOUR_REPO --token YOUR_TOKEN
```

During configuration, you'll be prompted with:
- **Runner name**: Give it a meaningful name (e.g., `orange-pi-runner`)
- **Runner group**: Press Enter for default
- **Labels**: Press Enter for default (or add custom labels)
- **Work folder**: Press Enter for default

### Step 6: Install Runner as a Service (Recommended)
This ensures the runner starts automatically on boot:
```bash
sudo ./svc.sh install
sudo ./svc.sh start
```

### Step 7: Verify Runner Status
```bash
sudo ./svc.sh status
```

**Alternative: Run Manually (Not Recommended for Production)**
```bash
./run.sh
```

## Part 3: Verify Connection

1. Go back to GitHub repository → **Settings** → **Actions** → **Runners**
2. You should see your runner listed with a green "Idle" status
3. If status shows "Offline", check the Orange Pi logs:
   ```bash
   sudo journalctl -u actions.runner.* -f
   ```

## Part 4: Docker Permissions (Important!)

The runner needs Docker access to build and run containers:

```bash
# Add the runner user to docker group
sudo usermod -aG docker $(whoami)

# If runner service is already running, restart it
sudo ./svc.sh stop
sudo ./svc.sh start
```

## Troubleshooting

### Runner Status is Offline
```bash
# Check service status
sudo ./svc.sh status

# Check logs
sudo journalctl -u actions.runner.* -n 50

# Restart service
sudo ./svc.sh restart
```

### Docker Permission Denied
```bash
# Verify user is in docker group
groups

# If not in docker group, add and restart service
sudo usermod -aG docker $(whoami)
sudo ./svc.sh restart
```

### Runner Not Picking Up Jobs
1. Check runner labels match workflow requirements
2. Verify `runs-on: self-hosted` in workflow file
3. Check if another runner is consuming jobs

## Updating the Runner

```bash
cd ~/actions-runner
sudo ./svc.sh stop
./config.sh remove  # Use token from GitHub
# Download new version
# Extract and configure again
sudo ./svc.sh install
sudo ./svc.sh start
```

## Managing Multiple Projects

### Option 1: One Runner, Multiple Repos (Simpler)
- Configure runner at **Organization** level instead of repository level
- All repos in organization can use the same runner
- Go to: Organization Settings → Actions → Runners → New runner

### Option 2: Multiple Runners, Different Projects (Isolated)
- Create separate directories for each project:
  ```bash
  ~/actions-runner-project1
  ~/actions-runner-project2
  ~/actions-runner-project3
  ```
- Configure each runner separately with different names
- Each can run as its own service

## Security Notes

⚠️ **Important Security Considerations:**
- Self-hosted runners execute code from your repository
- Only use on **private repositories** you control
- Never use on public repositories (security risk)
- Keep Orange Pi and runner software updated
- Use strong SSH authentication (keys, not passwords)

## Quick Reference Commands

```bash
# Status
sudo ./svc.sh status

# Start
sudo ./svc.sh start

# Stop
sudo ./svc.sh stop

# Restart
sudo ./svc.sh restart

# View logs
sudo journalctl -u actions.runner.* -f

# Uninstall
sudo ./svc.sh uninstall
```

## Next Steps After Runner Setup

1. ✅ Verify runner shows "Idle" in GitHub
2. ✅ Push code to trigger workflow
3. ✅ Monitor first deployment in Actions tab
4. ✅ Configure Cloudflare for your domain
5. ✅ Test the deployed application

---

**Created**: February 2026  
**Last Updated**: February 2026  
**Environment**: Orange Pi + GitHub Actions + Docker
