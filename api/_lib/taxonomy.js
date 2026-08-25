// Ported from Meridian's src/components/Meridian.jsx (same author, same
// Polite Robot tool suite). This is the canonical vocabulary that defines
// what counts as a "method," a "tool," and a "responsibility theme" for each
// discipline. Tailor's market aggregates must use the SAME classification
// Meridian itself uses, or "topMethods" here would silently disagree with
// what Meridian's own dashboard shows for the same corpus.
//
// Discipline keys used throughout Tailor: uxr | design | pm.
// Meridian's internal discipline codes are uxr | design | product — mapped
// via DISCIPLINES below.

const DISCIPLINES = {
  uxr: { storageKey: "uxr-jobs-analysis-v3", internal: "uxr", label: "UX Research" },
  design: { storageKey: "design-jobs-analysis-v1", internal: "design", label: "UX Design" },
  pm: { storageKey: "pm-jobs-analysis-v1", internal: "product", label: "Product Management" },
};

// ─── METHOD TAXONOMY (verbatim from Meridian.jsx ~L2800-3104) ───────────────
const METHOD_TAXONOMY_METHODS = [
  { name: "Interviews", variants: ["interview", "interviews", "user interviews", "in-depth interviews", "1:1 interviews", "stakeholder interviews", "customer interviews", "semi-structured interviews", "user interviewing", "interviewing"] },
  { name: "Surveys", variants: ["survey", "surveys", "questionnaire", "questionnaires", "intercept surveys", "online surveys", "survey design", "survey research"] },
  { name: "Contextual Inquiry", variants: ["contextual inquiry", "contextual interviews", "contextual research", "contextual inquiries"] },
  { name: "Field Studies", variants: ["field study", "field studies", "field research", "site visits", "in-context research", "ethnographic field studies", "field visits", "field visit"] },
  { name: "Ethnography", variants: ["ethnography", "design ethnography", "ethnographic research", "ethnographic studies", "ethnographic methods", "ethnographic fieldwork", "ethnographies"] },
  { name: "Diary Studies", variants: ["diary study", "diary studies", "longitudinal diary"] },
  { name: "Experience Sampling", variants: ["experience sampling", "experience sampling method", "esm"] },
  { name: "Focus Groups", variants: ["focus group", "focus groups"] },
  { name: "Participant Observation", variants: ["participant observation"] },
  { name: "Observation", variants: ["observation", "observational research", "fly-on-the-wall", "fly on the wall", "in-person observation"] },
  { name: "Shadowing", variants: ["shadowing", "user shadowing"] },
  { name: "Cultural Probes", variants: ["cultural probes", "design probes", "probes"] },
  { name: "Photo Studies", variants: ["photo study", "photo studies", "photo elicitation", "photo diaries"] },
  { name: "Directed Storytelling", variants: ["directed storytelling"] },
  { name: "Critical Incident Technique", variants: ["critical incident technique", "critical incidents"] },
  { name: "Laddering", variants: ["laddering", "laddering interviews"] },
  { name: "Triading", variants: ["triading"] },
  { name: "Personal Inventories", variants: ["personal inventories", "personal inventory"] },
  { name: "Touchstone Tours", variants: ["touchstone tour", "touchstone tours"] },
  { name: "Card Sorting", variants: ["card sort", "card sorting", "open card sort", "closed card sort", "hybrid card sort"] },
  { name: "Participatory Design", variants: ["participatory design", "co-design", "codesign", "co-creation sessions", "generative sessions", "participatory research", "participatory action research", "par"] },
  { name: "Behavioral Mapping", variants: ["behavioral mapping", "behavioural mapping"] },
  { name: "Eyetracking", variants: ["eyetracking", "eye tracking", "eye-tracking", "gaze tracking"] },
  { name: "Behavioral Metrics", variants: ["behavioral metrics", "behavioural metrics", "behavioral metrics analysis", "usage metrics", "usage analytics", "product usage metrics", "web analytics", "analytics", "product analytics", "behavioral analytics", "digital analytics"] },
  { name: "Site Search Analytics", variants: ["site search analytics", "search log analysis"] },
  { name: "Clickstream Analysis", variants: ["clickstream analysis", "clickstream analytics", "log analysis", "log file analysis", "telemetry analysis", "logs analysis", "behavioral logs analysis"] },
  { name: "Customer Feedback Analysis", variants: ["customer feedback", "feedback analysis", "voice of customer", "voc", "support ticket analysis", "app review analysis"] },
  { name: "True Intent Studies", variants: ["true intent study", "true intent studies", "true-intent"] },
  { name: "Longitudinal Studies", variants: ["longitudinal study", "longitudinal studies", "longitudinal research"] },
  { name: "Time-Aware Research", variants: ["time-aware research", "time aware research"] },
  { name: "Unobtrusive Measures", variants: ["unobtrusive measures"] },
  { name: "Case Studies", variants: ["case study", "case studies"] },
  { name: "Secondary Research", variants: ["secondary research", "desk research", "literature review", "literature reviews", "competitive analysis", "competitive research", "market research review"] },
  { name: "Artifact Analysis", variants: ["artifact analysis", "artefact analysis"] },
  { name: "Semantic Differential", variants: ["semantic differential"] },
  { name: "Affinity Diagramming", variants: ["affinity diagram", "affinity diagramming", "affinity mapping", "kj technique", "kj method"] },
  { name: "Thematic Analysis", variants: ["thematic analysis", "thematic networks", "thematic coding", "qualitative coding"] },
  { name: "Content Analysis", variants: ["content analysis"] },
  { name: "Journey Mapping", variants: ["journey map", "journey maps", "journey mapping", "user journey map", "user journey mapping", "customer journey map", "customer journey mapping", "experience map", "experience mapping", "journey maps creation"] },
  { name: "Persona Development", variants: ["persona", "personas", "persona development", "persona creation", "proto-personas", "user personas"] },
  { name: "Empathy Mapping", variants: ["empathy map", "empathy maps", "empathy mapping"] },
  { name: "Service Blueprinting", variants: ["service blueprint", "service blueprints", "service blueprinting"] },
  { name: "Mental Model Diagramming", variants: ["mental model", "mental models", "mental model diagrams", "mental modeling", "mental model diagramming"] },
  { name: "Jobs to Be Done Analysis", variants: ["jobs to be done", "jtbd", "jobs-to-be-done"] },
  { name: "Task Analysis", variants: ["task analysis", "hierarchical task analysis", "hta"] },
  { name: "Cognitive Mapping", variants: ["cognitive mapping", "cognitive maps"] },
  { name: "Elito Method", variants: ["elito", "elito method"] },
  { name: "Stakeholder Mapping", variants: ["stakeholder map", "stakeholder maps", "stakeholder mapping"] },
  { name: "Kano Analysis", variants: ["kano analysis", "kano model", "kano"] },
  { name: "Top Task Analysis", variants: ["top task analysis", "top tasks", "task prioritization research"] },
  { name: "Sentiment Analysis", variants: ["sentiment analysis"] },
  { name: "AEIOU", variants: ["aeiou", "aeiou framework"] },
  { name: "Usability Testing", variants: ["usability test", "usability testing", "usability studies", "usability study", "moderated usability testing", "lab-based user testing", "lab usability testing", "user testing", "qualitative usability testing", "lab studies", "usability-lab studies", "lab study", "usability lab studies", "usability", "prototype testing", "prototype evaluation"] },
  { name: "Unmoderated Testing", variants: ["unmoderated testing", "unmoderated usability testing", "automated remote research", "unmoderated remote testing", "remote unmoderated", "unmoderated research studies", "unmoderated studies", "unmoderated research"] },
  { name: "Remote Moderated Testing", variants: ["remote moderated testing", "remote moderated research", "remote usability testing", "remote testing"] },
  { name: "Usability Benchmarking", variants: ["usability benchmarking", "benchmark usability testing", "benchmarking studies", "ux benchmarking", "benchmarking", "benchmark studies", "benchmark study", "benchmark research"] },
  { name: "RITE", variants: ["rite", "rapid iterative testing", "rapid iterative testing and evaluation"] },
  { name: "Guerrilla Testing", variants: ["guerrilla testing", "guerilla testing", "hallway testing", "intercept testing"] },
  { name: "Competitive Testing", variants: ["competitive testing", "comparative usability testing", "competitive usability testing"] },
  { name: "Concept Testing", variants: ["concept test", "concept testing", "concept evaluation", "concept validation"] },
  { name: "Desirability Testing", variants: ["desirability testing", "desirability studies", "desirability study", "visual preference testing"] },
  { name: "Preference Testing", variants: ["preference test", "preference testing"] },
  { name: "Tree Testing", variants: ["tree test", "tree testing", "reverse card sort", "treejack"] },
  { name: "First-Click Testing", variants: ["first click testing", "first-click testing", "first click test"] },
  { name: "Five-Second Testing", variants: ["five second test", "5 second test", "five-second testing", "5-second test"] },
  { name: "A/B Testing", variants: ["a/b test", "a/b testing", "ab testing", "split testing"] },
  { name: "Multivariate Testing", variants: ["multivariate testing", "mvt"] },
  { name: "Experiments", variants: ["experiment", "experiments", "controlled experiments", "experimentation"] },
  { name: "Think-Aloud Protocol", variants: ["think-aloud", "think aloud", "think-aloud protocol", "concurrent think aloud", "retrospective think aloud"] },
  { name: "Wizard of Oz", variants: ["wizard of oz", "woz"] },
  { name: "Experience Prototyping", variants: ["experience prototyping"] },
  { name: "Stakeholder Walkthrough", variants: ["stakeholder walkthrough"] },
  { name: "Heuristic Evaluation", variants: ["heuristic evaluation", "heuristic review", "expert review", "expert evaluation", "ux audit", "usability audit"] },
  { name: "Cognitive Walkthrough", variants: ["cognitive walkthrough", "cognitive walkthroughs"] },
  { name: "PURE", variants: ["pure", "practical usability rating by experts", "pure method", "pure evaluation"] },
  { name: "Keystroke Level Modeling", variants: ["klm", "keystroke level model", "keystroke-level modeling", "keystroke level modeling", "goms"] },
  { name: "Ergonomic Analysis", variants: ["ergonomic analysis", "ergonomics assessment"] },
  { name: "Accessibility Evaluation", variants: ["accessibility evaluation", "accessibility audit", "accessibility testing", "wcag audit", "a11y audit", "a11y testing"] },
  { name: "Content Inventory & Audit", variants: ["content inventory", "content audit", "content inventory and audit"] },
  { name: "Customer Experience Audit", variants: ["customer experience audit", "cx audit", "experience audit"] },
];

