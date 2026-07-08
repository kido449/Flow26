import type { Locale } from "@/lib/types"

// Static UI string dictionary. Keys are dot-namespaced by feature. This is the
// single source of translated copy, routed through the TranslationService so a
// real translation API can replace it later without touching components.

export type TranslationKey =
  | "app.name"
  | "app.tagline"
  | "nav.home"
  | "nav.assistant"
  | "nav.wayfinding"
  | "nav.crowd"
  | "nav.more"
  | "nav.staff.tasks"
  | "nav.staff.report"
  | "nav.staff.map"
  | "nav.staff.copilot"
  | "nav.command.dashboard"
  | "nav.command.heatmaps"
  | "nav.command.incidents"
  | "nav.command.broadcast"
  | "nav.command.health"
  | "role.label"
  | "role.demoNote"
  | "role.fan"
  | "role.staff"
  | "role.command"
  | "role.fan.desc"
  | "role.staff.desc"
  | "role.command.desc"
  | "lang.label"
  | "locale.label"
  | "locale.en"
  | "locale.es"
  | "locale.fr"
  | "locale.pt"
  | "home.greeting"
  | "home.subtitle"
  | "home.quickActions"
  | "home.liveStatus"
  | "home.fill"
  | "home.busiest"
  | "home.longestWait"
  | "assistant.title"
  | "assistant.subtitle"
  | "assistant.placeholder"
  | "assistant.send"
  | "assistant.sources"
  | "assistant.noSources"
  | "assistant.thinking"
  | "assistant.empty"
  | "assistant.suggestions"
  | "assistant.grounded"
  | "wayfinding.title"
  | "wayfinding.subtitle"
  | "wayfinding.from"
  | "wayfinding.to"
  | "wayfinding.route"
  | "wayfinding.eta"
  | "wayfinding.safeRoute"
  | "wayfinding.congestedRoute"
  | "wayfinding.selectPrompt"
  | "wayfinding.legend"
  | "crowd.title"
  | "crowd.subtitle"
  | "crowd.overall"
  | "crowd.zones"
  | "crowd.queues"
  | "crowd.wait"
  | "crowd.minutes"
  | "crowd.trend.rising"
  | "crowd.trend.steady"
  | "crowd.trend.falling"
  | "crowd.updated"
  | "congestion.low"
  | "congestion.moderate"
  | "congestion.high"
  | "congestion.critical"
  | "common.retry"
  | "common.loading"
  | "common.error"
  | "common.viewAll"
  | "stub.badge"
  | "stub.body"
  | "more.title"
  | "wayfinding.planRoute"
  | "wayfinding.samePoint"
  | "wayfinding.directions"
  | "wayfinding.zoneStatus"
  | "wayfinding.noRoute"
  | "wayfinding.avoidsCrowds"
  | "wayfinding.throughCrowds"
  | "crowd.liveHeatmap"
  | "crowd.busiestZone"
  | "crowd.calmestZone"
  | "crowd.longestQueue"
  | "crowd.filterAll"
  | "crowd.filterGates"
  | "crowd.filterAmenities"
  | "crowd.capacity"
  | "crowd.roleNotice.command"
  | "crowd.roleNotice.staff"
  | "crowd.roleNotice.fan"
  | "crowd.viewMap"
  | "more.subtitle"
  | "stub.transit.title"
  | "stub.transit.desc"
  | "stub.accessibility.title"
  | "stub.accessibility.desc"
  | "stub.vip.title"
  | "stub.vip.desc"
  | "stub.emergency.title"
  | "stub.emergency.desc"
  | "stub.concessions.title"
  | "stub.concessions.desc"
  | "stub.incidents.title"
  | "stub.incidents.desc"
  | "stub.action"
  | "stub.back"

type Dictionary = Record<TranslationKey, string>

