This is a CPPS - Custom Production Proposal System.

## About application

This application was build using

- Typescript
- Next.js 13 with App router (React)
- Shadcn/ui
- Prisma
- MySQL
- Tailwind
- NextAuth
- UploadThing

## Features

- User Authentication
- Permission based data access
- Admin panel
- CRUD operations, limited by permission and data state
- File upload to private bucket storage
- Dark mode
- Fully responsive design

## Roles

Operator:

- Create / Cancel new order
- Create / Cancel new case
- Create / Cancel new proposal
- Complete Case after received reply

Client:

- Reply to case
- Accept/Reject proposal

Admin:

- Create Companies and proposal options
- Edit user data and permissions

## Flows examples

O - Operator
C - Client

Create Order ->

1. (O)Create case -> (O)Add attachments -> (C)Reply to case -> (O)Complete case
2. (O)Create case -> (O)Cancel Case
3. (O)Create Proposal -> (C)Reject Proposal (With comment - required)
4. (O)Create Proposal -> (C)Accept Proposal