const DESIGN_METHOD_TAXONOMY_METHODS = [
  { name: "User Flows", variants: ["user flow", "user flows", "task flow", "task flows", "flow diagram", "flow diagrams", "wireflow", "wireflows", "flow mapping", "screen flow", "screen flows"] },
  { name: "Information Architecture", variants: ["information architecture", "ia", "site map", "sitemap", "sitemaps", "site maps", "content architecture", "navigation design", "taxonomy design", "nav design", "menu structure"] },
  { name: "Competitive Design Analysis", variants: ["competitive analysis", "competitive research", "competitive audit", "competitive design", "competitor analysis", "design audit", "ux audit", "benchmarking", "competitive teardown", "teardown"] },
  { name: "Moodboards", variants: ["moodboard", "moodboards", "mood board", "mood boards", "inspiration board", "visual exploration"] },
  { name: "Style Tiles", variants: ["style tile", "style tiles", "style exploration", "visual direction", "art direction"] },
  { name: "Storyboarding", variants: ["storyboard", "storyboards", "storyboarding", "scenario mapping", "scenario design", "narrative design"] },
  { name: "Content Strategy", variants: ["content strategy", "content planning", "content model", "content modeling", "content modelling", "content audit", "content inventory"] },
  { name: "Design Research", variants: ["design research", "user research", "contextual inquiry", "contextual interviews", "field study", "field studies", "field research", "ethnography", "ethnographic", "ethnographic research", "observation", "observational research"] },
  { name: "Interviews", variants: ["interview", "interviews", "user interviews", "stakeholder interviews", "customer interviews", "in-depth interviews", "1:1 interviews"] },
  { name: "Surveys", variants: ["survey", "surveys", "questionnaire", "questionnaires", "survey design"] },
  { name: "Design Discovery", variants: ["design discovery", "discovery phase", "discovery sprint", "problem framing", "problem definition", "opportunity framing", "framing workshop"] },
  { name: "Diary Studies", variants: ["diary study", "diary studies", "longitudinal study", "longitudinal studies"] },
  { name: "Stakeholder Workshops", variants: ["stakeholder workshop", "stakeholder workshops", "alignment workshop", "workshop facilitation", "facilitation", "workshops", "kickoff workshop", "stakeholder alignment"] },
  { name: "Jobs to Be Done", variants: ["jobs to be done", "jobs-to-be-done", "jtbd", "job stories"] },
  { name: "Visual and Trend Research", variants: ["visual research", "trend research", "trend analysis", "design inspiration", "visual benchmarking", "visual audit", "market visual scan"] },
  { name: "Analytics Review", variants: ["analytics review", "product analytics", "usage analytics", "behavioral data review", "heatmap analysis", "heatmaps", "session replay", "funnel review"] },
  { name: "Wireframing", variants: ["wireframe", "wireframes", "wireframing", "low-fidelity", "low fidelity", "lo-fi", "lofi", "wire frame", "paper wireframes", "greybox", "grey box"] },
  { name: "Prototyping", variants: ["prototype", "prototypes", "prototyping", "rapid prototyping", "high-fidelity prototype", "high fidelity prototype", "hi-fi prototype", "hifi prototype", "interactive prototype", "clickable prototype", "functional prototype", "prototype development", "figma prototyping"] },
  { name: "Visual Design", variants: ["visual design", "graphic design", "pixel-perfect", "visual language", "visual craft", "visual polish", "aesthetics", "visual hierarchy"] },
  { name: "Interaction Design", variants: ["interaction design", "ixd", "micro-interaction", "micro-interactions", "microinteraction", "microinteractions", "interaction pattern", "interaction patterns", "gesture design", "affordances"] },
  { name: "Motion Design", variants: ["motion design", "animation", "animations", "motion graphics", "animated prototype", "transition design", "motion study", "lottie", "motion prototyping", "interaction animation"] },
  { name: "Design Systems", variants: ["design system", "design systems", "component library", "component libraries", "pattern library", "design language", "design language system", "systematized design"] },
  { name: "Design Tokens", variants: ["design token", "design tokens", "token library", "semantic tokens", "theme tokens", "token architecture"] },
  { name: "Component Design", variants: ["component design", "ui components", "component architecture", "atomic design", "pattern design", "reusable components", "component specs"] },
  { name: "Responsive Design", variants: ["responsive design", "responsive", "responsive layouts", "mobile-first", "mobile first", "adaptive design", "cross-platform", "multi-platform", "cross-device", "breakpoint design"] },
  { name: "Mobile and Platform Design", variants: ["mobile app design", "app design", "ios design", "android design", "native app design", "platform design", "native design", "ios and android design", "human interface guidelines", "material design"] },
  { name: "Typography", variants: ["typography", "typographic", "typographical", "type system", "font selection", "type scale", "typesetting"] },
  { name: "Color Theory", variants: ["color theory", "colour theory", "color palette", "colour palette", "color system", "colour system", "color design", "palette design"] },
  { name: "Layout and Grid Systems", variants: ["grid system", "grid systems", "layout design", "layout", "layouts", "composition", "baseline grid", "spacing system", "whitespace", "white space"] },
  { name: "Iconography", variants: ["iconography", "icon design", "icon set", "icon system", "icon library", "icons"] },
  { name: "Illustration", variants: ["illustration", "illustrations", "illustrative", "custom illustration", "spot illustration"] },
  { name: "Brand and Identity Design", variants: ["brand design", "branding", "brand identity", "visual identity", "identity design", "identity system", "logo design", "brand system", "brand guidelines", "style guide", "style guides", "brand expression"] },
  { name: "Dark Mode and Theming", variants: ["dark mode", "light mode", "theming", "theme design", "dark theme", "multi-theme", "white labeling", "white-label design"] },
  { name: "Content Design and UX Writing", variants: ["content design", "ux writing", "ux copy", "microcopy", "micro-copy", "copywriting", "product copy", "voice and tone", "ux content", "content designer"] },
  { name: "Data Visualization Design", variants: ["data visualization design", "data visualisation design", "data viz design", "dataviz design", "information design", "chart design", "infographic design", "information visualization", "dashboard design"] },
  { name: "Localization Design", variants: ["localization design", "localisation design", "internationalization", "internationalisation", "i18n", "l10n", "rtl design", "right-to-left design", "multilingual design"] },
  { name: "Inclusive Design", variants: ["inclusive design", "accessible design", "universal design", "wcag", "wcag 2.1", "wcag compliance", "section 508", "aria", "screen reader support", "color contrast", "colour contrast", "assistive technology"] },
  { name: "Journey Mapping", variants: ["journey map", "journey maps", "journey mapping", "user journey", "user journeys", "customer journey", "experience map", "experience mapping"] },
  { name: "Persona Development", variants: ["persona", "personas", "persona development", "user persona", "user personas", "proto-persona", "proto-personas"] },
  { name: "Empathy Mapping", variants: ["empathy map", "empathy maps", "empathy mapping"] },
  { name: "Service Design", variants: ["service design", "service blueprint", "service blueprints", "service blueprinting", "service map", "service mapping", "ecosystem map"] },
  { name: "Sketching and Ideation", variants: ["sketches", "sketching", "ideation", "ideation session", "ideation sessions", "brainstorming", "brainstorm", "crazy 8s", "crazy eights", "concept sketching", "thumbnail sketches", "divergent thinking"] },
  { name: "Concept Design", variants: ["concept design", "design exploration", "design explorations", "design concepts", "concepting", "conceptual design", "blue sky design"] },
  { name: "Design Sprints", variants: ["design sprint", "design sprints", "google design sprint", "sprint", "sprint zero"] },
  { name: "Design Thinking Workshops", variants: ["design thinking", "design workshop", "design workshops", "co-design", "codesign", "co-creation", "co-creation session", "participatory design", "double diamond"] },
  { name: "Design Specs and Annotation", variants: ["design spec", "design specs", "design specification", "design specifications", "spec annotation", "annotation", "annotations", "redline", "redlines", "redlining"] },
  { name: "Front-End Collaboration", variants: ["front-end collaboration", "frontend collaboration", "design engineering", "ui implementation", "ui engineering", "developer collaboration", "engineering collaboration", "design-to-code", "design to code", "implementation support"] },
  { name: "Conversational Design", variants: ["conversational design", "conversation design", "voice ui", "vui", "voice design", "chatbot design", "dialogue design"] },
  { name: "AI Interface Design", variants: ["ai interface design", "ai ux", "ai-native design", "ai native design", "generative ui", "prompt design", "llm interface design", "ai-enabled design", "ai product design", "agentic ux"] },
  { name: "Design Vision and Principles", variants: ["design principle", "design principles", "ux principles", "guiding principles", "design vision", "north star design", "design values", "product vision design"] },
  { name: "Form and Input Design", variants: ["form design", "input design", "form patterns", "form validation design", "data entry design"] },
  { name: "Error and Empty State Design", variants: ["empty state", "empty states", "empty state design", "error state", "error states", "error messaging", "edge case design", "edge cases"] },
  { name: "Onboarding Design", variants: ["onboarding design", "onboarding flow", "onboarding flows", "first-run experience", "activation design"] },
  { name: "Usability Testing", variants: ["usability test", "usability testing", "usability study", "usability studies", "user testing", "moderated testing", "moderated usability testing", "prototype testing", "usability"] },
  { name: "Unmoderated Testing", variants: ["unmoderated testing", "unmoderated usability", "remote unmoderated", "unmoderated study", "unmoderated research", "remote testing"] },
  { name: "Guerrilla Testing", variants: ["guerrilla testing", "guerilla testing", "hallway testing", "intercept testing"] },
  { name: "Usability Benchmarking", variants: ["usability benchmarking", "ux benchmarking", "benchmark study", "benchmark studies", "benchmark testing"] },
  { name: "Design Critique", variants: ["design critique", "design critiques", "design review", "design reviews", "design crit", "crit session", "crit sessions", "design feedback", "peer review"] },
  { name: "Heuristic Evaluation", variants: ["heuristic evaluation", "heuristic review", "expert review", "ux review", "usability review", "design heuristic", "design heuristics", "heuristic analysis"] },
  { name: "Cognitive Walkthrough", variants: ["cognitive walkthrough", "cognitive walkthroughs", "walkthrough", "walkthroughs"] },
  { name: "Accessibility Audit", variants: ["accessibility audit", "accessibility evaluation", "accessibility testing", "wcag audit", "a11y audit", "a11y testing", "accessibility review", "accessibility", "a11y"] },
  { name: "Design QA", variants: ["design qa", "pixel inspection", "pixel perfect", "visual qa", "qa review", "design quality assurance", "implementation review", "build review", "design verification"] },
  { name: "A/B Testing", variants: ["a/b test", "a/b testing", "ab test", "ab testing", "split testing", "multivariate testing", "experimentation", "experiments"] },
  { name: "Card Sorting", variants: ["card sort", "card sorting", "open card sort", "closed card sort", "hybrid card sort"] },
  { name: "Tree Testing", variants: ["tree test", "tree testing", "reverse card sort", "treejack"] },
  { name: "Preference Testing", variants: ["preference test", "preference testing", "desirability testing", "five second test", "5 second test", "five-second test", "first click testing", "first-click testing", "first click test"] },
  { name: "Rapid Iterative Testing", variants: ["rite", "rapid iterative testing", "iterative testing", "rapid testing"] },
  { name: "Concept Testing", variants: ["concept test", "concept testing", "concept validation", "concept evaluation", "design validation"] },
];