const en: Dictionary = {
  "app.name": "Tournament Copilot",
  "app.tagline": "Your matchday guide",
  "nav.home": "Home",
  "nav.assistant": "Assistant",
  "nav.wayfinding": "Wayfinding",
  "nav.crowd": "Crowd",
  "nav.more": "More",
  "nav.staff.tasks": "Active Tasks",
  "nav.staff.report": "Report Incident",
  "nav.staff.map": "Zone Map",
  "nav.staff.copilot": "Copilot",
  "nav.command.dashboard": "Global Dashboard",
  "nav.command.heatmaps": "Crowd Heatmaps",
  "nav.command.incidents": "Incident Command",
  "nav.command.broadcast": "Mass Broadcast",
  "nav.command.health": "System Health",
  "role.label": "Role",
  "role.demoNote": "Demo role — no login",
  "role.fan": "Fan",
  "role.staff": "Volunteer / Staff",
  "role.command": "Command Center",
  "role.fan.desc": "Find your seat, ask questions, avoid the crowds.",
  "role.staff.desc": "Guide fans and monitor your assigned zones.",
  "role.command.desc": "Full operational overview of crowd and incidents.",
  "lang.label": "Language",
  "locale.label": "Language",
  "locale.en": "English",
  "locale.es": "Español",
  "locale.fr": "Français",
  "locale.pt": "Português",
  "home.greeting": "Welcome to Atlas Metropolitan Stadium",
  "home.subtitle": "Everything you need for today's match, in one place.",
  "home.quickActions": "Quick actions",
  "home.liveStatus": "Live status",
  "home.fill": "Stadium fill",
  "home.busiest": "Busiest area",
  "home.longestWait": "Longest wait",
  "assistant.title": "Ask the Copilot",
  "assistant.subtitle": "Grounded in official stadium info. It won't guess.",
  "assistant.placeholder": "Ask about gates, seats, food, transport…",
  "assistant.send": "Send",
  "assistant.sources": "Retrieved sources",
  "assistant.noSources": "No sources retrieved for this answer.",
  "assistant.thinking": "Thinking…",
  "assistant.empty": "Ask a question to get started.",
  "assistant.suggestions": "Try asking",
  "assistant.grounded": "Grounded answer",
  "wayfinding.title": "Wayfinding",
  "wayfinding.subtitle": "Step-by-step routes that avoid busy areas.",
  "wayfinding.from": "From",
  "wayfinding.to": "To",
  "wayfinding.route": "Route",
  "wayfinding.eta": "Est. walk",
  "wayfinding.safeRoute": "Low-congestion route",
  "wayfinding.congestedRoute": "Passes a busy area",
  "wayfinding.selectPrompt": "Choose a start and destination to see a route.",
  "wayfinding.legend": "Map legend",
  "crowd.title": "Crowd awareness",
  "crowd.subtitle": "Live congestion across the stadium.",
  "crowd.overall": "Overall fill",
  "crowd.zones": "Zones",
  "crowd.queues": "Queues & waits",
  "crowd.wait": "Wait",
  "crowd.minutes": "min",
  "crowd.trend.rising": "Rising",
  "crowd.trend.steady": "Steady",
  "crowd.trend.falling": "Falling",
  "crowd.updated": "Updated",
  "congestion.low": "Low",
  "congestion.moderate": "Moderate",
  "congestion.high": "High",
  "congestion.critical": "Critical",
  "common.retry": "Retry",
  "common.loading": "Loading…",
  "common.error": "Something went wrong.",
  "common.viewAll": "View all",
  "stub.badge": "Placeholder — not built for demo",
  "stub.body": "This module is planned but not part of the current demo build. The navigation and role scaffolding are in place so it can be added next.",
  "more.title": "More modes",
  "wayfinding.planRoute": "Plan your route",
  "wayfinding.samePoint": "Start and destination cannot be the same.",
  "wayfinding.directions": "Step-by-step directions",
  "wayfinding.zoneStatus": "Zone crowd status",
  "wayfinding.noRoute": "No route could be computed between these points.",
  "wayfinding.avoidsCrowds": "Route avoids heavy crowds",
  "wayfinding.throughCrowds": "Route passes a congested area",
  "crowd.liveHeatmap": "Live stadium heatmap",
  "crowd.busiestZone": "Busiest zone",
  "crowd.calmestZone": "Calmest zone (recommended)",
  "crowd.longestQueue": "Longest wait",
  "crowd.filterAll": "All checkpoints",
  "crowd.filterGates": "Entry gates",
  "crowd.filterAmenities": "Concessions & WC",
  "crowd.capacity": "capacity",
  "crowd.roleNotice.command": "Command active: dispatching tactical units to red zones is recommended.",
  "crowd.roleNotice.staff": "Staff active: direct fans toward green/blue concourse areas.",
  "crowd.roleNotice.fan": "Tip: check live wait times before leaving your section!",
  "crowd.viewMap": "View on map",
  "more.subtitle": "Explore additional tournament modules and placeholder services.",
  "stub.transit.title": "Transit & Shuttle Tracking",
  "stub.transit.desc": "Live GPS tracking for stadium shuttle buses, metro line schedules, and ride-share drop-off queue wait times.",
  "stub.accessibility.title": "ADA & Accessibility Guide",
  "stub.accessibility.desc": "Wheelchair accessible route planner, sensory relief room status, audio descriptive commentary feeds, and mobility assistance.",
  "stub.vip.title": "VIP Suite & Hospitality Hub",
  "stub.vip.desc": "Premium club suite entry passes, private lounge menus, table reservations, and concierge matchday requests.",
  "stub.emergency.title": "Emergency Evacuation Protocol",
  "stub.emergency.desc": "Command-controlled emergency exit unlocking status, automated crowd dispersion routing, and shelter-in-place instructions.",
  "stub.concessions.title": "Express Concessions & Merch",
  "stub.concessions.desc": "In-seat beverage delivery tracking, click-and-collect food ordering from concourse kitchens, and merch stock locator.",
  "stub.incidents.title": "Lost & Found / Incident Reporting",
  "stub.incidents.desc": "Matchday security incident ticketing, lost child locator protocol, medical emergency dispatch, and property logs.",
  "stub.action": "Preview module",
  "stub.back": "Back to More modes",
}

