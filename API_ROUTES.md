# Jurify Comprehensive API Routes Architecture

This document outlines the complete RESTful backend architecture for Jurify, covering roughly 103 routes required for a production-ready application.

---

## 1. Authentication (Managed via Better Auth)
| Method | Route                | Purpose                                      |
|--------|----------------------|----------------------------------------------|
| POST   | `/api/auth/sign-up`  | Register new user account (Triggers OTP email)|
| POST   | `/api/auth/verify-email`| Verify OTP code to complete registration     |
| POST   | `/api/auth/sign-in`  | Login user and set secure HttpOnly cookies   |
| POST   | `/api/auth/sign-out` | Logout user and clear session cookies        |
| GET    | `/api/auth/session`  | Get current user session data                |
| POST   | `/api/auth/forgot-password` | Request password reset link           |
| POST   | `/api/auth/reset-password`  | Submit new password using reset token |

---

## 2. Profile Management & Security

### Current User Settings
| Method | Route                          | Purpose                                  |
|--------|--------------------------------|------------------------------------------|
| GET    | `/api/profile`                 | Get current user's full profile          |
| PATCH  | `/api/profile`                 | Update personal details / bio            |
| DELETE | `/api/profile`                 | Deactivate/delete account                |
| POST   | `/api/profile/avatar`          | Upload/replace profile photo             |
| DELETE | `/api/profile/avatar`          | Remove profile photo                     |
| POST   | `/api/profile/video`           | Upload video introduction (Lawyers only) |
| DELETE | `/api/profile/video`           | Remove video introduction                |
| GET    | `/api/profile/preferences`     | Get display and system preferences       |
| PATCH  | `/api/profile/preferences`     | Update system preferences                |

### Security & Sessions
| Method | Route                          | Purpose                                  |
|--------|--------------------------------|------------------------------------------|
| PATCH  | `/api/profile/password`        | Change password (requires current pass)  |
| GET    | `/api/profile/sessions`        | List active device sessions              |
| DELETE | `/api/profile/sessions/[id]`   | Revoke a specific active session         |
| DELETE | `/api/profile/sessions`        | Revoke all sessions except current       |
| GET    | `/api/profile/login-history`   | View recent login attempts (IP/device)   |
| POST   | `/api/profile/2fa/enable`      | Set up 2FA (Returns QR & backup codes)   |
| POST   | `/api/profile/2fa/verify`      | Verify OTP code to finalize 2FA setup    |
| POST   | `/api/profile/2fa/disable`     | Disable 2FA                              |
| GET    | `/api/profile/2fa/backup-codes`| Regenerate backup recovery codes         |

### Lawyer Discovery
| Method | Route                       | Purpose                                     |
|--------|-----------------------------|---------------------------------------------|
| GET    | `/api/lawyers`              | Browse/filter verified lawyers (Paginated)  |
| GET    | `/api/lawyers/[id]`         | View a specific lawyer's public profile     |
| GET    | `/api/lawyers/[id]/reviews` | Get paginated reviews for a lawyer          |
| POST   | `/api/lawyers/[id]/reviews` | Post a new review                           |
| PATCH  | `/api/lawyers/[id]/reviews/[reviewId]` | Edit your own review                 |
| DELETE | `/api/lawyers/[id]/reviews/[reviewId]` | Delete your own review               |

---

## 3. KYC Verification

### Lawyer Portal
| Method | Route                     | Purpose                                     |
|--------|---------------------------|---------------------------------------------|
| POST   | `/api/kyc`                | Submit final KYC application                |
| PATCH  | `/api/kyc`                | Update drafted KYC before submission        |
| GET    | `/api/kyc/status`         | Get user's current KYC progress             |
| GET    | `/api/kyc/track`          | Public status lookup by Reference Number    |
| GET    | `/api/kyc/documents`      | List uploaded documents                     |
| DELETE | `/api/kyc/documents/[id]` | Remove a document from an unsubmitted draft |

### Admin Verification Portal
| Method | Route                     | Purpose                                     |
|--------|---------------------------|---------------------------------------------|
| GET    | `/api/admin/kyc`          | List all KYC requests (pending/approved)    |
| GET    | `/api/admin/kyc/[id]`     | View specific application details & docs    |
| PATCH  | `/api/admin/kyc/[id]`     | Approve, reject, or request changes         |