const PM_METHOD_TAXONOMY_METHODS = [
  { name: "Customer Interviews", variants: ["customer interview", "customer interviews", "user interviews", "stakeholder interviews", "customer discovery", "voice of customer", "voc"] },
  { name: "Market Research", variants: ["market research", "market analysis", "market sizing", "tam sam som", "market opportunity", "market landscape", "industry analysis"] },
  { name: "Competitive Analysis", variants: ["competitive analysis", "competitive research", "competitive intelligence", "competitor analysis", "competitive landscape", "competitive audit", "benchmarking"] },
  { name: "Win/Loss Analysis", variants: ["win/loss", "win loss", "win-loss", "win/loss analysis", "deal analysis", "churn analysis"] },
  { name: "User Analytics Review", variants: ["analytics review", "data review", "usage analysis", "behavioral analytics", "product analytics", "funnel analysis", "cohort analysis"] },
  { name: "Surveys", variants: ["survey", "surveys", "questionnaire", "nps", "csat", "customer satisfaction"] },
  { name: "Feature Requests Analysis", variants: ["feature request", "feature requests", "feedback analysis", "customer feedback", "support ticket analysis", "feature voting"] },
  { name: "Jobs to Be Done", variants: ["jobs to be done", "jtbd", "jobs-to-be-done", "outcome-driven innovation"] },
  { name: "Product Discovery", variants: ["product discovery", "continuous discovery", "discovery process", "discovery work", "discovery interviews", "discovery research", "user discovery", "customer development", "problem discovery", "dual-track discovery", "dual track agile"] },
  { name: "Opportunity Assessment", variants: ["opportunity assessment", "opportunity solution tree", "opportunity solution trees", "opportunity mapping", "opportunity sizing", "problem framing", "problem definition", "problem statement", "opportunity analysis"] },
  { name: "Contextual Inquiry", variants: ["contextual inquiry", "contextual research", "field research", "field study", "field studies", "customer visits", "site visits", "ride-alongs", "ride alongs", "shadowing", "ethnographic research"] },
  { name: "Focus Groups", variants: ["focus group", "focus groups"] },
  { name: "Diary Studies", variants: ["diary study", "diary studies", "longitudinal study", "longitudinal studies"] },
  { name: "Sales and Support Feedback Loops", variants: ["sales feedback", "customer success feedback", "field feedback", "frontline feedback", "sales call analysis", "call reviews", "customer calls", "cs feedback loop", "feedback loops", "feedback loop"] },
  { name: "Customer Segmentation", variants: ["segmentation", "customer segmentation", "user segmentation", "market segmentation", "segment analysis", "audience segmentation", "cohort segmentation"] },
  { name: "Trend Analysis", variants: ["trend analysis", "market trends", "industry trends", "technology trends", "trend research", "horizon scanning", "landscape analysis", "landscape assessment"] },
  { name: "Competitive Teardowns", variants: ["teardown", "teardowns", "product teardown", "product teardowns", "feature teardown", "competitor teardown", "competitive teardown"] },
  { name: "Partner and Ecosystem Analysis", variants: ["partner analysis", "partnership analysis", "partnership evaluation", "ecosystem analysis", "ecosystem mapping", "build vs buy", "build-vs-buy", "buy vs build", "vendor evaluation", "make or buy"] },
  { name: "Pricing Research", variants: ["pricing research", "willingness to pay", "wtp", "van westendorp", "conjoint analysis", "conjoint", "price sensitivity", "price testing", "pricing experiments", "price elasticity"] },
  { name: "Retention Analysis", variants: ["retention analysis", "retention", "user retention", "customer retention", "retention modeling", "retention curves", "churn rate", "churn prediction", "churn modeling", "attrition analysis", "stickiness", "dau/mau"] },
  { name: "Engagement Analysis", variants: ["engagement analysis", "engagement metrics", "active users", "dau", "mau", "wau", "usage frequency", "usage patterns", "adoption analysis", "adoption metrics", "feature adoption"] },
  { name: "Clickstream Analysis", variants: ["clickstream analysis", "clickstream analytics", "usage log analysis", "event log analysis", "session logs", "search log analysis", "query log analysis"] },
  { name: "Product Analytics Instrumentation", variants: ["instrumentation", "analytics instrumentation", "product instrumentation", "data instrumentation", "metrics instrumentation", "event tracking", "event taxonomy", "tracking plan", "tracking plans", "telemetry"] },
  { name: "Secondary Research", variants: ["secondary research", "desk research", "literature review", "analyst reports", "industry reports", "white papers", "market research review"] },
  { name: "Roadmapping", variants: ["roadmap", "roadmapping", "product roadmap", "roadmap planning", "strategic roadmap", "quarterly planning"] },
  { name: "PRD Writing", variants: ["prd", "product requirements", "requirements document", "product spec", "product specification", "functional spec", "feature spec"] },
  { name: "User Story Writing", variants: ["user story", "user stories", "acceptance criteria", "story writing", "epic", "epics"] },
  { name: "Prioritization Frameworks", variants: ["prioritization", "rice", "moscow", "kano", "ice scoring", "weighted scoring", "impact effort", "priority matrix", "stack ranking"] },
  { name: "OKR Setting", variants: ["okr", "okrs", "objectives and key results", "kpi", "kpis", "goal setting", "north star metric"] },
  { name: "Go-to-Market Planning", variants: ["go-to-market", "gtm", "launch plan", "release planning", "launch strategy", "product launch"] },
  { name: "Sprint Planning", variants: ["sprint planning", "sprint", "backlog grooming", "backlog refinement", "iteration planning", "capacity planning"] },
  { name: "Journey Mapping", variants: ["journey map", "journey mapping", "customer journey", "user journey", "experience map"] },
  { name: "Stakeholder Mapping", variants: ["stakeholder map", "stakeholder mapping", "stakeholder analysis", "raci", "influence mapping"] },
  { name: "Business Case Development", variants: ["business case", "roi analysis", "cost-benefit", "cost benefit", "financial model", "business model canvas"] },
  { name: "Product Vision and Narrative", variants: ["product vision", "vision setting", "vision document", "product narrative", "strategy narrative", "narrative writing", "working backwards", "press release", "pr/faq", "prfaq", "pr faq", "one-pager", "one pager", "product brief", "strategy doc", "strategy document"] },
  { name: "Persona Development", variants: ["persona", "personas", "persona development", "user persona", "user personas", "buyer persona", "buyer personas", "customer personas", "proto-persona", "proto-personas"] },
  { name: "Story Mapping", variants: ["story map", "story maps", "story mapping", "user story mapping"] },
  { name: "Service Blueprinting", variants: ["service blueprint", "service blueprints", "service blueprinting", "service design", "service map"] },
  { name: "Process Mapping", variants: ["process map", "process maps", "process mapping", "workflow mapping", "value stream mapping", "swimlane diagram", "user flow", "user flows", "flow diagram", "flow diagrams"] },
  { name: "Prototyping", variants: ["prototype", "prototypes", "prototyping", "rapid prototyping", "wireframe", "wireframes", "wireframing", "mockup", "mockups", "clickable prototype", "low-fidelity prototype", "paper prototype"] },
  { name: "Pricing and Packaging", variants: ["pricing", "pricing strategy", "pricing and packaging", "packaging", "packaging strategy", "pricing management", "price modeling", "monetization", "monetization strategy", "tiering", "subscription pricing", "discount strategy"] },
  { name: "Business Model Design", variants: ["business model", "business model design", "unit economics", "revenue model", "revenue modeling", "profit and loss", "revenue forecasting", "forecasting", "ltv", "cac", "ltv/cac", "payback period", "margin analysis"] },
  { name: "Metrics Definition", variants: ["metric definition", "metrics definition", "defining metrics", "success metrics", "success criteria", "kpi definition", "north star", "metric framework", "metrics framework", "leading indicators", "outcome metrics"] },
  { name: "Technical Scoping", variants: ["technical scoping", "scoping", "technical discovery", "technical requirements", "technical feasibility", "feasibility analysis", "feasibility assessment", "effort estimation", "estimation", "sizing", "architecture review", "technical design review", "system design review", "solution design"] },
  { name: "API and Platform Design", variants: ["api design", "api product", "api product management", "api strategy", "api specification", "api documentation", "openapi", "sdk design", "platform design", "platform architecture", "platform thinking", "platform strategy", "developer experience", "devex", "integration design", "webhooks"] },
  { name: "Growth Loops", variants: ["growth loop", "growth loops", "viral loop", "viral loops", "referral loop", "referral program", "network effects", "flywheel", "growth model", "growth modeling", "product-led growth", "plg", "acquisition loops"] },
  { name: "Marketplace Design", variants: ["marketplace strategy", "marketplace design", "marketplace dynamics", "marketplace optimization", "two-sided marketplace", "two-sided market", "supply and demand balancing", "supply-demand", "liquidity", "matching efficiency", "seller experience", "buyer experience", "take rate"] },
  { name: "Release Management", variants: ["release management", "release process", "release cadence", "release train", "release readiness", "launch readiness", "rollout plan", "rollout planning", "staged rollout", "phased rollout", "go-live"] },
  { name: "Risk Assessment", variants: ["risk assessment", "risk analysis", "risk mitigation", "premortem", "pre-mortem", "assumption mapping", "assumption testing", "tradeoff analysis", "trade-off analysis"] },
  { name: "Scenario Planning", variants: ["scenario planning", "scenario analysis", "what-if analysis", "sensitivity analysis", "long-range planning", "annual planning"] },
  { name: "Workshop Facilitation", variants: ["workshop facilitation", "workshops", "design sprint", "design sprints", "alignment workshop", "kickoff workshop", "ideation session", "ideation", "brainstorming", "design thinking"] },
  { name: "A/B Testing", variants: ["a/b test", "a/b testing", "ab testing", "split testing", "multivariate testing", "experimentation"] },
  { name: "Beta Testing", variants: ["beta test", "beta testing", "beta program", "early access", "limited availability", "soft launch"] },
  { name: "Usability Testing", variants: ["usability test", "usability testing", "usability study", "user testing"] },
  { name: "Dogfooding", variants: ["dogfood", "dogfooding", "eat your own", "internal testing", "internal pilot"] },
  { name: "Customer Advisory Board", variants: ["customer advisory", "advisory board", "cab", "customer council", "design partner", "design partners"] },
  { name: "Feature Flagging", variants: ["feature flag", "feature flags", "feature flagging", "feature toggle", "gradual rollout", "canary release", "dark launch"] },
  { name: "Concept Testing", variants: ["concept test", "concept testing", "concept validation", "prototype testing"] },
  { name: "Post-Launch Review", variants: ["post-launch", "post launch", "retrospective", "retro", "post-mortem", "postmortem", "lessons learned"] },
  { name: "Experiment Design", variants: ["experiment design", "experimental design", "experiment", "experiments", "hypothesis testing", "hypothesis-driven development", "controlled experiment", "controlled experiments", "statistical significance", "test and learn", "test-and-learn"] },
  { name: "Incrementality Testing", variants: ["incrementality testing", "incrementality", "holdout test", "holdout analysis", "geo testing", "causal inference", "difference-in-differences", "guardrail metrics"] },
  { name: "Conversion Rate Optimization", variants: ["conversion rate optimization", "cro", "conversion optimization", "conversion analysis", "funnel optimization", "checkout optimization", "e-commerce optimization", "ecommerce optimization", "dtc optimization", "landing page optimization", "campaign optimization"] },
  { name: "Onboarding Optimization", variants: ["onboarding optimization", "onboarding", "user onboarding", "activation", "activation optimization", "time to value", "first-run experience", "aha moment"] },
  { name: "Satisfaction Measurement", variants: ["net promoter score", "nps survey", "csat survey", "ces", "customer effort score", "satisfaction survey", "satisfaction measurement", "sentiment tracking", "user satisfaction"] },
  { name: "Session Replay Review", variants: ["session replay", "session recordings", "session recording", "heatmaps", "heatmap analysis", "scroll maps", "click tracking"] },
  { name: "Pilot Programs", variants: ["pilot", "pilots", "pilot program", "pilot programs", "proof of concept", "poc", "field trial", "limited release"] },
  { name: "Acceptance Testing", variants: ["acceptance testing", "user acceptance testing", "uat", "qa testing", "quality assurance", "regression testing", "validation testing"] },
  { name: "Quality Metrics Monitoring", variants: ["quality metrics", "reliability metrics", "operational metrics", "performance monitoring", "slo", "sla", "error budget", "uptime monitoring"] },
];