const es: Dictionary = {
  "app.name": "Tournament Copilot",
  "app.tagline": "Tu guía del partido",
  "nav.home": "Inicio",
  "nav.assistant": "Asistente",
  "nav.wayfinding": "Rutas",
  "nav.crowd": "Multitud",
  "nav.more": "Más",
  "nav.staff.tasks": "Tareas Activas",
  "nav.staff.report": "Reportar Incidente",
  "nav.staff.map": "Mapa de Zonas",
  "nav.staff.copilot": "Copiloto",
  "nav.command.dashboard": "Panel Global",
  "nav.command.heatmaps": "Mapas de Calor",
  "nav.command.incidents": "Comando Incid.",
  "nav.command.broadcast": "Transmisión Masiva",
  "nav.command.health": "Salud del Sistema",
  "role.label": "Rol",
  "role.demoNote": "Rol de demo — sin inicio de sesión",
  "role.fan": "Aficionado",
  "role.staff": "Voluntario / Personal",
  "role.command": "Centro de mando",
  "role.fan.desc": "Encuentra tu asiento, pregunta y evita las aglomeraciones.",
  "role.staff.desc": "Orienta a los aficionados y supervisa tus zonas.",
  "role.command.desc": "Visión operativa completa de multitudes e incidentes.",
  "lang.label": "Idioma",
  "locale.label": "Idioma",
  "locale.en": "Inglés",
  "locale.es": "Español",
  "locale.fr": "Francés",
  "locale.pt": "Portugués",
  "home.greeting": "Bienvenido al Atlas Metropolitan Stadium",
  "home.subtitle": "Todo lo que necesitas para el partido de hoy, en un solo lugar.",
  "home.quickActions": "Acciones rápidas",
  "home.liveStatus": "Estado en vivo",
  "home.fill": "Ocupación",
  "home.busiest": "Zona más concurrida",
  "home.longestWait": "Espera más larga",
  "assistant.title": "Pregunta al Copilot",
  "assistant.subtitle": "Basado en información oficial del estadio. No adivina.",
  "assistant.placeholder": "Pregunta por puertas, asientos, comida, transporte…",
  "assistant.send": "Enviar",
  "assistant.sources": "Fuentes recuperadas",
  "assistant.noSources": "No se recuperaron fuentes para esta respuesta.",
  "assistant.thinking": "Pensando…",
  "assistant.empty": "Haz una pregunta para empezar.",
  "assistant.suggestions": "Prueba a preguntar",
  "assistant.grounded": "Respuesta fundamentada",
  "wayfinding.title": "Rutas",
  "wayfinding.subtitle": "Rutas paso a paso que evitan las zonas concurridas.",
  "wayfinding.from": "Desde",
  "wayfinding.to": "Hasta",
  "wayfinding.route": "Ruta",
  "wayfinding.eta": "Caminata aprox.",
  "wayfinding.safeRoute": "Ruta con poca aglomeración",
  "wayfinding.congestedRoute": "Pasa por una zona concurrida",
  "wayfinding.selectPrompt": "Elige un inicio y un destino para ver una ruta.",
  "wayfinding.legend": "Leyenda del mapa",
  "crowd.title": "Control de multitudes",
  "crowd.subtitle": "Congestión en vivo por todo el estadio.",
  "crowd.overall": "Ocupación total",
  "crowd.zones": "Zonas",
  "crowd.queues": "Colas y esperas",
  "crowd.wait": "Espera",
  "crowd.minutes": "min",
  "crowd.trend.rising": "Subiendo",
  "crowd.trend.steady": "Estable",
  "crowd.trend.falling": "Bajando",
  "crowd.updated": "Actualizado",
  "congestion.low": "Baja",
  "congestion.moderate": "Moderada",
  "congestion.high": "Alta",
  "congestion.critical": "Crítica",
  "common.retry": "Reintentar",
  "common.loading": "Cargando…",
  "common.error": "Algo salió mal.",
  "common.viewAll": "Ver todo",
  "stub.badge": "Marcador — no incluido en la demo",
  "stub.body": "Este módulo está planificado pero no forma parte de la demo actual. La navegación y los roles ya están listos para añadirlo a continuación.",
  "more.title": "Más modos",
  "wayfinding.planRoute": "Planificar ruta",
  "wayfinding.samePoint": "El origen y el destino no pueden ser el mismo.",
  "wayfinding.directions": "Indicaciones paso a paso",
  "wayfinding.zoneStatus": "Estado de las zonas",
  "wayfinding.noRoute": "No se pudo calcular una ruta entre estos puntos.",
  "wayfinding.avoidsCrowds": "La ruta evita grandes multitudes",
  "wayfinding.throughCrowds": "La ruta pasa por una zona congestionada",
  "crowd.liveHeatmap": "Mapa térmico en vivo",
  "crowd.busiestZone": "Zona más concurrida",
  "crowd.calmestZone": "Zona más tranquila (recomendada)",
  "crowd.longestQueue": "Espera más larga",
  "crowd.filterAll": "Todos los controles",
  "crowd.filterGates": "Puertas de entrada",
  "crowd.filterAmenities": "Servicios y baños",
  "crowd.capacity": "capacidad",
  "crowd.roleNotice.command": "Mando activo: se recomienda enviar unidades tácticas a las zonas rojas.",
  "crowd.roleNotice.staff": "Personal activo: guiar a los aficionados hacia zonas verdes/azules.",
  "crowd.roleNotice.fan": "Consejo: ¡consulta los tiempos de espera en vivo antes de salir de tu sección!",
  "crowd.viewMap": "Ver en el mapa",
  "more.subtitle": "Explora módulos adicionales del torneo y servicios planificados.",
  "stub.transit.title": "Transporte y seguimiento de autobuses",
  "stub.transit.desc": "Seguimiento GPS en vivo para autobuses del estadio, horarios de metro y tiempos de espera en zonas de taxis.",
  "stub.accessibility.title": "Guía de accesibilidad y ADA",
  "stub.accessibility.desc": "Planificador de rutas en silla de ruedas, salas de alivio sensorial y asistencia de movilidad.",
  "stub.vip.title": "Centro de hospitalidad y suites VIP",
  "stub.vip.desc": "Pases de acceso a suites premium, menús de salas privadas, reservas y solicitudes de conserjería.",
  "stub.emergency.title": "Protocolo de evacuación de emergencia",
  "stub.emergency.desc": "Estado de las salidas de emergencia controlado por mando, rutas de dispersión y directrices de seguridad.",
  "stub.concessions.title": "Concesiones y compras exprés",
  "stub.concessions.desc": "Seguimiento de entrega de bebidas en asiento, pedidos para recoger y localizador de stock de mercancía.",
  "stub.incidents.title": "Objetos perdidos y reporte de incidentes",
  "stub.incidents.desc": "Gestión de incidentes de seguridad, localizador de niños perdidos, despacho médico y registro de objetos.",
  "stub.action": "Vista previa del módulo",
  "stub.back": "Volver a Más modos",
}

