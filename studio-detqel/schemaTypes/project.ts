import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Information' },
    { name: 'details', title: 'Project Details' },
    { name: 'images', title: 'Images' },
    { name: 'caseStudy', title: 'Case Study' },
    { name: 'results', title: 'Results' },
    { name: 'publishing', title: 'Publishing' },
  ],
  fields: [
    // --- BASIC INFORMATION ---
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Brand Strategy & E-Commerce, Visual Identity & WebGL, etc.',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief tag line shown on cards and previews.',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'description',
      title: 'Full Overview Description',
      type: 'text',
      rows: 4,
      description: 'General description of the project.',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),

    // --- PROJECT DETAILS ---
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'details',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. 3 Months, 2 Sprints',
      group: 'details',
    }),
    defineField({
      name: 'services',
      title: 'Services / Deliverables',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags representing services provided (e.g. Brand Identity, WebGL, Next.js).',
      group: 'details',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Your role in this project (e.g. Principal UI Architect).',
      group: 'details',
    }),
    defineField({
      name: 'mockupType',
      title: 'Interactive Mockup UI Type',
      type: 'string',
      options: {
        list: [
          { title: 'Custom Image Mockup', value: 'custom-image' },
          { title: 'Interactive Analytics Chart', value: 'analytics' },
          { title: 'Interactive AI Studio Node Graph', value: 'ai-studio' },
          { title: 'Interactive 3D Three.js Canvas', value: '3d-canvas' },
          { title: 'Interactive Financial Ledger', value: 'financial' }
        ]
      },
      description: 'Decides which custom interactive mockup is loaded inside the case study hero.',
      group: 'details',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url',
      group: 'details',
    }),
    defineField({
      name: 'githubUrl',
      title: 'Source Code / Github URL',
      type: 'url',
      group: 'details',
    }),

    // --- IMAGES ---
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      group: 'images',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Showcase Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      group: 'images',
    }),

    // --- CASE STUDY ---
    defineField({
      name: 'challenge',
      title: 'The Challenge Description',
      type: 'text',
      rows: 4,
      group: 'caseStudy',
    }),
    defineField({
      name: 'solution',
      title: 'Our Solution Description',
      type: 'text',
      rows: 4,
      group: 'caseStudy',
    }),
    defineField({
      name: 'sections',
      title: 'Case Study Detailed Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'caseSection',
          title: 'Case Study Section',
          fields: [
            defineField({
              name: 'sectionTitle',
              title: 'Section Title',
              type: 'string',
              description: 'e.g. Brand Identity, Packaging Design, Motion Graphics',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Section Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'images',
              title: 'Section Images',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }],
            }),
          ]
        }
      ],
      group: 'caseStudy',
    }),

    // --- RESULTS ---
    defineField({
      name: 'results',
      title: 'Project Metrics / Results',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'metric',
          title: 'Metric',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g. +410%, 2.5x, 99.99%',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Metric Label',
              type: 'string',
              description: 'e.g. Direct Sales Growth, Brand Awareness increase',
              validation: (Rule) => Rule.required(),
            }),
          ]
        }
      ],
      group: 'results',
    }),

    // --- PUBLISHING ---
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
      group: 'publishing',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
      description: 'Used to sort the projects index (lower numbers appear first).',
      group: 'publishing',
    }),
    defineField({
      name: 'accentColor',
      title: 'Brutalist Accent Color (Hex)',
      type: 'string',
      description: 'Used for hover highlights, focus borders, etc. (e.g. #7939a1)',
      group: 'publishing',
    }),
    defineField({
      name: 'badgeText',
      title: 'Award / Badge Title',
      type: 'string',
      description: 'Award description (e.g. AWWWARDS SITE OF THE DAY)',
      group: 'publishing',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'coverImage',
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category,
        media,
      };
    },
  },
});
