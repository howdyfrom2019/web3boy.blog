import {defineField, defineType} from 'sanity'

export const user = defineType({
  name: 'user',
  type: 'document',
  title: 'User',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      description: 'OAuth에 발급된 ethereum 지갑 주소',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'authProvider',
      type: 'string',
      title: 'AuthProvider',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
