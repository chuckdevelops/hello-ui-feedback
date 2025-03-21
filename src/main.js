
// New vanilla JavaScript main entry point
import './styles/carti.css';
import './App.css';
import Router from './vanilla/router.js';
import Footer from './vanilla/components/Footer.js';
import NotFound from './pages/NotFound.tsx';

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;
  
  // Clear any existing content
  rootElement.innerHTML = '';
  
  // Add app container
  const appContainer = document.createElement('div');
  appContainer.className = 'bg-black min-h-screen';
  
  // Add content container
  const contentContainer = document.createElement('div');
  contentContainer.className = 'pt-16'; // Padding for fixed header
  contentContainer.id = 'content';
  
  // Define routes
  const routes = [
    {
      path: '/not-found',
      handler: () => {
        const content = document.getElementById('content');
        if (content) {
          content.innerHTML = '';
          NotFound();
        }
      }
    },
    // We'll add more routes as we convert more pages
    {
      path: '*',
      handler: () => {
        const content = document.getElementById('content');
        if (content) {
          content.innerHTML = '';
          NotFound();
        }
      }
    }
  ];
  
  // Add header (placeholder for now)
  const header = document.createElement('header');
  header.className = 'fixed top-0 left-0 right-0 bg-black text-white z-10';
  header.innerHTML = '<div class="container mx-auto px-4 py-4"><h1 class="text-2xl font-bold carti-font">CARTI CATALOG</h1></div>';
  
  // Initialize router
  const router = new Router(routes);
  
  // Add footer
  const footer = Footer();
  
  // Assemble the page
  appContainer.appendChild(header);
  appContainer.appendChild(contentContainer);
  appContainer.appendChild(footer);
  rootElement.appendChild(appContainer);
  
  // Initialize router after DOM is set up
  router.init();
});