// Tokens that are tools/skills/ops/generic-category noise that sometimes spill
// into the methods_mentioned field. Classifying them as "non_method" keeps
// them out of topMethods rather than inflating counts with junk.
const METHOD_NONMETHODS = {
  uxr: ["usertesting", "usertesting.com", "userzoom", "qualtrics", "dovetail", "maze", "optimal workshop", "lookback", "figma", "miro", "airtable", "notion", "hotjar", "fullstory", "pendo", "amplitude", "mixpanel", "sprig", "great question", "dscout", "userzing", "tableau", "looker",
    "r", "python", "spss", "sql", "excel", "stata", "sas", "javascript",
    "participant recruitment", "recruiting", "research operations", "research ops", "researchops", "insight repository", "research repository", "consent management", "incentive management", "panel management", "note-taking", "notetaking", "insight sharing systems",
    "qualitative research", "quantitative research", "qualitative", "quantitative", "mixed methods", "mixed-methods", "generative research", "evaluative research", "exploratory research", "foundational research", "research", "user research", "ux research", "applied research", "behavioral research", "global research", "discovery research", "remote research", "strategic research", "international research", "cross-cultural research", "concept research",
    "statistical analysis", "data analysis", "quantitative analysis", "qualitative analysis", "behavioral analysis", "behavioral data analysis", "data visualization", "data collection", "data synthesis", "research synthesis", "insights synthesis", "synthesis",
    "prototyping", "rapid prototyping", "design thinking", "workshops", "workshop facilitation", "wireframing", "sketching", "ideation", "brainstorming", "design sprints", "design sprint"],
  design: ["figma", "figjam", "sketch", "adobe xd", "adobe creative suite", "photoshop", "illustrator", "after effects", "invision", "framer", "principle", "protopie", "zeplin", "storybook", "webflow", "axure", "balsamiq", "miro", "mural", "airtable", "notion", "confluence", "jira", "hotjar", "fullstory", "pendo", "amplitude", "mixpanel", "maze", "lyssna", "optimal workshop", "usertesting", "dovetail",
    "html", "css", "javascript", "typescript", "react", "swift", "swiftui", "kotlin", "flutter", "code", "coding", "front-end engineering", "front-end development", "frontend development", "git", "sql", "python",
    "design operations", "design ops", "designops", "asset management", "version control", "file management", "design governance", "design process", "design handoff", "handoff", "design documentation", "documentation", "component maintenance", "design review process", "design critique process", "design system governance", "design rituals", "project management", "roadmapping", "sprint planning", "agile ceremonies", "stakeholder management",
    "product design", "ux design", "ui design", "ux/ui design", "ui/ux design", "user experience", "user experience design", "experience design", "design", "web design", "website design", "mobile design", "digital design", "digital experience", "digital strategy", "customer experience", "ai design", "design strategy", "ux strategy", "screen design", "user design", "ecommerce design", "e-commerce design", "end-to-end design", "system design", "systems design", "vision execution", "government digital services", "data-driven design", "data-informed design",
    "data analysis", "design analysis", "data visualization", "data visualisation", "data viz", "metrics analysis", "quantitative analysis", "qualitative analysis", "statistical analysis", "analytics", "funnel analysis", "cohort analysis", "performance analysis",
    "qualitative research", "quantitative research", "mixed methods", "mixed-methods", "research", "ux research", "user experience research", "generative research", "evaluative research", "discovery research", "foundational research", "market research", "desk research", "secondary research", "participant recruitment", "research ops", "research operations"],
  product: ["jira", "confluence", "asana", "linear", "productboard", "aha", "notion", "monday", "clickup", "trello", "shortcut", "amplitude", "mixpanel", "pendo", "fullstory", "hotjar", "looker", "tableau", "segment", "launchdarkly", "optimizely", "productplan", "roadmunk", "azure devops", "github", "figma", "miro", "mural", "gong", "zendesk", "salesforce", "hubspot", "google analytics", "ga4", "statsig", "posthog", "heap", "braze", "appcues", "userpilot", "power bi", "snowflake", "dbt", "datadog",
    "sql", "python", "r", "excel", "html", "css", "javascript", "jupyter", "pandas", "scripting", "statistics", "spreadsheet modeling",
    "product operations", "product ops", "productops", "process governance", "change management", "backlog management", "release coordination", "roadmap maintenance", "stakeholder communication", "stakeholder management", "cross-functional collaboration", "status reporting", "meeting facilitation", "documentation", "bug triage", "ticket triage", "dependency management", "resource allocation", "vendor management", "agile ceremonies", "standups", "team leadership",
    "product management", "product strategy", "technical product management", "ai product management", "high-scale product management", "data product management", "product development", "product lifecycle management", "project management", "program management", "portfolio management", "platform management", "discovery", "delivery", "async product work", "developer tools", "developer relations", "growth strategy", "customer experience", "employee experience", "end-to-end ownership", "transformation", "agile", "scrum", "kanban", "lean", "waterfall",
    "data analysis", "statistical analysis", "quantitative analysis", "qualitative analysis", "data visualization", "data collection", "data synthesis", "analytics", "metrics analysis", "business analysis", "reporting", "dashboards", "dashboarding", "insights synthesis", "data storytelling", "data-driven decision making",
    "qualitative research", "quantitative research", "mixed methods", "user research", "ux research", "generative research", "evaluative research", "design research", "customer research", "primary research", "usability research"],
};

