import { Router } from 'express';
import multer from 'multer';
import { handler, validator } from '~/common/middlewares';
import * as updateController from './update.controller';
import { UpdateBuhSchema, UpdateFopSchema, UpdateHrSchema } from './validation';

export const upload = multer();
export const updateRouter = Router();

updateRouter.post(
  '/buh',
  upload.single('file'),
  validator(UpdateBuhSchema),
  handler(updateController.updateBuh)
);

updateRouter.post(
  '/hr',
  upload.single('file'),
  validator(UpdateHrSchema),
  handler(updateController.updateHr)
);

updateRouter.post(
  '/fop',
  upload.single('file'),
  validator(UpdateFopSchema),
  handler(updateController.updateFop)
);

// updateRouter.get('/test', async (req, res) => {
//   const unemployedEmployees = await prisma.employee.findMany({
//     where: { workplacesBuh: { none: {} }, workplacesHr: { none: {} } },
//     include: {
//       workplacesBuh: true,
//       workplacesHr: true,
//     },
//   });
//   const idsUnemployed = unemployedEmployees.map(unemployedEmployee => unemployedEmployee.id);
//   const unemployedForDeleting = await prisma.employee.updateMany({
//     where: { id: { in: idsUnemployed } },
//     data: { updateStatusHr: UpdateStatus.DELETE },
//   });
//   console.log('🚧 unemployedEmployees:', unemployedEmployees);
//   res.status(204).end();
// });
