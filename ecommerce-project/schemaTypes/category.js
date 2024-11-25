export default {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
       
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'description',
            title: 'description',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{type: "image"}],
            options: {
                hotspot: true
            }
        },
    ],
  };