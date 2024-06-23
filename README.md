# staff-dashboard

## make productino build

1. fun build command

```bash
npm run build
```

2. Copy folder "dist": "staffDashboard/dist"

3. Create .env file in the folder "dist" and specify the path to the database file

```env
SERVER_PORT = "3000"
DATABASE_URL = "file:D:/dist/dev.db"
```

4.Create file in the folder "dist": run.cmd with content:

```cmd
node server/index.js
```