---

## 4. Case Management

### Open Marketplace
| Method | Route                | Purpose                                          |
|--------|----------------------|--------------------------------------------------|
| GET    | `/api/cases`         | Browse public cases (supports search/filters)    |
| POST   | `/api/cases`         | Create a new case (Clients)                      |
| GET    | `/api/cases/[id]`    | View details of a specific case                  |
| PATCH  | `/api/cases/[id]`    | Edit case details (if no active lawyer assigned) |
| DELETE | `/api/cases/[id]`    | Delete or withdraw a case                        |

### Case Sub-Resources
| Method | Route                                  | Purpose                              |
|--------|----------------------------------------|--------------------------------------|
| POST   | `/api/cases/[id]/apply`                | Lawyer applies to represent the case |
| GET    | `/api/cases/[id]/applications`         | Client views all applicants          |
| POST   | `/api/cases/[id]/applications/[appId]/accept` | Client accepts lawyer         |
| POST   | `/api/cases/[id]/applications/[appId]/reject` | Client rejects lawyer         |
| GET    | `/api/cases/[id]/documents`            | List securely attached case files    |
| POST   | `/api/cases/[id]/documents`            | Upload a document directly to a case |
| DELETE | `/api/cases/[id]/documents/[docId]`    | Remove a case document               |

### User Collections
| Method | Route                  | Purpose                                        |
|--------|------------------------|------------------------------------------------|
| GET    | `/api/cases/my`        | List all cases posted by current client        |
| GET    | `/api/cases/my/applications` | List all applications sent by current lawyer |
| GET    | `/api/saved-cases`     | Get bookmarked cases                           |
| POST   | `/api/cases/[id]/save` | Bookmark a case                                |
| DELETE | `/api/cases/[id]/save` | Remove bookmark                                |

---

## 5. Networking & Connections
| Method | Route                          | Purpose                                  |
|--------|--------------------------------|------------------------------------------|
| GET    | `/api/connections`             | List user's active connections/requests  |
| POST   | `/api/connections`             | Send a new connection request            |
| POST   | `/api/connections/[id]/accept` | Accept a pending request                 |
| POST   | `/api/connections/[id]/reject` | Decline a pending request                |
| DELETE | `/api/connections/[id]`        | Remove an active connection              |

---

## 6. Real-Time Messaging
| Method | Route                                    | Purpose                              |
|--------|------------------------------------------|--------------------------------------|
| GET    | `/api/conversations`                     | List all active chatrooms            |
| GET    | `/api/conversations/unread-count`        | Get total global unread messages     |
| POST   | `/api/conversations`                     | Initialize a new chatroom            |
| GET    | `/api/conversations/[id]`                | Get chat metadata & participants     |
| GET    | `/api/conversations/[id]/messages`       | Get paginated message history        |
| POST   | `/api/conversations/[id]/messages`       | Send a text message                  |
| POST   | `/api/conversations/[id]/messages/upload`| Share a file attachment in chat      |

---

## 7. AI Legal Assistant (RAG System)

### Document Management
| Method | Route                    | Purpose                                      |
|--------|--------------------------|----------------------------------------------|
| GET    | `/api/ai/documents`      | List documents indexed for user's AI context |
| POST   | `/api/ai/documents`      | Upload and vectorize a new legal document    |
| DELETE | `/api/ai/documents/[id]` | Remove document from AI vector database      |

### Chat & Sessions
| Method | Route                              | Purpose                                  |
|--------|------------------------------------|------------------------------------------|
| GET    | `/api/ai/sessions`                 | List historical chat sessions            |
| POST   | `/api/ai/sessions`                 | Create a new, blank chat session         |
| GET    | `/api/ai/sessions/[id]`            | Get history of a specific session        |
| DELETE | `/api/ai/sessions/[id]`            | Delete a chat session                    |
| POST   | `/api/ai/sessions/[id]/messages`   | **STREAMING:** Send prompt & stream reply|

---

## 8. Blogs & Insights