const fr: Dictionary = {
  "app.name": "Tournament Copilot",
  "app.tagline": "Votre guide du match",
  "nav.home": "Accueil",
  "nav.assistant": "Assistant",
  "nav.wayfinding": "Itinéraires",
  "nav.crowd": "Affluence",
  "nav.more": "Plus",
  "nav.staff.tasks": "Tâches Actives",
  "nav.staff.report": "Signaler Incident",
  "nav.staff.map": "Carte des Zones",
  "nav.staff.copilot": "Copilote",
  "nav.command.dashboard": "Tableau Global",
  "nav.command.heatmaps": "Cartes Thermiques",
  "nav.command.incidents": "Gestion Incidents",
  "nav.command.broadcast": "Diffusion de Masse",
  "nav.command.health": "Santé du Système",
  "role.label": "Rôle",
  "role.demoNote": "Rôle démo — sans connexion",
  "role.fan": "Supporter",
  "role.staff": "Bénévole / Personnel",
  "role.command": "Centre de commandement",
  "role.fan.desc": "Trouvez votre place, posez des questions, évitez la foule.",
  "role.staff.desc": "Guidez les supporters et surveillez vos zones.",
  "role.command.desc": "Vue opérationnelle complète de l'affluence et des incidents.",
  "lang.label": "Langue",
  "locale.label": "Langue",
  "locale.en": "Anglais",
  "locale.es": "Espagnol",
  "locale.fr": "Français",
  "locale.pt": "Portugais",
  "home.greeting": "Bienvenue à l'Atlas Metropolitan Stadium",
  "home.subtitle": "Tout ce qu'il vous faut pour le match du jour, au même endroit.",
  "home.quickActions": "Actions rapides",
  "home.liveStatus": "État en direct",
  "home.fill": "Remplissage",
  "home.busiest": "Zone la plus fréquentée",
  "home.longestWait": "Attente la plus longue",
  "assistant.title": "Demandez au Copilot",
  "assistant.subtitle": "Basé sur les infos officielles du stade. Il ne devine pas.",
  "assistant.placeholder": "Portes, sièges, restauration, transport…",
  "assistant.send": "Envoyer",
  "assistant.sources": "Sources récupérées",
  "assistant.noSources": "Aucune source récupérée pour cette réponse.",
  "assistant.thinking": "Réflexion…",
  "assistant.empty": "Posez une question pour commencer.",
  "assistant.suggestions": "Essayez de demander",
  "assistant.grounded": "Réponse fondée",
  "wayfinding.title": "Itinéraires",
  "wayfinding.subtitle": "Des itinéraires pas à pas qui évitent les zones fréquentées.",
  "wayfinding.from": "Départ",
  "wayfinding.to": "Arrivée",
  "wayfinding.route": "Itinéraire",
  "wayfinding.eta": "Marche estimée",
  "wayfinding.safeRoute": "Itinéraire peu fréquenté",
  "wayfinding.congestedRoute": "Passe par une zone fréquentée",
  "wayfinding.selectPrompt": "Choisissez un départ et une arrivée pour voir un itinéraire.",
  "wayfinding.legend": "Légende de la carte",
  "crowd.title": "Gestion de l'affluence",
  "crowd.subtitle": "Congestion en direct dans tout le stade.",
  "crowd.overall": "Remplissage total",
  "crowd.zones": "Zones",
  "crowd.queues": "Files et attentes",
  "crowd.wait": "Attente",
  "crowd.minutes": "min",
  "crowd.trend.rising": "En hausse",
  "crowd.trend.steady": "Stable",
  "crowd.trend.falling": "En baisse",
  "crowd.updated": "Mis à jour",
  "congestion.low": "Faible",
  "congestion.moderate": "Modérée",
  "congestion.high": "Élevée",
  "congestion.critical": "Critique",
  "common.retry": "Réessayer",
  "common.loading": "Chargement…",
  "common.error": "Une erreur s'est produite.",
  "common.viewAll": "Tout voir",
  "stub.badge": "Aperçu — non inclus dans la démo",
  "stub.body": "Ce module est prévu mais ne fait pas partie de la démo actuelle. La navigation et les rôles sont en place pour l'ajouter ensuite.",
  "more.title": "Autres modes",
  "wayfinding.planRoute": "Planifier votre itinéraire",
  "wayfinding.samePoint": "Le point de départ et la destination ne peuvent pas être identiques.",
  "wayfinding.directions": "Itinéraire étape par étape",
  "wayfinding.zoneStatus": "Affluence des zones",
  "wayfinding.noRoute": "Aucun itinéraire trouvé entre ces points.",
  "wayfinding.avoidsCrowds": "L'itinéraire évite la foule",
  "wayfinding.throughCrowds": "L'itinéraire traverse une zone encombrée",
  "crowd.liveHeatmap": "Carte thermique en direct",
  "crowd.busiestZone": "Zone la plus saturée",
  "crowd.calmestZone": "Zone la plus calme (recommandée)",
  "crowd.longestQueue": "L'attente la plus longue",
  "crowd.filterAll": "Tous les points",
  "crowd.filterGates": "Portes d'entrée",
  "crowd.filterAmenities": "Restauration & WC",
  "crowd.capacity": "capacité",
  "crowd.roleNotice.command": "Commandement actif : envoi d'unités recommandé dans les zones rouges.",
  "crowd.roleNotice.staff": "Personnel actif : dirigez les supporters vers les zones calmes.",
  "crowd.roleNotice.fan": "Astuce : vérifiez l'attente en direct avant la mi-temps !",
  "crowd.viewMap": "Voir sur la carte",
  "more.subtitle": "Explorez les modules supplémentaires et services prévus pour le tournoi.",
  "stub.transit.title": "Suivi des navettes et transports",
  "stub.transit.desc": "Suivi GPS en direct des navettes du stade, horaires de métro et temps d'attente pour les VTC.",
  "stub.accessibility.title": "Guide d'accessibilité (PMR)",
  "stub.accessibility.desc": "Itinéraires adaptés aux fauteuils roulants, salles de repos sensoriel et assistance à la mobilité.",
  "stub.vip.title": "Salon VIP & Hospitalité",
  "stub.vip.desc": "Pass d'accès aux loges premium, menus privés et services de conciergerie de jour de match.",
  "stub.emergency.title": "Protocole d'évacuation d'urgence",
  "stub.emergency.desc": "État de déverrouillage des issues de secours, itinéraires de dispersion et instructions de sécurité.",
  "stub.concessions.title": "Restauration & Boutique Express",
  "stub.concessions.desc": "Livraison à la place, commande Click & Collect et disponibilité des stocks de produits dérivés.",
  "stub.incidents.title": "Objets trouvés & Signalement",
  "stub.incidents.desc": "Gestion des incidents de sécurité, protocole enfants perdus et assistance médicale.",
  "stub.action": "Aperçu du module",
  "stub.back": "Retour aux modes",
}

