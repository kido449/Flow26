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
  | "gateway.badge"
  | "gateway.label"
  | "gateway.title"
  | "gateway.subtitle"
  | "gateway.fan.label"
  | "gateway.fan.title"
  | "gateway.fan.desc"
  | "gateway.fan.cta"
  | "gateway.staff.label"
  | "gateway.staff.title"
  | "gateway.staff.desc"
  | "gateway.staff.cta"
  | "gateway.command.label"
  | "gateway.command.title"
  | "gateway.command.desc"
  | "gateway.command.cta"
  | "fan.mode"
  | "fan.exit"
  | "fan.scoreboard.tourney"
  | "fan.scoreboard.fulltime"
  | "fan.scoreboard.today"
  | "fan.scoreboard.penalties"
  | "fan.hero.label"
  | "fan.hero.title1"
  | "fan.hero.title2"
  | "fan.hero.desc"
  | "fan.pill.kickoff"
  | "fan.pill.fastest"
  | "fan.pill.sensory"
  | "fan.pill.trophy"
  | "fan.chat.label"
  | "fan.chat.mapBtn"
  | "wayfinding.findPlaceholder"
  | "wayfinding.liveSensor"
  | "wayfinding.activeRoute"
  | "wayfinding.navigatingTo"
  | "wayfinding.etaWalk"
  | "wayfinding.distance"
  | "wayfinding.meters"
  | "wayfinding.rapidoActive"
  | "wayfinding.rapidoDesc"
  | "wayfinding.stepOf"
  | "wayfinding.nextStep"
  | "wayfinding.exitWayfinding"
  | "wayfinding.endRoute"
  | "sustainability.title"
  | "sustainability.subtitle"
  | "sustainability.waste.title"
  | "sustainability.waste.desc"
  | "sustainability.energy.title"
  | "sustainability.energy.desc"
  | "sustainability.transport.title"
  | "sustainability.transport.desc"
  | "sustainability.aiTip"
  | "transit.title"
  | "transit.subtitle"
  | "transit.metro.title"
  | "transit.metro.desc"
  | "transit.parking.title"
  | "transit.parking.desc"
  | "transit.rideshare.title"
  | "transit.rideshare.desc"
  | "transit.aiTip"

type Dictionary = Record<TranslationKey, string>