const METHOD_GENERIC_PATTERNS = [
  "^(qualitative|quantitative)( and (qualitative|quantitative))? (research|methods|studies)$",
  "^mixed[- ]?methods?( research| approach)?$",
  "^(generative|evaluative|foundational|exploratory)( and (generative|evaluative))? (research|methods|studies)$",
].map((p) => new RegExp(p, "i"));

const METHOD_TAXONOMY_BY_DISCIPLINE = {
  uxr: METHOD_TAXONOMY_METHODS,
  design: DESIGN_METHOD_TAXONOMY_METHODS,
  product: PM_METHOD_TAXONOMY_METHODS,
};

const METHOD_SKIP_TOKENS = new Set(["none mentioned", "n/a", "not specified", "none", "na", "tbd", "various", "other", ""]);

function buildMethodIndex(internalDiscipline) {
  const taxonomy = METHOD_TAXONOMY_BY_DISCIPLINE[internalDiscipline] || METHOD_TAXONOMY_METHODS;
  const nonmethods = METHOD_NONMETHODS[internalDiscipline] || [];
  const exact = {};
  taxonomy.forEach((m) => m.variants.forEach((v) => { exact[v.toLowerCase()] = { kind: "method", name: m.name }; }));
  nonmethods.forEach((v) => { if (!exact[v.toLowerCase()]) exact[v.toLowerCase()] = { kind: "non_method" }; });
  const fuzz = Object.keys(exact).filter((v) => v.length >= 6).sort((a, b) => b.length - a.length);
  return { exact, fuzz };
}

