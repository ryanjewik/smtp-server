Personal SMTP Server
A self-hosted SMTP server that enables secure and private email sending for multiple applications, such as portfolio contact forms, password resets, and email confirmations.

Live Demo: ryanhideosmtp.com
Repository: GitHub

📖 About
Across my applications, I needed a reliable way to send emails for different purposes — from handling contact form submissions on my portfolio site to sending password reset and email confirmation links for other projects like Poketask.
Instead of relying on third-party services, I built my own SMTP server to have full control over security, monitoring, and privacy.

🚀 Features
Let's Encrypt TLS – Encrypted connections for secure mail transfer

OpenDKIM – Email signing to prevent spoofing and improve deliverability

Postfix MTA – Robust, production-ready mail transfer agent

CloudWatch – Real-time email monitoring and analytics

React Frontend Pages – Password reset and email verification routes for integrated apps

🛠 Tech Stack
Frontend: React, TypeScript, Tailwind CSS, HTML

Backend/Server: Linux (Ubuntu), Postfix, OpenDKIM

Security: TLS via Let's Encrypt, DNS SPF/DKIM/DMARC

Hosting: AWS EC2

Database & Auth: Supabase

⚡ Challenges & Solutions
Challenge
Securely managing email communications while handling multiple services (contact form, password resets, email confirmations) — all without sacrificing deliverability or privacy.

Solution
Implemented robust security measures:

TLS encryption via Let's Encrypt CA

DKIM signing with OpenDKIM

Proper DNS configuration for SPF, DKIM, and DMARC

CloudWatch for operational visibility and troubleshooting

📷 Screenshots




📦 Installation & Setup
bash
Copy
Edit
# Clone the repository
git clone https://github.com/ryanjewik/smtp-server.git
cd smtp-server

# (Server setup is tailored for Ubuntu on AWS EC2)
# Install dependencies and configure Postfix, OpenDKIM, and TLS
For a detailed step-by-step setup, see the Wiki (if applicable).

📜 License
This project is licensed under the MIT License. See the LICENSE file for details.