const en: Dictionary = {
  "app.name": "Pulse (Flow26)",
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
  "gateway.badge": "FIFA World Cup 2026 • Pulse",
  "gateway.label": "[ 00 ] Multi-Role Gateway",
  "gateway.title": "Stadium Operations Portal",
  "gateway.subtitle": "Select your operational tier to access customised telemetry, wayfinding, and live matchday assistance.",
  "gateway.fan.label": "[ 01 ] Public Access",
  "gateway.fan.title": "Fan Experience",
  "gateway.fan.desc": "Ask any question. Get instant, multilingual answers, live queue heatmaps, and AI-optimised Pathfinder routing.",
  "gateway.fan.cta": "Enter Fan Portal",
  "gateway.staff.label": "[ 02 ] Field Personnel",
  "gateway.staff.title": "Staff & Volunteers",
  "gateway.staff.desc": "Real-time concourse coordination, sensory safe queue routing, and automated incident triage.",
  "gateway.staff.cta": "Enter Staff Portal",
  "gateway.command.label": "[ 03 ] Tactical Command",
  "gateway.command.title": "Command Center",
  "gateway.command.desc": "Full stadium telemetry streaming, biometric crowd heatmaps, and DEFCON level monitoring.",
  "gateway.command.cta": "Enter Command Center",
  "fan.mode": "Fan Mode",
  "fan.exit": "Exit",
  "fan.scoreboard.tourney": "2026 FIFA World Cup · Round of 16",
  "fan.scoreboard.fulltime": "Full-time",
  "fan.scoreboard.today": "Today",
  "fan.scoreboard.penalties": "Fine: 4-3",
  "fan.hero.label": "[ 01 ] Atlas Metropolitan Stadium • Matchday Fan Copilot",
  "fan.hero.title1": "Fan Copilot",
  "fan.hero.title2": "Assistant",
  "fan.hero.desc": "Ask any question. Get instant, multilingual answers, live queue heatmaps, and AI-optimised Pathfinder routing. Grounded in official FIFA World Cup 2026 stadium policies and real-time sensory corridor data.",
  "fan.pill.kickoff": "Kickoff in 2h 15m",
  "fan.pill.fastest": "Gate 4 Fastest",
  "fan.pill.sensory": "Sensory Safe Corridors",
  "fan.pill.trophy": "Live Trophy Feed",
  "fan.chat.label": "[ 02 ] AI Copilot Chat",
  "fan.chat.mapBtn": "Pathfinder AI Map",
  "wayfinding.findPlaceholder": "Find Destination (Gate 7, Section 104)...",
  "wayfinding.liveSensor": "Live Sensor Data Active",
  "wayfinding.activeRoute": "Active Copilot Route",
  "wayfinding.navigatingTo": "Navigating to",
  "wayfinding.etaWalk": "min walk",
  "wayfinding.distance": "Distance",
  "wayfinding.meters": "meters",
  "wayfinding.rapidoActive": "✓ Route Rapido Active:",
  "wayfinding.rapidoDesc": "Corridor density optimized — Step-free express route calculated from Gate 7 to Section 104.",
  "wayfinding.stepOf": "Step",
  "wayfinding.nextStep": "Next Step",
  "wayfinding.exitWayfinding": "Exit Wayfinding",
  "wayfinding.endRoute": "End Navigation",
  "sustainability.title": "Sustainability",
  "sustainability.subtitle": "Stadium environmental programs and green initiatives for FIFA World Cup 2026.",
  "sustainability.waste.title": "Zero-Waste Program",
  "sustainability.waste.desc": "Color-coded recycling bins every 30m. All food containers are compostable. Free water refill stations replace single-use bottles.",
  "sustainability.energy.title": "Renewable Energy",
  "sustainability.energy.desc": "3.2 MW rooftop solar array, rainwater harvesting for pitch irrigation, and LED lighting reducing consumption by 60%.",
  "sustainability.transport.title": "Green Transport",
  "sustainability.transport.desc": "Free matchday metro passes for ticket holders, EV charging stations, and a carbon offset calculator in the official app.",
  "sustainability.aiTip": "Ask the AI copilot about recycling, energy, or carbon offset programs.",
  "transit.title": "Transportation",
  "transit.subtitle": "Live transit information and getting to the stadium.",
  "transit.metro.title": "Metro Line 2",
  "transit.metro.desc": "Stadium station — 6 min walk from Gate B. Trains every 4 min on matchdays until 2 hours after final whistle.",
  "transit.parking.title": "Parking & Rideshare",
  "transit.parking.desc": "North, East, West lots (pre-book online). Rideshare pickup at East lot near Gate B. Accessible parking at North lot.",
  "transit.rideshare.title": "Post-Match Shuttle",
  "transit.rideshare.desc": "Dedicated shuttle to downtown transit hub from West lot near Gate D after every match.",
  "transit.aiTip": "Ask the AI copilot for personalized transit advice.",
}