const _methodIndexCache = {};
function getMethodIndex(internalDiscipline) {
  if (!_methodIndexCache[internalDiscipline]) _methodIndexCache[internalDiscipline] = buildMethodIndex(internalDiscipline);
  return _methodIndexCache[internalDiscipline];
}

// Classify one raw method token (as it appears in a posting's methods_mentioned
// CSV field) into a canonical method name, or null if it's noise / unrecognized.
function canonicalMethodName(raw, internalDiscipline) {
  const t = (raw || "").trim().toLowerCase().replace(/\.+$/, "");
  if (!t || METHOD_SKIP_TOKENS.has(t)) return null;
  if (METHOD_GENERIC_PATTERNS.some((re) => re.test(t))) return null;
  const idx = getMethodIndex(internalDiscipline);
  const hit = idx.exact[t];
  if (hit) return hit.kind === "method" ? hit.name : null;
  for (const v of idx.fuzz) {
    if (t.indexOf(v) !== -1) {
      const h = idx.exact[v];
      return h.kind === "method" ? h.name : null;
    }
  }
  return null; // unrecognized tokens are dropped, not fabricated into a name
}

// ─── TOOL REGISTRIES (verbatim from Meridian.jsx ~L3644-3851) ───────────────
const UXR_TOOL_REGISTRY = [
  { name: "UserTesting", aliases: ["usertesting"] },
  { name: "UserZoom", aliases: ["userzoom", "user zoom"] },
  { name: "Qualtrics", aliases: ["qualtrics"] },
  { name: "Lookback", aliases: ["lookback.io", " lookback ", " lookback,"] },
  { name: "Maze", aliases: ["maze.co", " maze ", " maze,", " maze.", "(maze", "/maze"] },
  { name: "dscout", aliases: ["dscout"] },
  { name: "Respondent", aliases: ["respondent.io", " respondent ", " respondent,"] },
  { name: "Great Question", aliases: ["great question"] },
  { name: "Dovetail", aliases: ["dovetail"] },
  { name: "EnjoyHQ", aliases: ["enjoyhq"] },
  { name: "Optimal Workshop", aliases: ["optimal workshop", "optimalworkshop"] },
  { name: "Lyssna", aliases: ["lyssna", "usabilityhub"] },
  { name: "Typeform", aliases: ["typeform"] },
  { name: "SurveyMonkey", aliases: ["surveymonkey", "survey monkey"] },
  { name: "Google Analytics", aliases: ["google analytics", "ga4", "google tag"] },
  { name: "Mixpanel", aliases: ["mixpanel"] },
  { name: "Amplitude", aliases: ["amplitude"] },
  { name: "FullStory", aliases: ["fullstory", "full story"] },
  { name: "Hotjar", aliases: ["hotjar"] },
  { name: "Pendo", aliases: ["pendo"] },
  { name: "Heap", aliases: [" heap ", " heap,", " heap."] },
  { name: "Looker", aliases: ["looker"] },
  { name: "Tableau", aliases: ["tableau"] },
  { name: "LaunchDarkly", aliases: ["launchdarkly"] },
  { name: "Optimizely", aliases: ["optimizely"] },
  { name: "Split.io", aliases: ["split.io", "split io"] },
  { name: "Segment", aliases: ["segment.com", " segment ", " segment,"] },
  { name: "Mode", aliases: ["mode analytics", "mode.com"] },
  { name: "Metabase", aliases: ["metabase"] },
  { name: "Productboard", aliases: ["productboard", "product board"] },
  { name: "Aha!", aliases: ["aha!", "aha roadmaps", "aha.io"] },
  { name: "Roadmunk", aliases: ["roadmunk"] },
  { name: "Linear", aliases: [" linear ", " linear,", " linear.", "linear.app"] },
  { name: "Gainsight", aliases: ["gainsight"] },
  { name: "Chameleon", aliases: ["chameleon.io", " chameleon "] },
  { name: "Zendesk", aliases: ["zendesk"] },
  { name: "Intercom", aliases: ["intercom"] },
  { name: "Figma", aliases: ["figma"] },
  { name: "FigJam", aliases: ["figjam"] },
  { name: "Miro", aliases: [" miro ", " miro,", " miro."] },
  { name: "Mural", aliases: [" mural ", " mural,", " mural.", "mural.co"] },
  { name: "Sketch", aliases: [" sketch ", " sketch,", " sketch."] },
  { name: "InVision", aliases: ["invision", "invsion"] },
  { name: "Confluence", aliases: ["confluence"] },
  { name: "Notion", aliases: [" notion ", " notion,", " notion."] },
  { name: "Airtable", aliases: ["airtable"] },
  { name: "Coda", aliases: ["coda.io", " coda ", " coda,", " coda."] },
  { name: "SPSS", aliases: ["spss"] },
  { name: "R", aliases: [" r ", " r,", " r.", "rstudio", "r studio"] },
  { name: "Python", aliases: ["python"] },
  { name: "SQL", aliases: [" sql ", " sql,", " sql."] },
  { name: "Excel", aliases: [" excel ", " excel,", " excel."] },
  { name: "STATA", aliases: ["stata"] },
  { name: "NVivo", aliases: ["nvivo"] },
  { name: "ChatGPT", aliases: ["chatgpt", "chat gpt"] },
  { name: "Claude", aliases: [" claude ", " claude,", " claude."] },
  { name: "Copilot", aliases: [" copilot ", " copilot,", " copilot.", "copilot "] },
  { name: "Gemini", aliases: [" gemini ", " gemini,", " gemini."] },
  { name: "GPT-4", aliases: ["gpt-4", "gpt4"] },
  { name: "Perplexity", aliases: ["perplexity"] },
  { name: "Jira", aliases: [" jira ", " jira,", " jira."] },
  { name: "Asana", aliases: ["asana"] },
  { name: "Slack", aliases: [" slack ", " slack,", " slack."] },
  { name: "Monday.com", aliases: ["monday.com", "monday com"] },
  { name: "Azure DevOps", aliases: ["azure devops", "azure dev ops"] },
  { name: "Shortcut", aliases: ["shortcut.com", " shortcut ", " shortcut,"] },
  { name: "ClickUp", aliases: ["clickup", "click up"] },
  { name: "GitHub", aliases: ["github"] },
  { name: "GitLab", aliases: ["gitlab"] },
  { name: "Datadog", aliases: ["datadog"] },
  { name: "Sentry", aliases: ["sentry.io", " sentry "] },
];