### Core Posts
| Method | Route                | Purpose                                      |
|--------|----------------------|----------------------------------------------|
| GET    | `/api/insights`      | Browse public blogs (Paginated/Filtered)     |
| GET    | `/api/insights/my`   | List posts authored by current user          |
| POST   | `/api/insights`      | Publish or draft a new article               |
| GET    | `/api/insights/[id]` | View a specific article content              |
| PATCH  | `/api/insights/[id]` | Edit an existing article                     |
| DELETE | `/api/insights/[id]` | Delete an article                            |

### Engagements
| Method | Route                                        | Purpose                          |
|--------|----------------------------------------------|----------------------------------|
| POST   | `/api/insights/[id]/like`                    | Like a post                      |
| DELETE | `/api/insights/[id]/like`                    | Unlike a post                    |
| POST   | `/api/insights/[id]/save`                    | Bookmark a post                  |
| DELETE | `/api/insights/[id]/save`                    | Remove bookmark                  |
| GET    | `/api/insights/[id]/comments`                | List comments on a post          |
| POST   | `/api/insights/[id]/comments`                | Add a top-level comment          |
| PATCH  | `/api/insights/[id]/comments/[commentId]`    | Edit own comment                 |
| DELETE | `/api/insights/[id]/comments/[commentId]`    | Delete own comment               |
| POST   | `/api/insights/[id]/comments/[commentId]/like` | Like a comment                 |
| DELETE | `/api/insights/[id]/comments/[commentId]/like` | Unlike a comment               |
| POST   | `/api/insights/[id]/comments/[commentId]/replies` | Reply to a comment          |

---

## 9. Global Utilities

### Notifications
| Method | Route                               | Purpose                               |
|--------|-------------------------------------|---------------------------------------|
| GET    | `/api/notifications`                | Get paginated user notifications      |
| PATCH  | `/api/notifications/[id]/read`      | Mark a single notification as read    |
| PATCH  | `/api/notifications/read-all`       | Mark all notifications as read        |
| DELETE | `/api/notifications/[id]`           | Delete a single notification          |
| DELETE | `/api/notifications`                | Clear all notifications               |
| GET    | `/api/notifications/preferences`    | Get notification settings (email/sms) |
| PATCH  | `/api/notifications/preferences`    | Update notification settings          |

### Search & Storage
| Method | Route                     | Purpose                                       |
|--------|---------------------------|-----------------------------------------------|
| GET    | `/api/search`             | Unified global search (q=term&type=all)       |
| POST   | `/api/upload/presign`     | Generate AWS S3/R2 direct upload URL          |
| POST   | `/api/webhooks/payments`  | Listen for Stripe/Razorpay events             |

---

## 10. Super Admin Dashboard (Restricted Routes)

### Analytics & System
| Method | Route                   | Purpose                                       |
|--------|-------------------------|-----------------------------------------------|
| GET    | `/api/admin/stats`      | System-wide metrics (users, cases, growth)    |
| GET    | `/api/admin/audit-logs` | View internal system actions/security logs    |
| GET    | `/api/admin/settings`   | Get global platform configuration             |
| PATCH  | `/api/admin/settings`   | Update global platform configuration          |

### Content Moderation
| Method | Route                     | Purpose                                       |
|--------|---------------------------|-----------------------------------------------|
| GET    | `/api/admin/users`        | Paginated list of all platform users          |
| GET    | `/api/admin/users/[id]`   | View full user audit profile                  |
| PATCH  | `/api/admin/users/[id]`   | Suspend, ban, or reactivate user              |
| DELETE | `/api/admin/users/[id]`   | Permanently purge user and their data         |
| GET    | `/api/admin/cases`        | List all cases for moderation                 |
| PATCH  | `/api/admin/cases/[id]`   | Flag, hide, or remove a malicious case        |
| GET    | `/api/admin/insights`     | List all blogs for moderation                 |
| PATCH  | `/api/admin/insights/[id]`| Approve, feature, or remove a blog post       |
| GET    | `/api/admin/reports`      | View user-submitted moderation reports        |
| PATCH  | `/api/admin/reports/[id]` | Mark a report as resolved                     |