const pt: Dictionary = {
  "app.name": "Tournament Copilot",
  "app.tagline": "Seu guia de jogo",
  "nav.home": "Início",
  "nav.assistant": "Assistente",
  "nav.wayfinding": "Rotas",
  "nav.crowd": "Multidão",
  "nav.more": "Mais",
  "nav.staff.tasks": "Tarefas Ativas",
  "nav.staff.report": "Reportar Incidente",
  "nav.staff.map": "Mapa de Zonas",
  "nav.staff.copilot": "Copiloto",
  "nav.command.dashboard": "Painel Global",
  "nav.command.heatmaps": "Mapas de Calor",
  "nav.command.incidents": "Comando Incidentes",
  "nav.command.broadcast": "Transmissão Massa",
  "nav.command.health": "Saúde do Sistema",
  "role.label": "Função",
  "role.demoNote": "Função de demo — sem login",
  "role.fan": "Torcedor",
  "role.staff": "Voluntário / Equipe",
  "role.command": "Centro de comando",
  "role.fan.desc": "Encontre seu lugar, tire dúvidas e evite as multidões.",
  "role.staff.desc": "Oriente os torcedores e monitore suas zonas.",
  "role.command.desc": "Visão operacional completa de multidão e incidentes.",
  "lang.label": "Idioma",
  "locale.label": "Idioma",
  "locale.en": "Inglês",
  "locale.es": "Espanhol",
  "locale.fr": "Francês",
  "locale.pt": "Português",
  "home.greeting": "Bem-vindo ao Atlas Metropolitan Stadium",
  "home.subtitle": "Tudo o que você precisa para o jogo de hoje, em um só lugar.",
  "home.quickActions": "Ações rápidas",
  "home.liveStatus": "Status ao vivo",
  "home.fill": "Ocupação",
  "home.busiest": "Área mais movimentada",
  "home.longestWait": "Maior espera",
  "assistant.title": "Pergunte ao Copilot",
  "assistant.subtitle": "Baseado em informações oficiais do estádio. Ele não adivinha.",
  "assistant.placeholder": "Pergunte sobre portões, assentos, comida, transporte…",
  "assistant.send": "Enviar",
  "assistant.sources": "Fontes recuperadas",
  "assistant.noSources": "Nenhuma fonte recuperada para esta resposta.",
  "assistant.thinking": "Pensando…",
  "assistant.empty": "Faça uma pergunta para começar.",
  "assistant.suggestions": "Experimente perguntar",
  "assistant.grounded": "Resposta fundamentada",
  "wayfinding.title": "Rotas",
  "wayfinding.subtitle": "Rotas passo a passo que evitam áreas movimentadas.",
  "wayfinding.from": "De",
  "wayfinding.to": "Até",
  "wayfinding.route": "Rota",
  "wayfinding.eta": "Caminhada est.",
  "wayfinding.safeRoute": "Rota com pouca aglomeração",
  "wayfinding.congestedRoute": "Passa por uma área movimentada",
  "wayfinding.selectPrompt": "Escolha um ponto de partida e um destino para ver a rota.",
  "wayfinding.legend": "Legenda do mapa",
  "crowd.title": "Monitoramento de multidão",
  "crowd.subtitle": "Congestionamento ao vivo por todo o estádio.",
  "crowd.overall": "Ocupação total",
  "crowd.zones": "Zonas",
  "crowd.queues": "Filas e esperas",
  "crowd.wait": "Espera",
  "crowd.minutes": "min",
  "crowd.trend.rising": "Subindo",
  "crowd.trend.steady": "Estável",
  "crowd.trend.falling": "Caindo",
  "crowd.updated": "Atualizado",
  "congestion.low": "Baixa",
  "congestion.moderate": "Moderada",
  "congestion.high": "Alta",
  "congestion.critical": "Crítica",
  "common.retry": "Tentar de novo",
  "common.loading": "Carregando…",
  "common.error": "Algo deu errado.",
  "common.viewAll": "Ver tudo",
  "stub.badge": "Espaço reservado — fora da demo",
  "stub.body": "Este módulo está planejado, mas não faz parte da demo atual. A navegação e os papéis já estão prontos para adicioná-lo em seguida.",
  "more.title": "Mais modos",
  "wayfinding.planRoute": "Planejar sua rota",
  "wayfinding.samePoint": "A origem e o destino não podem ser iguais.",
  "wayfinding.directions": "Instruções passo a passo",
  "wayfinding.zoneStatus": "Status de aglomeração das zonas",
  "wayfinding.noRoute": "Não foi possível calcular uma rota entre estes pontos.",
  "wayfinding.avoidsCrowds": "A rota evita aglomerações",
  "wayfinding.throughCrowds": "A rota passa por uma área congestionada",
  "crowd.liveHeatmap": "Mapa de calor em tempo real",
  "crowd.busiestZone": "Área mais movimentada",
  "crowd.calmestZone": "Área mais tranquila (recomendada)",
  "crowd.longestQueue": "Maior tempo de espera",
  "crowd.filterAll": "Todos os pontos",
  "crowd.filterGates": "Portões de entrada",
  "crowd.filterAmenities": "Alimentação & Banheiros",
  "crowd.capacity": "capacidade",
  "crowd.roleNotice.command": "Comando ativo: recomenda-se o envio de equipes de segurança para as zonas vermelhas.",
  "crowd.roleNotice.staff": "Equipe ativa: oriente os torcedores para as áreas verdes/azuis.",
  "crowd.roleNotice.fan": "Dica: verifique o tempo de espera antes de sair do seu setor!",
  "crowd.viewMap": "Ver no mapa",
  "more.subtitle": "Explore módulos adicionais do torneio e serviços planejados.",
  "stub.transit.title": "Transporte e Monitoramento de Ônibus",
  "stub.transit.desc": "Rastreamento GPS ao vivo para ônibus do estádio, horários do metrô e tempo de espera para aplicativos.",
  "stub.accessibility.title": "Guia de Acessibilidade (PCD)",
  "stub.accessibility.desc": "Planejador de rotas acessíveis, salas de acolhimento sensorial e assistência de mobilidade.",
  "stub.vip.title": "Hub de Hospitalidade e Suítes VIP",
  "stub.vip.desc": "Passes para suítes premium, cardápios exclusivos e atendimento de concierge no dia do jogo.",
  "stub.emergency.title": "Protocolo de Evacuação de Emergência",
  "stub.emergency.desc": "Status das saídas de emergência controlado pelo comando, rotas de dispersão e instruções de segurança.",
  "stub.concessions.title": "Alimentação & Loja Express",
  "stub.concessions.desc": "Entrega de bebidas no assento, pedidos clique-e-retire nas lanchonetes e estoque de produtos.",
  "stub.incidents.title": "Achados e Perdidos / Ocorrências",
  "stub.incidents.desc": "Abertura de chamados de segurança, localizador de crianças perdidas e assistência médica.",
  "stub.action": "Pré-visualizar módulo",
  "stub.back": "Voltar aos modos",
}

export const DICTIONARIES: Record<Locale, Dictionary> = { en, es, fr, pt }
