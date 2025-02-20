export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
      {
          name: 'image',
          title: 'Image',
          type: 'array',
          of: [{type: "image"}],
          options: {
              hotspot: true
          }
      },
      {
          name: "name",
          title: 'Name',
          type: 'string'
      },
      {
          name: "position",
          title: 'Position',
          type: 'number'
      },
      {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
              source: 'name',
              maxLength: 90,
          }
      },
      {
          name: 'price',
          title: 'Price',
          type: 'number',
      },
      {
          name: "details",
          title: 'Details',
          type: 'string'
      },
      {
          name: "methodology",
          title: 'Methodology',
          type: 'string'
      },
      {
          name: "summary",
          title: 'Summary',
          type: 'string'
      },
      {
          name: "objective",
          title: 'Objective',
          type: 'string'
      },
      {
          name: "location",
          title: 'Location',
          type: 'string'
      },
      {
          name: "view",
          title: 'View',
          type: 'string'
      },
      {
          name: "summary2",
          title: 'Summary2',
          type: 'string'
      },
      {
          name: "available",
          title: 'Available',
          type: 'string'
      },
      {
          name: 'pdfFile',
          title: 'PDF File',
          type: 'file', // Use 'file' type for PDF files
          accept: '.pdf', // Specify the file format
      },
      {
        name: "categories",
        title: "Product Categories",
        type: "array", // Change type to array
        of: [
            {
                type: "reference",
                to: [{ type: "category" }]
            }
        ]
    }
  ]
}
