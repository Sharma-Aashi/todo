This is a Todo App built using Angular (latest version), following a modular and scalable architecture. The application follows best practices such as lazy loading, shared and feature module separation, service-based HTTP communication, and reusable child components. The project is deployed on GitHub Pages.

Design Decisions
1. Modular Architecture
Used feature modules to separate concerns and keep the project maintainable.
Implemented a shared module for reusable components.
Global services are placed in the core module.

2. Lazy Loading for Performance
Used lazy loading to improve performance by loading only necessary modules when required.
This reduces initial bundle size and speeds up application load time.

Optimizations
1. Lazy Loading with Preloading Strategy
Used PreloadAllModules strategy to improve perceived performance for frequently used modules.

Potential Enhancements (If More Time Was Available)
1. Authentication & User Profiles
Add authentication using JWT to allow multiple users to manage their own tasks.
Implement login/signup pages.

2. Dark Mode Toggle
Implement light/dark mode switch using Angular Material’s theme support.

3. Unit Testing with Jasmine/Karma
Add unit tests to ensure service and component functionality.
Use HttpTestingController to mock API responses.
