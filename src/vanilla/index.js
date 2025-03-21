
// Vanilla JavaScript entry point for the application
import Router from './router.js';
import NotFound from '../pages/NotFound.tsx';

// Import other page handlers as we convert them

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  
  // Define routes
  const routes = [
    {
      path: '/not-found',
      handler: () => {
        NotFound();
      }
    },
    // We'll add more routes as we convert other pages
    {
      path: '*',
      handler: () => {
        NotFound();
      }
    }
  ];
  
  // Initialize router
  const router = new Router(routes);
  router.init();
  
  // For demonstration, add a basic header
  const createHeader = () => {
    const header = document.createElement('header');
    header.className = 'py-4 bg-black text-white';
    
    const container = document.createElement('div');
    container.className = 'container mx-auto px-4';
    
    const title = document.createElement('h1');
    title.className = 'text-2xl font-bold';
    title.textContent = 'CARTI CATALOG';
    
    container.appendChild(title);
    header.appendChild(container);
    
    return header;
  };
  
  // Add header to the page
  const headerElement = createHeader();
  rootElement.prepend(headerElement);
});
