# QR Generator (qrcode-generator-dev)

Un générateur de QR codes moderne, personnalisable, rapide et 100% privé s'exécutant entièrement côté client (*client-side*) dans le navigateur.

## 🚀 Fonctionnalités principales

- **Génération multi-types :**
  - Site web / URL
  - Texte libre
  - Wi-Fi (WPA, WEP, Réseau ouvert / masqué)
  - E-mail (avec objet et corps pré-remplis)
  - Téléphone & SMS
  - Contact (vCard 3.0)
  - Géolocalisation (Coordonnées GPS)

- **Personnalisation avancée du design :**
  - Couleurs du QR et du fond (support du fond transparent)
  - Dégradés de couleurs (linéaire, radial)
  - Styles de modules (carré, arrondi, points)
  - Styles et couleurs des yeux/marqueurs de coins
  - Niveaux de correction d'erreur (L, M, Q, H)
  - Incrustation de logo / image (avec ajustement automatique du niveau H et contrôle de taille/padding)

- **Exportations multiples :**
  - PNG haute résolution (1024x1024)
  - SVG vectoriel
  - Document PDF (A4) avec masquage automatique des contenus sensibles (ex. Wi-Fi, contacts)

- **Historique local & Confidentialité :**
  - Historique sauvegardé localement dans `localStorage`
  - Les mots de passe Wi-Fi ne sont **jamais** stockés en clair dans l'historique
  - Gestion automatique des dépassements de quota `localStorage` (`QuotaExceededError`)

- **PWA & Hors Ligne :**
  - Support Progressive Web App (PWA) avec Service Worker
  - Fonctionnement 100% hors-ligne
  - Icônes SVG et PNG de repli (192x192, 512x512)

- **Internationalisation (i18n) :**
  - Prise en charge du Français (FR) et de l'Anglais (EN)
  - Support Thème Sombre (Dark Mode)

## 🔒 Confidentialité & Sécurité

**100% Client-Side :** Aucune donnée saisie ou générée n'est transmise à un serveur externe. Tout le traitement (génération, décodage de test, historique, rendu PDF/PNG/SVG) s'effectue exclusivement dans le navigateur de l'utilisateur.

## 🛠️ Stack Technique

- **Framework :** React 19, TypeScript
- **Bundler & Outillage :** Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icônes :** Lucide React
- **Génération & Rendu QR :** `qrcode`, Canvas API HTML5
- **PDF & Importations Dynamiques :** `jsPDF` (chargé à la demande en lazy-loading)
- **Linter & Tests :** `oxlint`, `vitest`

## 📜 Scripts disponibles

```bash
# Lancer le serveur de développement
npm run dev

# Vérifier le typage TypeScript et builder le projet
npm run build

# Exécuter le linter (oxlint)
npm run lint

# Lancer la suite de tests unitaires (vitest)
npm run test

# Prévisualiser le build de production
npm run preview
```
