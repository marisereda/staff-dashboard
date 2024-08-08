# Staff-dashboard

# Description

The Staff Dashboard — an essential tool designed specifically for the HR department of a trade company. This application addresses critical HR functions, ensuring efficient management of employee-related processes. Here are the key features:

- Employee Lifecycle Management:

  The Staff Dashboard facilitates obtaining data on the employee's current place of work, employee transfer between different subdivisions, and employee dismissal.

- Data Integration across Departments:

  The app harmonizes information from databases of four distinct departments.
  By consolidating data, it provides a holistic view of the organization’s workforce.

## Technology stack

- TypeScript
- React
- React Query
- MUI
- Express
- Prisma ORM
- SQLite

## Make production build

1. Run build command

```bash
npm run build
```

2. Copy folder "dist": "staffDashboard/dist"

3. Create .env file in the folder "dist" and specify the path to the database file, for instance:

```env
SERVER_PORT = "3000"
DATABASE_URL = "file:D:/dist/dev.db"
```

4.Create file in the folder "dist": run.cmd with content:

```cmd
node server/index.js
```
