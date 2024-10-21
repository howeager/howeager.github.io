---
layout: post
title: "Building a SFTP Server"
date: 2024-10-20
---

You wanna set up your own personal sftp server. 
Wow pretty cool
what type of files are you trying to transfer????


### Step 1: Download & Install WSL (Windows Subsystem for Linux)

1. **Enable WSL**  
   - Open **PowerShell** as an administrator (Right-click on Start and choose "Windows PowerShell (Admin)").
   - Run the following command to enable WSL:  
     ```bash
     wsl --install
     ```

2. **Download Ubuntu from the Microsoft Store**
   - Open the **Microsoft Store** and search for "Ubuntu" (or a Debian-based distribution of your choice).
   - Click **Get** or **Install** to download and install the distribution.

3. **Set Up Ubuntu**  
   - Once installed, open the distribution from the Start menu.  
   - Create your user account for the Linux environment by following the setup prompts.

### Step 2: Update Ubuntu

1. After WSL is running, update your Ubuntu system:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

### Step 3: Install OpenSSH Server

1. Install the OpenSSH server to enable SFTP:
   ```bash
   sudo apt install openssh-server
   ```

2. Check if the SSH service is running:
   ```bash
   sudo systemctl status ssh
   ```

3. If it’s not running, start the service:
   ```bash
   sudo systemctl start ssh
   ```

4. To ensure SSH starts on boot, enable it with:
   ```bash
   sudo systemctl enable ssh
   ```

### Step 4: Configure Firewall (optional but recommended)

1. Install `ufw` (Uncomplicated Firewall):
   ```bash
   sudo apt install ufw
   ```

2. Allow OpenSSH through the firewall:
   ```bash
   sudo ufw allow OpenSSH
   ```

3. Enable the firewall:
   ```bash
   sudo ufw enable
   ```

4. Check the firewall status to confirm OpenSSH is allowed:
   ```bash
   sudo ufw status
   ```

### Step 5: Connect to Your SFTP Server

1. On a different machine or from the same Windows host, use an SFTP client (such as FileZilla, WinSCP, or command line) to connect to your SFTP server.
   
   Example using command line:
   ```bash
   sftp <your-username>@<your-Windows-IP-address>
   ```

2. Enter your password when prompted.

---

You now have an SFTP server running on WSL with OpenSSH!
