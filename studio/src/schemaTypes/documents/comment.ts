import {defineField, defineType} from 'sanity'

export const comment = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'text',
      title: 'Content',
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'timestamp',
      type: 'datetime',
      title: 'Timestamp',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'edited',
      type: 'boolean',
      title: 'Edited',
      initialValue: false,
    }),
    defineField({
      name: 'replies',
      title: 'Replies',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'comment'}]}],
    }),
  ],
})