const es: Dictionary = {
  "app.name": "Pulse (Flow26)",
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
  "gateway.badge": "Copa Mundial FIFA 2026 • Pulso",
  "gateway.label": "[ 00 ] Portal Multirrol",
  "gateway.title": "Portal de Operaciones del Estadio",
  "gateway.subtitle": "Selecciona tu nivel operativo para acceder a telemetría, rutas y asistencia en vivo.",
  "gateway.fan.label": "[ 01 ] Acceso Público",
  "gateway.fan.title": "Experiencia del Aficionado",
  "gateway.fan.desc": "Haz cualquier pregunta. Obtén respuestas multilingües al instante, mapas de calor y rutas asistidas por IA.",
  "gateway.fan.cta": "Entrar al Portal de Aficionados",
  "gateway.staff.label": "[ 02 ] Personal de Campo",
  "gateway.staff.title": "Personal y Voluntarios",
  "gateway.staff.desc": "Coordinación en tiempo real, rutas accesibles sensoriales y triaje automatizado de incidentes.",
  "gateway.staff.cta": "Entrar al Portal de Personal",
  "gateway.command.label": "[ 03 ] Comando Táctico",
  "gateway.command.title": "Centro de Mando",
  "gateway.command.desc": "Transmisión de telemetría completa, mapas biométricos de multitudes y monitoreo de niveles DEFCON.",
  "gateway.command.cta": "Entrar al Centro de Mando",
  "fan.mode": "Modo Aficionado",
  "fan.exit": "Salir",
  "fan.scoreboard.tourney": "Copa Mundial FIFA 2026 · Octavos de final",
  "fan.scoreboard.fulltime": "Finalizado",
  "fan.scoreboard.today": "Hoy",
  "fan.scoreboard.penalties": "Penales: 4-3",
  "fan.hero.label": "[ 01 ] Atlas Metropolitan Stadium • Copiloto del Aficionado",
  "fan.hero.title1": "Copiloto para Aficionados",
  "fan.hero.title2": "Asistente",
  "fan.hero.desc": "Haz cualquier pregunta. Obtén respuestas instantáneas en varios idiomas, mapas de calor de colas y rutas optimizadas por IA. Basado en las políticas oficiales del estadio para el Mundial 2026.",
  "fan.pill.kickoff": "Inicio en 2h 15m",
  "fan.pill.fastest": "Puerta 4 Más rápida",
  "fan.pill.sensory": "Pasillos Sensorialmente Seguros",
  "fan.pill.trophy": "Transmisión en Vivo del Trofeo",
  "fan.chat.label": "[ 02 ] Chat con Copiloto IA",
  "fan.chat.mapBtn": "Mapa Inteligente de Rutas",
  "wayfinding.findPlaceholder": "Buscar Destino (Puerta 7, Sección 104)...",
  "wayfinding.liveSensor": "Datos de Sensor en Vivo Activos",
  "wayfinding.activeRoute": "Ruta Activa del Copiloto",
  "wayfinding.navigatingTo": "Navegando a",
  "wayfinding.etaWalk": "min a pie",
  "wayfinding.distance": "Distancia",
  "wayfinding.meters": "metros",
  "wayfinding.rapidoActive": "✓ Ruta Rápida Activa:",
  "wayfinding.rapidoDesc": "Densidad de pasillo optimizada — Ruta exprés sin escalones calculada desde la Puerta 7 hasta la Sección 104.",
  "wayfinding.stepOf": "Paso",
  "wayfinding.nextStep": "Siguiente Paso",
  "wayfinding.exitWayfinding": "Salir de Rutas",
  "wayfinding.endRoute": "Finalizar Navegación",
  "sustainability.title": "Sostenibilidad",
  "sustainability.subtitle": "Programas ambientales del estadio e iniciativas ecológicas para la Copa del Mundo FIFA 2026.",
  "sustainability.waste.title": "Programa Cero Residuos",
  "sustainability.waste.desc": "Contenedores de reciclaje codificados por colores cada 30 m. Envases compostables. Estaciones de recarga de agua gratuitas.",
  "sustainability.energy.title": "Energía Renovable",
  "sustainability.energy.desc": "Panel solar de 3,2 MW, recolección de agua de lluvia y luminarias LED con 60% menos consumo.",
  "sustainability.transport.title": "Transporte Ecológico",
  "sustainability.transport.desc": "Pases de metro gratuitos en días de partido, estaciones de carga para vehículos eléctricos y calculadora de huella de carbono.",
  "sustainability.aiTip": "Pregunta al copiloto IA sobre reciclaje, energía o programas de compensación de carbono.",
  "transit.title": "Transporte",
  "transit.subtitle": "Información de tránsito en vivo y cómo llegar al estadio.",
  "transit.metro.title": "Metro Línea 2",
  "transit.metro.desc": "Estación del estadio — 6 min a pie desde la Puerta B. Trenes cada 4 min en días de partido.",
  "transit.parking.title": "Aparcamiento y Transporte",
  "transit.parking.desc": "Lotes Norte, Este, Oeste (reservar online). Parada de transporte compartido en el lote Este.",
  "transit.rideshare.title": "Autobús Post-Partido",
  "transit.rideshare.desc": "Autobús dedicado al centro de tránsito desde el lote Oeste cerca de la Puerta D.",
  "transit.aiTip": "Pregunta al copiloto IA para consejos de transporte personalizados.",
}

