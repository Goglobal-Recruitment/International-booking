# Contributing to Booking.com Clone

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

1. **Check existing issues** first to avoid duplicates
2. **Use the issue template** to provide all necessary information
3. **Include specific details**:
   - Steps to reproduce the problem
   - Expected vs actual behavior
   - Screenshots/videos if applicable
   - Browser and device information
   - Console errors

### Suggesting Features

1. **Check the roadmap** in the README to see if it's already planned
2. **Create a feature request** with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach
   - UI/UX mockups if applicable

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- Git
- Supabase account
- Code editor (VS Code recommended)

### Setup Steps

1. **Fork the repository**
```bash
git clone https://github.com/your-username/booking-clone.git
cd booking-clone
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment**
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

4. **Start development server**
```bash
npm run dev
```

5. **Set up Supabase functions**
```bash
# Install Supabase CLI
npm install -g supabase

# Login and deploy functions
supabase login
supabase functions deploy
```

## 📝 Code Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the configured linting rules
- **Prettier**: Use Prettier for code formatting
- **Naming**: Use descriptive variable and function names

### Component Guidelines

- **React Functional Components**: Use function components with hooks
- **Props Interface**: Define TypeScript interfaces for all props
- **Default Props**: Use default parameters instead of defaultProps
- **File Naming**: Use PascalCase for component files

### Example Component:
```typescript
interface MyComponentProps {
  title: string;
  description?: string;
  onClick: () => void;
}

export function MyComponent({ 
  title, 
  description = "Default description", 
  onClick 
}: MyComponentProps) {
  return (
    <div className="component-container">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <button onClick={onClick}>Click me</button>
    </div>
  );
}
```

### CSS Guidelines

- **Tailwind CSS**: Use Tailwind classes for styling
- **Custom CSS**: Minimize custom CSS, use Tailwind utilities
- **Responsive Design**: Always consider mobile-first design
- **Consistent Spacing**: Use Tailwind spacing scale

### Backend Guidelines

- **Error Handling**: Always include proper error handling
- **Logging**: Use console.log for debugging, console.error for errors
- **Security**: Validate all inputs and check authentication
- **Performance**: Consider performance impact of database queries

## 🔄 Pull Request Process

### Before Submitting

1. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

2. **Make your changes**
```bash
# Make changes
git add .
git commit -m "feat: add amazing feature"
```

3. **Test your changes**
```bash
npm run type-check
npm run lint
npm run build
```

4. **Update documentation** if needed

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] I have tested this change
- [ ] All existing tests pass
- [ ] I have added new tests if needed

## Screenshots
(if applicable)

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review
- [ ] I have commented complex code
- [ ] I have updated documentation
- [ ] My changes generate no new warnings
```

### Review Process

1. **Automated checks** must pass (linting, type checking, build)
2. **Code review** by at least one maintainer
3. **Testing** in development environment
4. **Merge** after approval

## 🎯 Areas for Contribution

### High Priority
- [ ] Payment integration improvements
- [ ] Mobile responsiveness enhancements
- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] Unit tests

### Medium Priority
- [ ] Additional payment methods
- [ ] Search filters enhancement
- [ ] User profile features
- [ ] Email templates
- [ ] API rate limiting

### Low Priority
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Social media integration
- [ ] Progressive Web App features

## 🧪 Testing

### Frontend Testing
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

### Backend Testing
```bash
# Deploy functions locally
supabase functions serve

# Test with curl
curl -X POST http://localhost:54321/functions/v1/make-server-2c363e8a/health
```

### Manual Testing Checklist

#### Authentication Flow
- [ ] User registration works
- [ ] Email verification (if configured)
- [ ] Login/logout functionality
- [ ] Password reset (if implemented)

#### Search & Booking
- [ ] Search for flights works
- [ ] Search for hotels works
- [ ] Search for cars works
- [ ] Booking flow completes
- [ ] Payment processing works

#### Admin Panel
- [ ] Admin login works
- [ ] Discount code management
- [ ] Scraping control
- [ ] Analytics display

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

### Tools
- [VS Code](https://code.visualstudio.com/)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Supabase CLI](https://supabase.com/docs/reference/cli)

## 🚀 Release Process

### Versioning
We use [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features
- **PATCH**: Bug fixes

### Release Checklist
1. Update version in package.json
2. Update CHANGELOG.md
3. Create release notes
4. Tag the release
5. Deploy to production

## ❓ Getting Help

### Community
- **GitHub Discussions**: For general questions
- **Issues**: For bug reports and feature requests
- **Discord** (if available): For real-time chat

### Maintainers
- **Response Time**: We aim to respond within 48 hours
- **Review Time**: Pull requests reviewed within 1 week
- **Release Cycle**: Monthly releases for major features

## 🏆 Recognition

Contributors will be:
- Listed in the README contributors section
- Mentioned in release notes
- Invited to the contributors Discord channel
- Eligible for contributor swag (if available)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to make this project better! 🙏**