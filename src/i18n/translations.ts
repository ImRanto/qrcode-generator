export type Language = 'en' | 'fr';

export const translations = {
  en: {
    // Header & Navigation
    appTitle: 'QR Generator',
    github: 'GitHub',
    about: 'About',
    themeToggle: 'Toggle theme',
    languageToggle: 'Language',

    // Hero Section
    heroTitle: 'Generate QR Codes Instantly',
    heroSubtitle: 'Create clean, customizable QR codes from any text or URL in seconds.',

    // Privacy Badges
    browserGenerationPrivacy: 'Your QR codes are generated in your browser.',
    deviceDataPrivacy: 'Your data stays on your device.',
    clientSideOnly: '100% Client-Side',

    // Templates Section
    startWithTemplate: 'Start with a template',
    tplWebsiteTitle: 'Website',
    tplWebsiteDesc: 'Create a QR code for your website',
    tplWifiTitle: 'Wi-Fi',
    tplWifiDesc: 'Let people connect to your Wi-Fi instantly',
    tplCardTitle: 'Business Card',
    tplCardDesc: 'Share your contact information',
    tplEmailTitle: 'Email',
    tplEmailDesc: 'Send pre-filled emails with one scan',
    tplPhoneTitle: 'Phone',
    tplPhoneDesc: 'Allow instant phone calls',
    tplSmsTitle: 'SMS',
    tplSmsDesc: 'Send pre-formatted text messages',
    tplLocationTitle: 'Location',
    tplLocationDesc: 'Share map directions and pin location',
    tplEventTitle: 'Event',
    tplEventDesc: 'Share event details and RSVP info',
    tplSocialTitle: 'Social Media',
    tplSocialDesc: 'Direct people to your social profiles',
    tplRestaurantTitle: 'Restaurant Menu',
    tplRestaurantDesc: 'Share your menu with one scan',

    // Type Selector
    selectTypeLabel: 'WHAT DO YOU WANT TO CREATE?',
    typeWebsite: 'Website',
    typeText: 'Text',
    typeWifi: 'Wi-Fi',
    typeEmail: 'Email',
    typePhone: 'Phone',
    typeSms: 'SMS',
    typeContact: 'Contact',
    typeLocation: 'Location',

    // Forms
    websiteLabel: 'Text or URL',
    websitePlaceholder: 'https://example.com',

    textLabel: 'Plain Text or Note',
    textPlaceholder: 'Enter any text here...',

    wifiSsidLabel: 'Network Name (SSID)',
    wifiSsidPlaceholder: 'e.g. MyHomeWiFi',
    wifiSecurityLabel: 'Security',
    wifiSecWpa: 'WPA / WPA2 / WPA3',
    wifiSecWep: 'WEP',
    wifiSecNone: 'None (Open)',
    wifiPasswordLabel: 'Password',
    wifiPasswordPlaceholder: 'Wi-Fi Password',
    wifiHiddenLabel: 'Hidden Network',
    yes: 'Yes',
    no: 'No',

    emailAddressLabel: 'Email Address',
    emailAddressPlaceholder: 'name@example.com',
    emailSubjectLabel: 'Subject (Optional)',
    emailSubjectPlaceholder: 'e.g. Inquiry',
    emailMessageLabel: 'Message Body (Optional)',
    emailMessagePlaceholder: 'Your message here...',

    phoneNumberLabel: 'Phone Number',
    phonePlaceholder: '+1 234 567 8900',

    smsPhoneLabel: 'Recipient Phone Number',
    smsPhonePlaceholder: '+1 234 567 8900',
    smsMessageLabel: 'SMS Message (Optional)',
    smsMessagePlaceholder: 'Type your message...',

    contactFirstNameLabel: 'First Name',
    contactLastNameLabel: 'Last Name',
    contactOrgLabel: 'Organization',
    contactPhoneLabel: 'Phone',
    contactEmailLabel: 'Email',
    contactWebsiteLabel: 'Website',
    contactFirstNamePlaceholder: 'John',
    contactLastNamePlaceholder: 'Doe',
    contactOrgPlaceholder: 'Company Inc.',

    locationLatLabel: 'Latitude',
    locationLatPlaceholder: '48.8584',
    locationLngLabel: 'Longitude',
    locationLngPlaceholder: '2.2945',

    // Actions
    generateBtn: 'Generate QR Code',
    copyBtn: 'Copy',
    shareBtn: 'Share',
    downloadBtn: 'Download',
    sharedSuccess: 'Shared successfully!',
    shareFallbackDesc: 'Link copied to clipboard (Sharing unsupported on this browser).',

    // Validation & Errors
    errEmptyWebsite: 'Please enter a website URL.',
    errInvalidWebsite: 'Please enter a valid website URL.',
    errEmptyText: 'Please enter some text.',
    errEmptySsid: 'Please enter a network SSID.',
    errEmptyWifiPass: 'Please enter a Wi-Fi password or select Open security.',
    errEmptyEmail: 'Please enter an email address.',
    errInvalidEmail: 'Please enter a valid email address.',
    errEmptyPhone: 'Please enter a phone number.',
    errEmptyContact: 'Please enter at least a name, phone, or email for the contact.',
    errInvalidContactEmail: 'Please enter a valid email address for the contact.',
    errEmptyLocation: 'Please enter both latitude and longitude.',
    errInvalidLat: 'Latitude must be a valid number between -90 and 90.',
    errInvalidLng: 'Longitude must be a valid number between -180 and 180.',

    // Customization
    customizeTitle: 'Customize',
    qrColorLabel: 'QR Color',
    bgColorLabel: 'Background',
    sizeLabel: 'Size',
    sizeSmall: 'Small',
    sizeMedium: 'Medium',
    sizeLarge: 'Large',
    resetBtn: 'Reset',

    // Preview & Contrast Validation
    emptyStateTitle: 'Your QR code will appear here',
    emptyStateSubtitle: 'Enter some text or a URL to generate your QR code.',
    copyPayload: 'Copy QR Content',
    copiedPayload: 'Copied!',
    contrastOptimal: 'Recommended contrast',
    contrastWeakWarning: 'Low contrast. This QR Code may be difficult to scan.',
    payloadLengthWarning: 'Very long content. The QR matrix is dense and may require zooming to scan.',

    // Export / Download Menu
    exportMenuTitle: 'Export Options',
    filenameLabel: 'File Name',
    filenamePlaceholder: 'mon-qr-code',
    filenameHint: 'Extension will be added automatically',
    downloadPngBtn: 'Download PNG',
    downloadSvgBtn: 'Download SVG',
    downloadPdfBtn: 'Download PDF',
    downloadSuccess: 'Downloaded successfully!',
    finalFilenameLabel: 'Final name:',

    // Local History
    historyTitle: 'Recent QR Codes',
    noHistoryTitle: 'No Recent QR Codes',
    noHistorySub: 'Generated QR codes will be saved here automatically for quick reuse and export.',
    clearHistoryBtn: 'Clear history',
    confirmClearAll: 'Clear all?',
    confirmYes: 'Yes',
    reuseBtn: 'Reuse',
    deleteBtn: 'Delete',
    storedLocallyBadge: 'Stored locally on your device',
    payloadLabel: 'Payload:',
    reuseInEditorBtn: 'Reuse in Editor',

    // Features Section
    featureFastTitle: 'Fast & Instant',
    featureFastDesc: 'Generates clean QR codes in milliseconds completely in your browser.',
    featurePrivateTitle: 'Private & Secure',
    featurePrivateDesc: 'No data is sent to external servers. Everything stays on your device.',
    featureFreeTitle: '100% Free',
    featureFreeDesc: 'No subscriptions, no hidden limits, and no accounts required.',

    // PWA & Banner
    pwaInstallTitle: 'Install App',
    pwaInstallDesc: 'Install QR Generator on your device for instant offline access.',
    pwaInstallBtn: 'Install App',
    pwaDismissBtn: 'Dismiss',
    offlineReadyBadge: 'Works Offline',

    // Footer
    footerSub: 'Simple QR code generation, entirely in your browser.',
    footerCopyright: '© 2026 QR Generator. Made with React & Vite.',
  },
  fr: {
    // Header & Navigation
    appTitle: 'QR Generator',
    github: 'GitHub',
    about: 'À propos',
    themeToggle: 'Changer le thème',
    languageToggle: 'Langue',

    // Hero Section
    heroTitle: 'Générez des QR Codes Instantanément',
    heroSubtitle: 'Créez des QR codes propres et personnalisables à partir de tout texte ou URL en quelques secondes.',

    // Privacy Badges
    browserGenerationPrivacy: 'Vos QR codes sont générés directement dans votre navigateur.',
    deviceDataPrivacy: 'Vos données restent uniquement sur votre appareil.',
    clientSideOnly: '100% Côté Client',

    // Templates Section
    startWithTemplate: 'Commencer avec un modèle',
    tplWebsiteTitle: 'Site Web',
    tplWebsiteDesc: 'Créez un QR code pour votre site Web',
    tplWifiTitle: 'Wi-Fi',
    tplWifiDesc: 'Permettez de se connecter à votre Wi-Fi en un scan',
    tplCardTitle: 'Carte de visite',
    tplCardDesc: 'Partagez vos coordonnées facilement',
    tplEmailTitle: 'E-mail',
    tplEmailDesc: 'Envoyez des e-mails pré-remplis',
    tplPhoneTitle: 'Téléphone',
    tplPhoneDesc: 'Permettez des appels téléphoniques directs',
    tplSmsTitle: 'SMS',
    tplSmsDesc: 'Envoyez des SMS pré-formatés',
    tplLocationTitle: 'Localisation',
    tplLocationDesc: 'Partagez un itinéraire ou une position GPS',
    tplEventTitle: 'Événement',
    tplEventDesc: 'Partagez les détails d\'un événement et RSVP',
    tplSocialTitle: 'Réseaux sociaux',
    tplSocialDesc: 'Rédirigez vers vos profils sociaux',
    tplRestaurantTitle: 'Menu de restaurant',
    tplRestaurantDesc: 'Partagez votre carte ou menu en un scan',

    // Type Selector
    selectTypeLabel: 'QUE SOUHAITEZ-VOUS CRÉER ?',
    typeWebsite: 'Site Web',
    typeText: 'Texte Libre',
    typeWifi: 'Wi-Fi',
    typeEmail: 'E-mail',
    typePhone: 'Téléphone',
    typeSms: 'SMS',
    typeContact: 'Contact (vCard)',
    typeLocation: 'Localisation',

    // Forms
    websiteLabel: 'Texte ou URL',
    websitePlaceholder: 'https://exemple.fr',

    textLabel: 'Texte brut ou Note',
    textPlaceholder: 'Saisissez votre texte ici...',

    wifiSsidLabel: 'Nom du réseau (SSID)',
    wifiSsidPlaceholder: 'ex: MonWifiMaison',
    wifiSecurityLabel: 'Sécurité',
    wifiSecWpa: 'WPA / WPA2 / WPA3',
    wifiSecWep: 'WEP',
    wifiSecNone: 'Aucune (Ouvert)',
    wifiPasswordLabel: 'Mot de passe',
    wifiPasswordPlaceholder: 'Mot de passe Wi-Fi',
    wifiHiddenLabel: 'Réseau masqué',
    yes: 'Oui',
    no: 'Non',

    emailAddressLabel: 'Adresse e-mail',
    emailAddressPlaceholder: 'nom@exemple.fr',
    emailSubjectLabel: 'Objet (Optionnel)',
    emailSubjectPlaceholder: 'ex: Demande de renseignement',
    emailMessageLabel: 'Corps du message (Optionnel)',
    emailMessagePlaceholder: 'Votre message ici...',

    phoneNumberLabel: 'Numéro de téléphone',
    phonePlaceholder: '+33 6 12 34 56 78',

    smsPhoneLabel: 'Numéro du destinataire',
    smsPhonePlaceholder: '+33 6 12 34 56 78',
    smsMessageLabel: 'Message SMS (Optionnel)',
    smsMessagePlaceholder: 'Écrivez votre message...',

    contactFirstNameLabel: 'Prénom',
    contactLastNameLabel: 'Nom',
    contactOrgLabel: 'Société / Organisation',
    contactPhoneLabel: 'Téléphone',
    contactEmailLabel: 'E-mail',
    contactWebsiteLabel: 'Site Web',
    contactFirstNamePlaceholder: 'Jean',
    contactLastNamePlaceholder: 'Dupont',
    contactOrgPlaceholder: 'Entreprise SAS',

    locationLatLabel: 'Latitude',
    locationLatPlaceholder: '48.8584',
    locationLngLabel: 'Longitude',
    locationLngPlaceholder: '2.2945',

    // Actions
    generateBtn: 'Générer le QR Code',
    copyBtn: 'Copier',
    shareBtn: 'Partager',
    downloadBtn: 'Télécharger',
    sharedSuccess: 'Partagé avec succès !',
    shareFallbackDesc: 'Lien copié dans le presse-papiers (Partage non supporté sur ce navigateur).',

    // Validation & Errors
    errEmptyWebsite: 'Veuillez saisir une URL de site Web.',
    errInvalidWebsite: 'Veuillez saisir une URL valide.',
    errEmptyText: 'Veuillez saisir du texte.',
    errEmptySsid: 'Veuillez saisir le nom du réseau (SSID).',
    errEmptyWifiPass: 'Veuillez saisir un mot de passe Wi-Fi ou choisir un réseau ouvert.',
    errEmptyEmail: 'Veuillez saisir une adresse e-mail.',
    errInvalidEmail: 'Veuillez saisir une adresse e-mail valide.',
    errEmptyPhone: 'Veuillez saisir un numéro de téléphone.',
    errEmptyContact: 'Veuillez renseigner au moins un nom, un numéro ou un e-mail.',
    errInvalidContactEmail: 'Veuillez saisir une adresse e-mail de contact valide.',
    errEmptyLocation: 'Veuillez saisir la latitude et la longitude.',
    errInvalidLat: 'La latitude doit être un nombre valide entre -90 et 90.',
    errInvalidLng: 'La longitude doit être un nombre valide entre -180 et 180.',

    // Customization
    customizeTitle: 'Personnaliser',
    qrColorLabel: 'Couleur du QR',
    bgColorLabel: 'Fond',
    sizeLabel: 'Taille',
    sizeSmall: 'Petite',
    sizeMedium: 'Moyenne',
    sizeLarge: 'Grande',
    resetBtn: 'Réinitialiser',

    // Preview & Contrast Validation
    emptyStateTitle: 'Votre QR code apparaîtra ici',
    emptyStateSubtitle: 'Saisissez du texte ou une URL pour générer votre QR code.',
    copyPayload: 'Copier le contenu du QR',
    copiedPayload: 'Copié !',
    contrastOptimal: 'Contraste recommandé',
    contrastWeakWarning: 'Contraste faible. Ce QR Code pourrait être difficile à scanner.',
    payloadLengthWarning: 'Contenu très long. La matrice QR est dense et pourrait nécessiter un zoom.',

    // Export / Download Menu
    exportMenuTitle: 'Options d\'exportation',
    filenameLabel: 'Nom du fichier',
    filenamePlaceholder: 'mon-qr-code',
    filenameHint: 'L\'extension sera ajoutée automatiquement',
    downloadPngBtn: 'Télécharger PNG',
    downloadSvgBtn: 'Télécharger SVG',
    downloadPdfBtn: 'Télécharger PDF',
    downloadSuccess: 'Téléchargé avec succès !',
    finalFilenameLabel: 'Nom final :',

    // Local History
    historyTitle: 'QR Codes Récents',
    noHistoryTitle: 'Aucun QR Code Récent',
    noHistorySub: 'Les QR codes générés seront enregistrés automatiquement ici pour une réutilisation rapide.',
    clearHistoryBtn: 'Effacer l\'historique',
    confirmClearAll: 'Tout effacer ?',
    confirmYes: 'Oui',
    reuseBtn: 'Réutiliser',
    deleteBtn: 'Supprimer',
    storedLocallyBadge: 'Stocké localement sur votre appareil',
    payloadLabel: 'Contenu :',
    reuseInEditorBtn: 'Réutiliser dans l\'éditeur',

    // Features Section
    featureFastTitle: 'Rapide & Instantané',
    featureFastDesc: 'Génère des QR codes propres en quelques millisecondes entièrement dans votre navigateur.',
    featurePrivateTitle: 'Privé & Sécurisé',
    featurePrivateDesc: 'Aucune donnée n\'est envoyée vers un serveur externe. Tout reste sur votre appareil.',
    featureFreeTitle: '100% Gratuit',
    featureFreeDesc: 'Sans abonnement, sans limite cachée et sans création de compte requise.',

    // PWA & Banner
    pwaInstallTitle: 'Installer l\'application',
    pwaInstallDesc: 'Installez QR Generator sur votre appareil pour un accès instantané même hors ligne.',
    pwaInstallBtn: 'Installer',
    pwaDismissBtn: 'Ignorer',
    offlineReadyBadge: 'Fonctionne Hors Ligne',

    // Footer
    footerSub: 'Génération simple de QR codes, entièrement dans votre navigateur.',
    footerCopyright: '© 2026 QR Generator. Fait avec React & Vite.',
  },
};

export type TranslationKeys = keyof typeof translations.en;