const DESIGN_TOOL_REGISTRY = [
  { name: "Figma", aliases: ["figma"] },
  { name: "FigJam", aliases: ["figjam"] },
  { name: "Sketch", aliases: [" sketch ", " sketch,", " sketch."] },
  { name: "Adobe XD", aliases: ["adobe xd", "xd "] },
  { name: "InVision", aliases: ["invision", "invsion"] },
  { name: "Framer", aliases: ["framer"] },
  { name: "Principle", aliases: ["principle app", "principleformac", "principle for mac"] },
  { name: "ProtoPie", aliases: ["protopie"] },
  { name: "Origami Studio", aliases: ["origami studio", "origami"] },
  { name: "Adobe Creative Suite", aliases: ["photoshop", "illustrator", "after effects", "adobe creative", "adobe cc", "indesign"] },
  { name: "Canva", aliases: ["canva"] },
  { name: "Storybook", aliases: ["storybook"] },
  { name: "Zeroheight", aliases: ["zeroheight", "zero height"] },
  { name: "Zeplin", aliases: ["zeplin"] },
  { name: "Abstract", aliases: [" abstract ", " abstract,", " abstract.", "abstract.com"] },
  { name: "Maze", aliases: ["maze.co", " maze ", " maze,", " maze.", "(maze", "/maze"] },
  { name: "Lyssna", aliases: ["lyssna", "usabilityhub"] },
  { name: "UserTesting", aliases: ["usertesting"] },
  { name: "Optimal Workshop", aliases: ["optimal workshop", "optimalworkshop"] },
  { name: "Miro", aliases: [" miro ", " miro,", " miro."] },
  { name: "Mural", aliases: [" mural ", " mural,", " mural.", "mural.co"] },
  { name: "Confluence", aliases: ["confluence"] },
  { name: "Notion", aliases: [" notion ", " notion,", " notion."] },
  { name: "Airtable", aliases: ["airtable"] },
  { name: "Coda", aliases: ["coda.io", " coda ", " coda,", " coda."] },
  { name: "Hotjar", aliases: ["hotjar"] },
  { name: "FullStory", aliases: ["fullstory", "full story"] },
  { name: "Google Analytics", aliases: ["google analytics", "ga4", "google tag"] },
  { name: "Amplitude", aliases: ["amplitude"] },
  { name: "Mixpanel", aliases: ["mixpanel"] },
  { name: "Pendo", aliases: ["pendo"] },
  { name: "Heap", aliases: [" heap ", " heap,", " heap."] },
  { name: "Sprig", aliases: ["sprig"] },
  { name: "ChatGPT", aliases: ["chatgpt", "chat gpt"] },
  { name: "Claude", aliases: [" claude ", " claude,", " claude."] },
  { name: "Copilot", aliases: [" copilot ", " copilot,", " copilot.", "copilot "] },
  { name: "Midjourney", aliases: ["midjourney"] },
  { name: "DALL-E", aliases: ["dall-e", "dalle"] },
  { name: "Jira", aliases: [" jira ", " jira,", " jira."] },
  { name: "Asana", aliases: ["asana"] },
  { name: "Linear", aliases: [" linear ", " linear,", " linear.", "linear.app"] },
  { name: "Slack", aliases: [" slack ", " slack,", " slack."] },
  { name: "GitHub", aliases: ["github"] },
  { name: "GitLab", aliases: ["gitlab"] },
  { name: "VS Code", aliases: ["vs code", "vscode", "visual studio code"] },
];

const PM_TOOL_REGISTRY = [
  { name: "Jira", aliases: [" jira ", " jira,", " jira."] },
  { name: "Confluence", aliases: ["confluence"] },
  { name: "Productboard", aliases: ["productboard", "product board"] },
  { name: "Aha!", aliases: ["aha!", "aha roadmaps", "aha.io"] },
  { name: "Linear", aliases: [" linear ", " linear,", " linear.", "linear.app"] },
  { name: "Notion", aliases: [" notion ", " notion,", " notion."] },
  { name: "Asana", aliases: ["asana"] },
  { name: "Monday.com", aliases: ["monday.com", "monday com"] },
  { name: "Shortcut", aliases: ["shortcut.com", " shortcut ", " shortcut,"] },
  { name: "ClickUp", aliases: ["clickup", "click up"] },
  { name: "Roadmunk", aliases: ["roadmunk"] },
  { name: "Gainsight", aliases: ["gainsight"] },
  { name: "Pendo", aliases: ["pendo"] },
  { name: "Intercom", aliases: ["intercom"] },
  { name: "Zendesk", aliases: ["zendesk"] },
  { name: "Chameleon", aliases: ["chameleon.io", " chameleon "] },
  { name: "Amplitude", aliases: ["amplitude"] },
  { name: "Mixpanel", aliases: ["mixpanel"] },
  { name: "Google Analytics", aliases: ["google analytics", "ga4", "google tag"] },
  { name: "FullStory", aliases: ["fullstory", "full story"] },
  { name: "Hotjar", aliases: ["hotjar"] },
  { name: "Heap", aliases: [" heap ", " heap,", " heap."] },
  { name: "Looker", aliases: ["looker"] },
  { name: "Tableau", aliases: ["tableau"] },
  { name: "Mode", aliases: ["mode analytics", "mode.com"] },
  { name: "Metabase", aliases: ["metabase"] },
  { name: "Segment", aliases: ["segment.com", " segment ", " segment,"] },
  { name: "LaunchDarkly", aliases: ["launchdarkly"] },
  { name: "Optimizely", aliases: ["optimizely"] },
  { name: "Split.io", aliases: ["split.io", "split io"] },
  { name: "Sprig", aliases: ["sprig"] },
  { name: "Figma", aliases: ["figma"] },
  { name: "Miro", aliases: [" miro ", " miro,", " miro."] },
  { name: "Mural", aliases: [" mural ", " mural,", " mural.", "mural.co"] },
  { name: "Airtable", aliases: ["airtable"] },
  { name: "Coda", aliases: ["coda.io", " coda ", " coda,", " coda."] },
  { name: "SQL", aliases: [" sql ", " sql,", " sql."] },
  { name: "Python", aliases: ["python"] },
  { name: "Excel", aliases: [" excel ", " excel,", " excel."] },
  { name: "R", aliases: [" r ", " r,", " r.", "rstudio", "r studio"] },
  { name: "ChatGPT", aliases: ["chatgpt", "chat gpt"] },
  { name: "Claude", aliases: [" claude ", " claude,", " claude."] },
  { name: "Copilot", aliases: [" copilot ", " copilot,", " copilot.", "copilot "] },
  { name: "Gemini", aliases: [" gemini ", " gemini,", " gemini."] },
  { name: "Slack", aliases: [" slack ", " slack,", " slack."] },
  { name: "Azure DevOps", aliases: ["azure devops", "azure dev ops"] },
  { name: "GitHub", aliases: ["github"] },
  { name: "GitLab", aliases: ["gitlab"] },
  { name: "Datadog", aliases: ["datadog"] },
];

const TOOL_REGISTRY_BY_DISCIPLINE = { uxr: UXR_TOOL_REGISTRY, design: DESIGN_TOOL_REGISTRY, product: PM_TOOL_REGISTRY };

// Returns the set of tool names present in a job record's combined free text —
// same fields and same substring-alias matching Meridian itself uses.
function toolsInRecord(job, internalDiscipline) {
  const registry = TOOL_REGISTRY_BY_DISCIPLINE[internalDiscipline] || UXR_TOOL_REGISTRY;
  const parts = [job.summary, job.responsibilities, job.soft_skills, job.methods_mentioned, job.ai_context, job.title]
    .map((f) => (typeof f === "string" ? f : ""))
    .filter(Boolean);
  const text = " " + parts.join(" ").toLowerCase() + " ";
  const found = [];
  registry.forEach((t) => {
    if (t.aliases.some((a) => text.includes(a))) found.push(t.name);
  });
  return found;
}

