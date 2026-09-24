# QR Generator Dev

Générateur de QR codes moderne, rapide, personnalisable et **100% côté client** (client-side) avec support PWA, i18n FR/EN et gestion d'historique local.

---

## 🌟 Fonctionnalités Principales

- **Génération Instantanée & Privée** : Génération en quelques millisecondes entièrement dans votre navigateur. Aucune donnée n'est transmise à un serveur distant.
- **Types de QR Codes Supportés** :
  - Site Web / URL (`https://...`)
  - Texte libre ou notes
  - Wi-Fi (WPA, WEP, réseau ouvert)
  - E-mail (`mailto:`)
  - Appel Téléphonique (`tel:`)
  - Message SMS (`smsto:`)
  - Contact vCard 3.0
  - Localisation GPS / Google Maps
- **Personnalisation Avancée** :
  - Couleurs du QR code et du fond (avec support de fond transparent)
  - Dégradés de couleur (Linéaire et Radial)
  - Style des modules (Carré, Arrondi, Points/Cercles)
  - Style des yeux/coins (Carré, Arrondi, Cercle) et couleur d'yeux personnalisée
  - Niveau de correction d'erreur (L, M, Q, H)
  - Intégration de Logo/Image personnalisée (avec vérification de taille max 2 Mo)
- **Export Multi-format** :
  - **PNG** (haute résolution)
  - **SVG** (vectoriel)
  - **PDF A4** (avec masquage automatique des données sensibles comme le mot de passe Wi-Fi et les données vCard)
- **Historique Local & Confidentialité** :
  - Sauvegarde automatique dans le `localStorage` de l'appareil
  - Omis des mots de passe Wi-Fi en clair dans l'historique
  - Protection contre `QuotaExceededError` avec recyclage automatique des éléments les plus anciens
- **Progressive Web App (PWA)** :
  - Installable sur mobile et ordinateur
  - Mode hors ligne fonctionnel via Service Worker

---

## 🛠️ Stack Technique

- **Frontend** : React 19, TypeScript
- **Bundler & Build Tool** : Vite 8
- **Styles** : Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icônes** : Lucide React
- **Génération & Export QR** : `qrcode`, `jspdf` (chargé à la demande / lazy-loaded)
- **Linter & Tests** : `oxlint`, `vitest`

---

## 🚀 Scripts Disponibles

```bash
# Lancer le serveur de développement
npm run dev

# Exécuter les vérifications de types TypeScript et le build de production
npm run build

# Lancer le linter oxlint
npm run lint

# Lancer la suite de tests unitaires (Vitest)
npm test

# Prévisualiser le build de production
npm run preview
```

---

## 🔒 Confidentialité & Sécurité

**100% Local-First & Client-Side** :
Toutes les opérations (construction de la matrice QR, rendu Canvas/SVG, génération PDF, sauvegarde d'historique) s'exécutent exclusivement dans votre navigateur web.
- Aucun backend, aucun serveur API distant.
- L'historique reste confiné dans le `localStorage` de votre appareil.
- Les mots de passe des réseaux Wi-Fi ne sont jamais enregistrés en clair dans le stockage local.