const fr: Dictionary = {
  "app.name": "Pulse (Flow26)",
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
  "gateway.badge": "Coupe du Monde FIFA 2026 • Pulse",
  "gateway.label": "[ 00 ] Portail Multi-Rôle",
  "gateway.title": "Portail d'Opérations du Stade",
  "gateway.subtitle": "Sélectionnez votre niveau opérationnel pour accéder à la télémétrie et aux itinéraires en direct.",
  "gateway.fan.label": "[ 01 ] Accès Public",
  "gateway.fan.title": "Expérience Supporter",
  "gateway.fan.desc": "Posez vos questions. Obtenez des réponses multilingues instantanées, cartes de fréquentation et itinéraires optimisés par l'IA.",
  "gateway.fan.cta": "Accéder au Portail Supporter",
  "gateway.staff.label": "[ 02 ] Personnel de Terrain",
  "gateway.staff.title": "Personnel & Bénévoles",
  "gateway.staff.desc": "Coordination en temps réel, itinéraires sensoriels adaptés et tri automatisé des incidents.",
  "gateway.staff.cta": "Accéder au Portail Personnel",
  "gateway.command.label": "[ 03 ] Commandement Tactique",
  "gateway.command.title": "Centre de Commandement",
  "gateway.command.desc": "Flux de télémétrie du stade, cartes thermiques biométriques et suivi des niveaux DEFCON.",
  "gateway.command.cta": "Accéder au Centre de Commandement",
  "fan.mode": "Mode Supporter",
  "fan.exit": "Quitter",
  "fan.scoreboard.tourney": "Coupe du Monde FIFA 2026 · Huitièmes de finale",
  "fan.scoreboard.fulltime": "Terminé",
  "fan.scoreboard.today": "Aujourd'hui",
  "fan.scoreboard.penalties": "Tirs au but : 4-3",
  "fan.hero.label": "[ 01 ] Atlas Metropolitan Stadium • Copilote Supporter",
  "fan.hero.title1": "Copiloto Supporter",
  "fan.hero.title2": "Assistant",
  "fan.hero.desc": "Posez vos questions. Obtenez des réponses multilingues instantanées, les cartes d'affluence des files d'attente et des itinéraires Pathfinder optimisés par l'IA. Fondé sur les politiques officielles de la Coupe du Monde 2026.",
  "fan.pill.kickoff": "Coup d'envoi dans 2h 15m",
  "fan.pill.fastest": "Porte 4 Plus rapide",
  "fan.pill.sensory": "Couloirs sensoriels apaisés",
  "fan.pill.trophy": "Flux en direct du Trophée",
  "fan.chat.label": "[ 02 ] Chat IA Copilote",
  "fan.chat.mapBtn": "Carte Pathfinder IA",
  "wayfinding.findPlaceholder": "Rechercher une destination (Porte 7, Section 104)...",
  "wayfinding.liveSensor": "Capteurs en direct actifs",
  "wayfinding.activeRoute": "Itinéraire Copilote Actif",
  "wayfinding.navigatingTo": "Navigation vers",
  "wayfinding.etaWalk": "min à pied",
  "wayfinding.distance": "Distance",
  "wayfinding.meters": "mètres",
  "wayfinding.rapidoActive": "✓ Itinéraire Rapide Actif :",
  "wayfinding.rapidoDesc": "Densité des couloirs optimisée — Itinéraire express sans marche calculé de la Porte 7 à la Section 104.",
  "wayfinding.stepOf": "Étape",
  "wayfinding.nextStep": "Étape Suivante",
  "wayfinding.exitWayfinding": "Quitter l'itinéraire",
  "wayfinding.endRoute": "Terminer la navigation",
  "sustainability.title": "Durabilité",
  "sustainability.subtitle": "Programmes environnementaux du stade et initiatives vertes pour la Coupe du Monde FIFA 2026.",
  "sustainability.waste.title": "Programme Zéro Déchet",
  "sustainability.waste.desc": "Poubelles de tri tous les 30 m. Emballages compostables. Fontaines d'eau gratuites pour remplacer les bouteilles jetables.",
  "sustainability.energy.title": "Énergie Renouvelable",
  "sustainability.energy.desc": "Panneaux solaires de 3,2 MW, récupération d'eau de pluie et éclairage LED réduisant la consommation de 60 %.",
  "sustainability.transport.title": "Transport Écologique",
  "sustainability.transport.desc": "Pass métro gratuits les jours de match, bornes de recharge pour véhicules électriques et calculateur d'empreinte carbone.",
  "sustainability.aiTip": "Demandez au copilote IA des informations sur le recyclage, l'énergie ou la compensation carbone.",
  "transit.title": "Transport",
  "transit.subtitle": "Informations de transit en direct et comment accéder au stade.",
  "transit.metro.title": "Métro Ligne 2",
  "transit.metro.desc": "Station du stade — 6 min à pied du Portail B. Trains toutes les 4 min les jours de match.",
  "transit.parking.title": "Stationnement et Covoiturage",
  "transit.parking.desc": "Parkings Nord, Est, Ouest (réservation en ligne). Dépose-minute au parking Est près du Portail B.",
  "transit.rideshare.title": "Navette Post-Match",
  "transit.rideshare.desc": "Navette dédiée vers le hub de transit depuis le parking Ouest près du Portail D.",
  "transit.aiTip": "Demandez au copilote IA des conseils de transport personnalisés.",
}