// ─── RESPONSIBILITY THEMES (verbatim from Meridian.jsx ~L1930-2015) ─────────
const UXR_RESP_THEMES = [
  { label: "Conduct user research", kws: ["conduct research", "conduct user research", "conduct ux research", "user stud", "research stud", "research initiative", "research practice", "mixed-method", "mixed method", "run research", "execute research", "lead research", "drive research", "own research"] },
  { label: "Conduct generative research", kws: ["generative", "discovery", "foundational", "exploratory", "formative"] },
  { label: "Conduct evaluative research", kws: ["evaluative", "usability", "concept test", "validation"] },
  { label: "Develop insights and recommendations", kws: ["insight", "recommendation", "synthes", "finding", "distill", "inform", "decision"] },
  { label: "Present to stakeholders", kws: ["stakeholder", "present", "communicat", " share", "report", "socialize", "storytell"] },
  { label: "Define research strategy", kws: ["strategy", "strategic", "roadmap", "vision", "agenda", "prioriti"] },
  { label: "Develop research operations", kws: ["operations", "research ops", "reops", "tooling", "panel", "recruit", "repository", "process", "governance"] },
  { label: "Mentor and manage researchers", kws: ["mentor", "coach", "manage", "grow the team", "lead a team", "people manage", "develop researchers", "team of"] },
  { label: "Analyze data", kws: ["analyze", "data analysis", "quantitative", "statistic", "metric", "behavioral data"] },
  { label: "Design research plans", kws: ["research plan", "study design", "design research", "scope", "plan research", "methodolog"] },
  { label: "Advocate and influence design", kws: ["influence", "advocate", "champion", "evangeli", "adoption", "impact"] },
  { label: "Partner cross-functionally", kws: ["partner", "collaborat", "cross-functional", "work with", "embed"] },
  { label: "Run interviews and studies", kws: ["interview", "survey", "field", "ethnograph", "diary", "observ", "moderat"] },
];
const DESIGN_RESP_THEMES = [
  { label: "Design products and features", kws: ["product design", "design product", "design feature", "design screen", "design app", "design digital", "design consumer", "interface design", "ui design", "mobile design", "web design", "deliver design", "production-ready", "concept to launch", "design expertise", "own product area", "design initiative", "design process"] },
  { label: "Design end-to-end experiences", kws: ["end-to-end", "holistic", "full product", "complete experience", "entire experience", "e2e"] },
  { label: "Build and maintain design systems", kws: ["design system", "component", "pattern library", "style guide", "token", "reusable"] },
  { label: "Create wireframes and prototypes", kws: ["wireframe", "prototype", "mockup", "high-fidelity", "low-fidelity", "interactive", "comp"] },
  { label: "Lead and grow design teams", kws: ["mentor", "coach", "manage", "grow the team", "lead a team", "people manage", "direct report", "team of"] },
  { label: "Drive design quality and craft", kws: ["craft", "quality", "polish", "pixel", "detail", "standard", "excellence", "visual quality"] },
  { label: "Advocate for UX consistency", kws: ["consistency", "cohesion", "coherent", "unified", "seamless", "standard", "guideline"] },
  { label: "Partner cross-functionally", kws: ["partner", "collaborat", "cross-functional", "work with", "embed", "align", "coordinate"] },
  { label: "Present to stakeholders", kws: ["stakeholder", "present", "communicat", " share", "report", "socialize", "storytell"] },
  { label: "Conduct user research", kws: ["user research", "usability test", "interview", "survey", "user insight", "user need", "conduct research", "research"] },
  { label: "Define design strategy", kws: ["strategy", "strategic", "vision", "roadmap", "direction", "prioriti"] },
  { label: "Design for accessibility", kws: ["accessibility", "a11y", "wcag", "inclusive", "assistive", "accessible"] },
  { label: "Design interactions and flows", kws: ["interaction", "flow", "animation", "motion", "micro-interaction", "transition", "behavior"] },
];
const PM_RESP_THEMES = [
  { label: "Define product vision and strategy", kws: ["vision", "strategy", "strategic", "direction", "north star", "mission"] },
  { label: "Own and prioritize the roadmap", kws: ["roadmap", "prioriti", "backlog", "requirement", "feature", "scope"] },
  { label: "Drive execution and delivery", kws: ["execution", "deliver", "ship", "launch", "release", "sprint", "velocity"] },
  { label: "Partner cross-functionally", kws: ["partner", "collaborat", "cross-functional", "work with", "align", "coordinate", "embed"] },
  { label: "Analyze data and metrics", kws: ["data", "metric", "analytic", "measure", "kpi", "okr", "performance", "insight"] },
  { label: "Understand customer needs", kws: ["customer", "user need", "market", "competitive", "research", "discover", "feedback"] },
  { label: "Lead and influence stakeholders", kws: ["stakeholder", "influence", "communicat", "present", "alignment", "buy-in", "executive"] },
  { label: "Write product requirements", kws: ["prd", "spec", "requirement", "user stor", "acceptance criteria", "epic", "document"] },
  { label: "Mentor and grow team", kws: ["mentor", "coach", "manage", "develop", "team", "people manage", "direct report"] },
  { label: "Manage product lifecycle", kws: ["lifecycle", "go-to-market", "gtm", "launch plan", "deprecat", "sunset", "migration"] },
  { label: "Build product operations", kws: ["operations", "process", "governance", "tooling", "workflow", "infrastructure"] },
  { label: "Evaluate and adopt technology", kws: ["technology", "technical", "api", "integration", "platform", "architect", "system"] },
];
const RESP_THEMES_BY_DISCIPLINE = { uxr: UXR_RESP_THEMES, design: DESIGN_RESP_THEMES, product: PM_RESP_THEMES };

function respThemeCounts(jobs, internalDiscipline) {
  const themes = RESP_THEMES_BY_DISCIPLINE[internalDiscipline] || UXR_RESP_THEMES;
  const counts = {};
  themes.forEach((t) => { counts[t.label] = 0; });
  jobs.forEach((job) => {
    const text = (job.responsibilities || "").toLowerCase();
    if (!text || text === "none mentioned") return;
    themes.forEach((t) => { if (t.kws.some((k) => text.indexOf(k) !== -1)) counts[t.label]++; });
  });
  return themes
    .map((t) => ({ name: t.label, count: counts[t.label] }))
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count);
}

// ─── SENIORITY ──────────────────────────────────────────────────────────────
// Tailor's own 11-level ladder (index.html SENIORITY_ORDER). Meridian's raw
// records use a 13-level ladder that additionally has "Senior Manager" and
// "Senior Director" — folded into "Manager"/"Director" here so aggregates key
// on exactly the levels Tailor's frontend already knows how to render.
const SENIORITY_ORDER = ["Intern", "Entry", "Mid", "Senior", "Manager", "Lead", "Staff", "Principal", "Director", "VP", "Head"];
const SENIORITY_FOLD = { "Senior Manager": "Manager", "Senior Director": "Director" };
function normalizeSeniorityForTailor(raw) {
  const s = (raw || "").trim();
  if (SENIORITY_FOLD[s]) return SENIORITY_FOLD[s];
  return SENIORITY_ORDER.includes(s) ? s : null;
}

// ─── STATS HELPERS ──────────────────────────────────────────────────────────
function percentile(sortedAsc, p) {
  if (!sortedAsc.length) return null;
  const idx = (sortedAsc.length - 1) * p;
  const lo = Math.floor(idx), hi = Math.ceil(idx);
  if (lo === hi) return sortedAsc[lo];
  return sortedAsc[lo] + (sortedAsc[hi] - sortedAsc[lo]) * (idx - lo);
}

module.exports = {
  DISCIPLINES,
  canonicalMethodName,
  toolsInRecord,
  respThemeCounts,
  SENIORITY_ORDER,
  normalizeSeniorityForTailor,
  percentile,
};
