import * as express from "express";
import { config } from "./config";
import * as cors from "cors";
import { employeesRouter } from "./routes/employees.router";

const app = express();

app.use(cors());
app.use("/employees", employeesRouter);

app.listen(config.port, () => console.log(`✅ Server is running on port ${config.port}`));
