## Project Structure

- `src/` - Source code for the Protection Portal.
- `public/` - Public assets such as images and styles.

### Pages in App Router

- `app/` - Next.js pages for different routes.
- `app/api` - Routes with GET, POST actions.
- `app/api/admin` - Admin dashboard to view the policies created and refund any policy in special cases.
- `app/api/payment-success` - Page viewed on successful payment.
- `app/api/payment-failure` - Page viewed on failure of payment.
- `app/api/quotes/new` - Quote Form for creating a new quote.
- `app/api/quotes/[id]/payment` - Page for processing the payment for the created quote.
- `action.ts` (files) - Handles database actions performed.

### Database

Database is handled using Drizzle ORM.

- `db/` - Contains all the database files, including migrations, schemas, config, and dbClient.

### Others

- `lib/convertToSubcurrency` - Helper function used to convert to cents.
- `lib/logger` - Pino logger used to show server component logs (for database transactions success or failure).

## Features

- **Create Quote**: Users can create and view quotes.
- **Payment Flow**: Users can proceed with the payment for the quote.
- **Admin Panel**: Admins can view policies and process refunds.


## Launching the Project

To launch this project, you need to install:

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/) to launch the Postgres database.
- Node 20 (you can install it through [nvm](https://github.com/nvm-sh/nvm)).

Once these dependencies are installed, you can set up and launch the project:

```sh
# Install dependencies and load the database fixtures
make init

# Launch the project
make start

# Launch the tests
make test
make test-watch
```
