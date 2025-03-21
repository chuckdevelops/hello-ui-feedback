
// Vanilla JavaScript version of the NotFound page
const NotFound = () => {
  // Create and append elements to the DOM
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.className = "min-h-screen flex items-center justify-center bg-gray-100";
    
    const contentDiv = document.createElement('div');
    contentDiv.className = "text-center";
    
    const heading = document.createElement('h1');
    heading.className = "text-4xl font-bold mb-4";
    heading.textContent = "404";
    
    const paragraph = document.createElement('p');
    paragraph.className = "text-xl text-gray-600 mb-4";
    paragraph.textContent = "Oops! Page not found";
    
    const link = document.createElement('a');
    link.href = "/";
    link.className = "text-blue-500 hover:text-blue-700 underline";
    link.textContent = "Return to Home";
    
    // Log error to console
    console.error(
      "404 Error: User attempted to access non-existent route:",
      window.location.pathname
    );
    
    // Append elements
    contentDiv.appendChild(heading);
    contentDiv.appendChild(paragraph);
    contentDiv.appendChild(link);
    container.appendChild(contentDiv);
    
    // Replace the root element with our new content
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = '';
      rootElement.appendChild(container);
    }
  });
  
  // Return null since we're handling DOM manipulation directly
  return null;
};

export default NotFound;