const pt: Dictionary = {
  "app.name": "Pulse (Flow26)",
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
  "gateway.badge": "Copa do Mundo FIFA 2026 • Pulso",
  "gateway.label": "[ 00 ] Portal Multiprofissional",
  "gateway.title": "Portal de Operações do Estádio",
  "gateway.subtitle": "Selecione seu nível operacional para acessar telemetria, rotas e assistência em tempo real.",
  "gateway.fan.label": "[ 01 ] Acesso Público",
  "gateway.fan.title": "Experiência do Torcedor",
  "gateway.fan.desc": "Tire suas dúvidas. Obtenha respostas instantâneas, mapas de calor e rotas otimizadas por IA.",
  "gateway.fan.cta": "Entrar no Portal do Torcedor",
  "gateway.staff.label": "[ 02 ] Equipe de Campo",
  "gateway.staff.title": "Equipe & Voluntários",
  "gateway.staff.desc": "Coordenação em tempo real, rotas sensoriais acessíveis e triagem automatizada de incidentes.",
  "gateway.staff.cta": "Entrar no Portal da Equipe",
  "gateway.command.label": "[ 03 ] Comando Tático",
  "gateway.command.title": "Centro de Comando",
  "gateway.command.desc": "Transmissão de telemetria completa, mapas biométricos de multidão e monitoramento DEFCON.",
  "gateway.command.cta": "Entrar no Centro de Comando",
  "fan.mode": "Modo Torcedor",
  "fan.exit": "Sair",
  "fan.scoreboard.tourney": "Copa do Mundo FIFA 2026 · Oitavas de final",
  "fan.scoreboard.fulltime": "Encerrado",
  "fan.scoreboard.today": "Hoje",
  "fan.scoreboard.penalties": "Pênaltis: 4-3",
  "fan.hero.label": "[ 01 ] Atlas Metropolitan Stadium • Copiloto do Torcedor",
  "fan.hero.title1": "Copiloto do Torcedor",
  "fan.hero.title2": "Assistente",
  "fan.hero.desc": "Faça qualquer pergunta. Obtenha respostas instantâneas multilíngues, mapas de calor ao vivo e rotas otimizadas por IA. Baseado nas políticas oficiais da Copa do Mundo FIFA 2026.",
  "fan.pill.kickoff": "Início em 2h 15m",
  "fan.pill.fastest": "Portão 4 Mais rápido",
  "fan.pill.sensory": "Corredores Sensoriais Seguros",
  "fan.pill.trophy": "Transmissão ao Vivo do Troféu",
  "fan.chat.label": "[ 02 ] Chat do Copiloto IA",
  "fan.chat.mapBtn": "Mapa Pathfinder IA",
  "wayfinding.findPlaceholder": "Buscar Destino (Portão 7, Setor 104)...",
  "wayfinding.liveSensor": "Sensores ao Vivo Ativos",
  "wayfinding.activeRoute": "Rota do Copiloto Ativa",
  "wayfinding.navigatingTo": "Navegando para",
  "wayfinding.etaWalk": "min a pé",
  "wayfinding.distance": "Distância",
  "wayfinding.meters": "metros",
  "wayfinding.rapidoActive": "✓ Rota Rápida Ativa:",
  "wayfinding.rapidoDesc": "Densidade otimizada — Rota expressa calculada do Portão 7 ao Setor 104.",
  "wayfinding.stepOf": "Passo",
  "wayfinding.nextStep": "Próximo Passo",
  "wayfinding.exitWayfinding": "Sair das Rotas",
  "wayfinding.endRoute": "Encerrar Navegação",
  "sustainability.title": "Sustentabilidade",
  "sustainability.subtitle": "Programas ambientais do estádio e iniciativas verdes para a Copa do Mundo FIFA 2026.",
  "sustainability.waste.title": "Programa Lixo Zero",
  "sustainability.waste.desc": "Lixeiras de reciclagem a cada 30 m. Embalagens compostáveis. Estações de recarga de água gratuitas.",
  "sustainability.energy.title": "Energia Renovável",
  "sustainability.energy.desc": "Painéis solares de 3,2 MW, captação de água da chuva e iluminação LED com 60% menos consumo.",
  "sustainability.transport.title": "Transporte Sustentável",
  "sustainability.transport.desc": "Passes de metrô gratuitos em dias de jogo, estações de recarga para veículos elétricos e calculadora de pegada de carbono.",
  "sustainability.aiTip": "Pergunte ao copiloto IA sobre reciclagem, energia ou programas de compensação de carbono.",
  "transit.title": "Transporte",
  "transit.subtitle": "Informações de trânsito ao vivo e como chegar ao estádio.",
  "transit.metro.title": "Metrô Linha 2",
  "transit.metro.desc": "Estação do estádio — 6 min a pé do Portão B. Trens a cada 4 min em dias de jogo.",
  "transit.parking.title": "Estacionamento e Transporte",
  "transit.parking.desc": "Estacionamentos Norte, Leste, Oeste (reservar online). Embarque/desembarque no estacionamento Leste.",
  "transit.rideshare.title": "Ônibus Pós-Jogo",
  "transit.rideshare.desc": "Ônibus dedicado ao hub de trânsito do centro desde o estacionamento Oeste perto do Portão D.",
  "transit.aiTip": "Pergunte ao copiloto IA para dicas de transporte personalizadas.",
}

export const DICTIONARIES: Record<Locale, Dictionary> = { en, es, fr, pt }
