# www
www.broadcaster.pl
broadcaster.pl


1. Najpierw stwórz projekt bez TypeScript:

```bash
npx create-next-app@latest broadcaster --tailwind --app
cd broadcaster
```

2. Następnie dodaj TypeScript:

```bash
npm install --save-dev typescript @types/react @types/node
```

3. Zainstaluj potrzebne zależności pojedynczo:

```bash
npm install lucide-react
```

4. Dla komponentów shadcn/ui:

```bash
npx shadcn-ui@latest init
```

Przy konfiguracji shadcn-ui wybierz:
- Would you like to use TypeScript (recommended)? Yes
- Which style would you like to use? Default
- Which color would you like to use as base color? Slate
- Where is your global CSS file? app/globals.css
- Would you like to use CSS variables for colors? Yes
- Where is your tailwind.config.js located? tailwind.config.js
- Configure the import alias for components: @/components
- Configure the import alias for utils: @/lib/utils

Następnie:

```bash
npx shadcn-ui@latest add card
```

Jeśli nadal występują problemy, możemy spróbować użyć nvm (Node Version Manager) do zainstalowania innej wersji Node.js:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 23
nvm use 23
```
