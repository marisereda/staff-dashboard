import { Note, Prisma } from '@prisma/client';
import { prisma } from '~/lib/services/prisma.service';
import { PageData } from '~/types';
import { CreateNoteBody, NotesQuery, UpdateNote } from './notes.schema';

export const getAll = async ({
  q,
  ownerId,
  sortBy,
  sortOrder,
  page,
  pageSize,
}: NotesQuery): Promise<PageData<Note[]>> => {
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
  // if (isDone !== undefined) where.isDone = isDone;
  // if (isImportant) where.isImportant = isImportant;
  if (ownerId) where.ownerId = ownerId;

  const data = await prisma.note.findMany({ where, orderBy, skip, take });
  const total = await prisma.note.count({ where });

  return { data, page, pageSize, total };
};

export const getById = async (id: string): Promise<Note> => {
  const note = await prisma.note.findUniqueOrThrow({ where: { id } });
  return note;
};

export const create = async ({
  // ownerId,
  // ownerType,
  title,
  content,
  isDone,
  isImportant,
}: CreateNoteBody): Promise<Note | null> => {
  const note = await prisma.note.create({
    data: {
      title,
      content: content ?? null,
      isDone,
      isImportant,
    },
  });
  return note;
};

export const update = async ({ params, body }: UpdateNote): Promise<Note | null> => {
  if (!body) {
    return getById(params.id);
  }
  const note = await prisma.note.update({
    where: { id: params.id },
    data: {
      title: body.title,
      content: body.content ?? null,
      isDone: body.isDone,
      isImportant: body.isImportant,
    },
  });
  return note;
};

export const deleteOne = async (id: string): Promise<Note | null> => {
  const note = await prisma.note.delete({
    where: { id },
  });
  return note;
};
