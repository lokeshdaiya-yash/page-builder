# Custom Page Builder System

A beautiful, production-ready page builder system built with React, TypeScript, and Tailwind CSS, featuring drag-and-drop functionality and Strapi CMS integration.

## Features

### 🎨 Visual Page Builder
- **Drag & Drop Interface**: Intuitive drag-and-drop functionality using react-beautiful-dnd
- **Live Preview**: Real-time preview with edit/preview mode switching
- **Block Library**: Comprehensive library of pre-built components
- **Visual Feedback**: Smooth animations and hover states during drag operations

### 🧱 Block Components
- **Hero Section**: Eye-catching hero banners with call-to-action buttons
- **Text Block**: Rich text content with customizable typography
- **Image Block**: Responsive images with captions and alt text
- **Card Grid**: Flexible grid layouts for features, services, or products
- **Call-to-Action**: Conversion-focused sections with gradient backgrounds

### ⚙️ Content Management
- **Property Panel**: Real-time editing of block content and styling
- **Block Reordering**: Drag blocks to reorder page layout
- **Block Duplication**: Quickly duplicate existing blocks
- **Responsive Design**: Mobile-first approach with breakpoint optimization

### 🔗 Strapi Integration
- **CMS Integration**: Full integration with Strapi headless CMS
- **Page Management**: Create, update, delete, and publish pages
- **Draft/Published States**: Manage content lifecycle with draft and published states
- **API Integration**: RESTful API communication with error handling

### 💾 Data Management
- **Auto-save**: Automatic saving of changes to Strapi
- **Export/Import**: JSON export and import functionality
- **Version Control**: Track creation and update timestamps
- **Error Handling**: Comprehensive error handling and user feedback

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Strapi CMS instance (local or remote)

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Strapi connection**:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Strapi configuration:
   ```env
   VITE_STRAPI_URL=http://localhost:1337
   VITE_STRAPI_API_TOKEN=your_strapi_api_token_here
   ```

3. **Set up Strapi Content Type**:
   Create a "Page" content type in Strapi with the following fields:
   ```json
   {
     "title": "Text (required)",
     "slug": "Text (unique)",
     "blocks": "JSON",
     "status": "Enumeration (draft, published)"
   }
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Usage

### Building Pages
1. **Add Blocks**: Drag blocks from the library to the canvas
2. **Customize Content**: Click on blocks to edit their properties
3. **Reorder Blocks**: Drag blocks within the canvas to reorder
4. **Preview**: Switch to preview mode to see the final result

### Managing Pages
1. **Save**: Save your page to Strapi (creates new or updates existing)
2. **Publish**: Publish your page to make it live
3. **Page Manager**: Access all your pages through the page manager
4. **Export/Import**: Export pages as JSON or import existing configurations

### Strapi Integration
The system automatically:
- Creates new pages in Strapi when saving for the first time
- Updates existing pages when making changes
- Manages draft/published states
- Handles API errors gracefully

## Architecture

### Component Structure
```
src/
├── components/
│   ├── blocks/           # Individual block components
│   ├── BlockLibrary.tsx  # Draggable block library
│   ├── PageCanvas.tsx    # Main canvas with drop zones
│   ├── PropertyPanel.tsx # Block property editor
│   ├── Toolbar.tsx       # Main toolbar with actions
│   └── PageManager.tsx   # Page management interface
├── context/
│   └── PageBuilderContext.tsx  # Global state management
├── hooks/
│   └── useStrapiPages.ts       # Strapi API integration
├── services/
│   └── strapiService.ts        # Strapi API service
└── types/
    └── index.ts               # TypeScript definitions
```

### Key Technologies
- **React 18**: Modern React with hooks and context
- **TypeScript**: Full type safety and developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **react-beautiful-dnd**: Smooth drag-and-drop interactions
- **Axios**: HTTP client for API communication
- **Lucide React**: Beautiful, consistent icons

## Customization

### Adding New Block Types
1. Create a new block component in `src/components/blocks/`
2. Add the block definition to `src/components/BlockLibrary.tsx`
3. Update the renderer in `src/components/BlockRenderer.tsx`
4. Add property editing logic in `src/components/PropertyPanel.tsx`

### Styling Customization
- Modify Tailwind configuration in `tailwind.config.js`
- Update component styles using Tailwind utility classes
- Customize animations and transitions in component files

### API Integration
- Modify `src/services/strapiService.ts` for different CMS backends
- Update type definitions in `src/types/index.ts`
- Customize API endpoints and data transformation logic

## Production Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Ensure production environment variables are set:
```env
VITE_STRAPI_URL=https://your-strapi-instance.com
VITE_STRAPI_API_TOKEN=your_production_api_token
```

### Strapi Configuration
- Set up proper authentication and permissions
- Configure CORS for your frontend domain
- Set up SSL certificates for production API

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Test thoroughly with different block combinations
5. Submit a pull request with detailed description

## License

MIT License - feel free to use this project for personal or commercial purposes.