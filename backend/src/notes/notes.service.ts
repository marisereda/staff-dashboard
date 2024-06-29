import { Note, Prisma } from '@prisma/client';
import * as R from 'ramda';
import { prisma } from '~/common/services/prisma.service';
import { NonNullableKeys, PageData } from '~/common/types';
import { CreateNoteData, GetNotesQuery, UpdateNoteData } from './types';

class NotesService {
  getAll = async ({
    q,
    ownerId,
    isDone,
    isImportant,
    sortBy,
    sortOrder,
    page,
    pageSize,
  }: GetNotesQuery): Promise<PageData<Note[]>> => {
    const where: Prisma.NoteWhereInput = {};
    const orderBy = { [sortBy]: sortOrder };
    const skip = pageSize * (page - 1);
    const take = pageSize;

    if (q) {
      const conditions = ['title', 'content'].map(item => ({
        [item]: { contains: q },
      }));
      where.OR = conditions;
    }
    if (isDone !== undefined) {
      where.isDone = isDone;
    }
    if (isImportant) {
      where.isImportant = isImportant;
    }
    if (ownerId) {
      where.ownerId = ownerId;
    }

    const [data, total] = await prisma.$transaction([
      prisma.note.findMany({ where, orderBy, skip, take }),
      prisma.note.count({ where }),
    ]);

    return { data, page, pageSize, total };
  };

  getById = (id: string): Promise<Note> => {
    return prisma.note.findUniqueOrThrow({ where: { id } });
  };

  create = async ({
    ownerType: _,
    ownerId,
    content,
    ...data
  }: CreateNoteData): Promise<Note | null> => {
    const note = await prisma.note.create({
      data: {
        ownerId: ownerId,
        content: content ?? null,
        ...data,
      },
    });
    return note;
  };

  update = (id: string, updateNoteData: UpdateNoteData): Promise<Note | null> => {
    const data = R.reject(v => v === undefined, updateNoteData) as NonNullableKeys<UpdateNoteData>;
    return prisma.note.update({ where: { id }, data });
  };

  deleteOne = (id: string): Promise<Note | null> => {
    return prisma.note.delete({ where: { id } });
  };
}

export const notesService = new NotesService();
