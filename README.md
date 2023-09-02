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

## Background

You are working in a medical company that produces a custom, very personalized items for customers that only **they** can wear it.
Your company is a global-wise provider of such products, and has customers all over the world.
Those items has to fit them ideally. Otherwise wearing them will be unpleasant or could even cause pain.
Also, end users needs them to function properly, and lastly, the cost of the product is significant.

Let's say your company makes _hearing aids_.

In general, end user will want to have as discreet devices as it is possible, but due to ear structure, that's not always possible.
In those cases your company sends a proposal to the customer, with a list of changes to the original order, that are necessary for us to be able to manufacture the device.

Such proposal previously would have to be completed by the production area, then passed to the customer service, and then, it was send to the customer.
But now, thanks to the CPPS, a production area creates a proposal directly in CPPS, and the customer can see it and respond to it right away, without the need to communicate with the customer service.

## Product description

1. We produce hearing aids - sound amplifier for improved hearing in individuals with impairment.
2. Device needs to fit ideally, otherwise will cause pain and will be very, very hard to use
3. Each device is unique for each enduser and for each ear
4. Every device has it's own unique ID
5. Product is highly dependend on the customers ear structure
6. Enduser needs them to function properly, and the cost is high (high priority for turnaround time)
