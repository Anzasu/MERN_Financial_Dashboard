# Security Best Practices

## Environment Variables
- Use .env.example as a template for required variables
- Never commit actual .env files
- The repository includes .gitignore rules to prevent accidental commits
- Rotate credentials immediately if accidentally exposed

## If You Find Exposed Credentials
1. Rotate all affected credentials immediately
2. Remove from Git history using: git filter-repo --path '.env' --invert-paths
3. Force push: git push --force --all
4. Notify collaborators to reclone

## Prevention
- Use pre-commit hooks to check for .env files
- Enable GitHub's secret scanning
- Use environment variable managers in production
