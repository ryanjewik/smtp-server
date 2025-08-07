# smtp-server
| Step | Task                                                                    | Status                                 |
| ---- | ----------------------------------------------------------------------- | -------------------------------------- |
| 1    | Reserved Elastic IP (52.40.35.65) and associated with EC2               | ✅ Done                                 |
| 2    | Drafted AWS port 25 unblock request with PTR (→ mail.ryanhideosmtp.com) | ✅ Done (your screenshot looks perfect) |
| 3    | Purchased domain: ryanhideosmtp.com                                     | ✅ Done                                 |
| 4    | Created DNS A record for `mail.ryanhideosmtp.com` → 52.40.35.65         | ✅ Done                                 |
| 5    | Added SPF TXT record for domain                                         | ✅ Done                                 |
| 6    | Added DMARC record                                                      | ✅ Done                                 |
| 7    | Not yet generated DKIM key or TXT record                                | 🔜 Pending                              |
