
// Simple vanilla JavaScript router

class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentPath = window.location.pathname;
    
    // Handle navigation
    window.addEventListener('popstate', () => this.handleRoute());
    
    // Intercept link clicks for SPA navigation
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && e.target.href.startsWith(window.location.origin)) {
        e.preventDefault();
        this.navigate(e.target.pathname);
      }
    });
  }
  
  init() {
    this.handleRoute();
  }
  
  handleRoute() {
    this.currentPath = window.location.pathname;
    
    // Find matching route or use 404
    const route = this.routes.find(r => r.path === this.currentPath) || 
                 this.routes.find(r => r.path === '*');
    
    if (route) {
      route.handler();
    }
  }
  
  navigate(path) {
    window.history.pushState({}, '', path);
    this.currentPath = path;
    this.handleRoute();
  }
}

export default Router;
