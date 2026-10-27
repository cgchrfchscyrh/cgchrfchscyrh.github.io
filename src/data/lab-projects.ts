const source = "https://github.com/DreamXLab/DreamXLab.github.io/blob/c4a06d081f7f22f9966cbc5248b7ceb61de8c842";
export interface ProjectClip { id: string; project: string; assetProject?: string; duration: number; title: string; caption: string; description: string; sourceFile?: string; sourceLabel?: string; sourceUrl?: string; sourceRange: string; audioNote: string; }
export const labProjects = [
  {
    slug: "building-immunology", title: "Building Immunology", shortTitle: "Building Immunology", topic: "Microbiomes · Building simulation · Room-level risk",
    subtitle: "Microbiomes. Digital twins. Healthier indoor environments.", description: "Microbial communities, building simulations and digital twins, and infection-risk visualization at the room level.",
    source: `${source}/_projects/Immunology.md`, credit: "",
    image: "building-immunity-preview.webp", imageWidth: 9437, imageHeight: 7087, imageAlt: "Building immunology concept connecting human well-being, pathogen modeling, indoor sensing, building control, and AI interaction.",
    abstract: "Buildings are shared habitats for people and microbial communities. This research brings microbial observations together with building simulation and digital-twin concepts to study indoor environments, visualize room-level exposure, and consider health alongside energy use and comfort.",
    heroClips: ["indoor-transport"], demoClips: ["building-layers"],
    sourceNotes: ["Building Immunology 1, slides 2–3: building-immunity concept, integrated modeling framework, and occupant–robot interaction photograph. The integrated AI-driven immune system is a research vision.", "Dreams, slide 1: Building M and Building T relative-abundance chart. Research Presentation, slide 12: school sampling and culture images. These are separate source examples; the slides do not establish that they share a single sample set.", "Building, slides 2–4: building models, spatial networks, and indoor simulation animations.", "Research Presentation, slides 3–5 and 8: modeling framework and room-level risk interface. Airborne transport and surface-mediated transmission are distinct modeling examples."]
  },
  {
    slug: "disinfection-robot", title: "Robotic Disinfection", shortTitle: "Robotic Disinfection", topic: "Robot perception · Navigation · Material-aware disinfection",
    subtitle: "See the surface. Adapt the response.", description: "Surface-material recognition, indoor mapping, and simulated robotic disinfection in built environments.",
    source: `${source}/_projects/Immunology.md`, credit: "",
    image: "disinfection-simulation.jpg", imageWidth: 1280, imageHeight: 720, imageAlt: "A simulated mobile manipulator positioned beside a hospital bed and nearby furniture.",
    abstract: "Robotic disinfection connects perception and navigation with decisions about how to treat a surface. This research presents a material-aware disinfection framework alongside separate examples of indoor mapping and robot motion in a simulated hospital room.",
    heroClips: ["disinfection-simulation", "robotic-perception"], demoClips: ["surface-materials", "adaptive-disinfection", "indoor-mapping"],
    sourceNotes: ["Animated_Infographics_May_09_2022.mp4: Wiley infographic for Hu and Li (2022), Recognizing object surface materials to adapt robotic disinfection in infrastructure facilities, DOI: 10.1111/mice.12811. Three silent excerpts retain the complete frame, original speed, and publisher credits.", "Building, slides 10–11: affordance-aware navigation and disinfection simulation. Research Presentation, slide 7: simulated robotic disinfection. These examples do not demonstrate a complete deployed system or measure pathogen removal."]
  },
  {
    slug: "surgery-ai", title: "Surgery AI", shortTitle: "Surgery AI", topic: "Minimally invasive surgery · Robotic vision",
    subtitle: "Position the camera. Preserve the view.", description: "Magnetically actuated camera assistance and biomimetic cleaning concepts for minimally invasive surgery.",
    source: `${source}/_projects/Surgery_AI.md`, credit: "",
    image: "surgery-cover.png", imageWidth: 617, imageHeight: 347, imageAlt: "Robot-mounted external actuator and an internal camera in an abdominal model.",
    abstract: "Minimally invasive surgery requires clear views within a confined workspace. This project studies robotic camera positioning and shape-changing mechanisms, alongside a proposed soft robotic cleaning system inspired by the human eye.",
    heroClips: ["camera-guidance", "bench-prototype"], demoClips: ["camera-assembly", "instrument-motion"],
    sourceNotes: ["Redefine Surgery Intelligence with TEAM, slides 2–5: team, mechanism diagrams, rendered motion, and laboratory prototype.", "UF Robotics Workshop — Shuai Li — ESSIE, slides 4–6: adaptive mechanisms, visual obstruction examples, soft nozzle, and proposed cleaning control. The cleaning concept is separate from the prototype footage."]
  },
  {
    slug: "robotic-block-assembly", title: "Robotic Block Assembly", shortTitle: "Robotic Block Assembly", topic: "Coastal construction · AMERICA",
    subtitle: "Interlocking modules for coastal structures.", description: "A concept for robot-assisted assembly of architected modules into coastal breakwaters.",
    source: "", credit: "",
    image: "breakwater-assembly.webp", imageWidth: 832, imageHeight: 571, imageAlt: "Rendered concept of a mobile robot placing interlocking modules along a breakwater.",
    abstract: "Architected modules connect material design with construction. This concept explores how robots could grasp, align, and interlock individual units to form coastal breakwaters, with joint geometry shaping the assembly sequence.",
    heroClips: [], demoClips: [],
    sourceNotes: ["UF Robotics Workshop — Shuai Li, slide 7: Architected Materials for Extreme Resistance in Coastal Applications (AMERICA), labeled Gulf Futures Challenge Award Phase I in the supplied deck. The page presents its design and assembly concepts."]
  },
];

export const projectClips: ProjectClip[] = [
  {
    id: "robotic-perception", project: "disinfection-robot", assetProject: "building-immunology", duration: 9,
    title: "Perception and disinfection in a robotic system", caption: "Perception and disinfection tools on an illustrated mobile robot.",
    description: "An animated mobile robot appears beside a surface. Labels identify a camera and LiDAR for perception and navigation, and UV, spray or wipe accessories for disinfection. The heading introduces adaptive, automated, routine disinfection. This is an illustrated overview of the research, not footage of a working robot. The Wiley logo, journal name, and Hu and Li (2022) paper credit remain along the bottom.",
    sourceLabel: "Wiley infographic supplied as Animated_Infographics_May_09_2022.mp4; Hu and Li (2022)", sourceUrl: "https://doi.org/10.1111/mice.12811", sourceRange: "00:08–00:17", audioNote: "This web excerpt omits the source audio. The visual content is described here and in the description track."
  },
  {
    id: "surface-materials", project: "disinfection-robot", assetProject: "building-immunology", duration: 10,
    title: "Why surface materials matter", caption: "Glass, fabric, and metal motivate different disinfection choices.",
    description: "Three labeled circular illustrations show glass, fabric and metal. Text explains that materials can affect pathogen growth, retention and transmission, and motivates cleaning methods that account for surface material. The illustrations introduce the problem; they do not provide a measured ranking of these materials. The Wiley and paper credits remain visible along the bottom.",
    sourceLabel: "Wiley infographic supplied as Animated_Infographics_May_09_2022.mp4; Hu and Li (2022)", sourceUrl: "https://doi.org/10.1111/mice.12811", sourceRange: "00:19.5–00:29.5", audioNote: "This web excerpt omits the source audio. Material names and the research motivation are available as text."
  },
  {
    id: "adaptive-disinfection", project: "disinfection-robot", assetProject: "building-immunology", duration: 21,
    title: "Material recognition and adaptive disinfection", caption: "Recognize the surface, model transmission, and adapt the disinfection action.",
    description: "The animation builds a left-to-right workflow. Pictures of a table, bed and window feed a deep learning network using multi-level feature fusion and texture features. Its outputs identify glass, fabric and metal. A second diagram connects identified materials with pathogen survivability on a surface, surface-to-hand transfer, and hand-to-mucous transfer. Arrows then lead to a suitable disinfection dosage. The completed panel summarizes adapted procedures and dose. The labeled arrows carry meaning independently of color. This is an animated explanation of the published framework, not a recorded robot experiment; the Wiley and paper credits are preserved.",
    sourceLabel: "Wiley infographic supplied as Animated_Infographics_May_09_2022.mp4; Hu and Li (2022)", sourceUrl: "https://doi.org/10.1111/mice.12811", sourceRange: "00:32–00:53", audioNote: "This web excerpt omits the source audio. A complete text alternative and timed visual descriptions accompany the animation."
  },
  {
    id: "indoor-transport", project: "building-immunology", assetProject: "building-digital-twin", duration: 9.067,
    title: "Indoor transport in a building model", caption: "A room-scale view of simulated transport.",
    description: "A camera moves through a digital building with desks, chairs, partitions, and overhead services. Green particle-like traces appear around rooms and passages. The view reveals how spatial boundaries and transport are represented in the animation. The colors are visual layers, not a numerical risk scale. This is a recorded model visualization rather than a live forecast.",
    sourceLabel: "Building, slide 4, embedded image24.gif", sourceRange: "complete animation", audioNote: "Silent source animation, converted to a video with native controls."
  },
  {
    id: "building-layers", project: "building-immunology", assetProject: "building-digital-twin", duration: 4.734,
    title: "Building layers from above", caption: "A complementary view across rooms and model layers.",
    description: "An overhead camera moves across the same indoor model. Furniture, room boundaries, overhead elements, and colored overlays become visible from above. This recorded model view complements the room-scale animation. The source does not supply a risk legend for these overlays, so their colors should not be interpreted as infection-risk categories.",
    sourceLabel: "Building, slide 4, embedded image25.gif", sourceRange: "complete animation", audioNote: "Silent source animation, converted to a video with native controls."
  },
  {
    id: "indoor-mapping", project: "disinfection-robot", assetProject: "building-digital-twin", duration: 12,
    title: "An indoor map taking shape", caption: "A recorded mapping sequence reveals indoor geometry.",
    description: "A point-cloud-like indoor map expands against a white background as the recorded view changes. Walls, floor regions, and objects appear as colored clusters. The sequence is from the source presentation’s affordance-aware navigation section. It illustrates a spatial representation used in a robotic setting; its colors do not encode infection risk.",
    sourceLabel: "Building, slide 10, embedded media5.mov", sourceRange: "00:08–00:20", audioNote: "The source has no audio track."
  },
  {
    id: "disinfection-simulation", project: "disinfection-robot", assetProject: "building-digital-twin", duration: 12,
    title: "A robotic response in simulation", caption: "A simulated robot approaches surfaces in a hospital room.",
    description: "A mobile robot with an arm moves near a bed and furniture in a rendered hospital room. A small inset provides a second view. The excerpt shows motion and positioning as part of a simulated disinfection scenario. It does not measure pathogen removal or demonstrate a live connection to the separate building risk models.",
    sourceLabel: "Building, slide 11 / Research Presentation, slide 7", sourceRange: "00:19–00:31", audioNote: "This web excerpt omits source audio and presents the full visual scene at its original speed."
  },
  {
    id: "camera-guidance", project: "surgery-ai", duration: 12,
    title: "External actuation and internal camera motion", caption: "A rendered view connects an external actuator with an internal camera.",
    description: "A split-screen computer animation shows an external actuator moving above an abdominal surface on the left and a capsule-like camera below the wall on the right. Curved lines depict the actuator–camera relationship. As the external device changes position, the internal camera changes its position or orientation. Black margins from the original video remain visible. The image represents a simulated hardware concept, not footage of a patient or a clinical outcome.",
    sourceFile: "assets/video/surgery_ai/video_1.mp4", sourceRange: "00:36–00:48", audioNote: "The source audio track is digitally silent; it is omitted from the web excerpt.",
  },
  {
    id: "bench-prototype", project: "surgery-ai", duration: 8.8,
    title: "Robot-mounted actuator in a laboratory setup", caption: "The physical robot moves above a benchtop abdominal model.",
    description: "A fixed laboratory camera faces an open, curved abdominal model on a table. A robot-mounted actuator above the model shifts position and orientation as part of the robot arm moves at the right of the frame. Fixtures, supports, and laboratory equipment remain visible. This clip shows an external benchtop setup; it does not show surgery on a person or quantify positioning accuracy. The complete frame and original motion speed are retained.",
    sourceFile: "assets/video/surgery_ai/video_2.mp4", sourceRange: "00:00–00:08.8", audioNote: "The web excerpt is silent; source laboratory sounds are omitted. No spoken instruction is used in this presentation.",
  },
  {
    id: "camera-assembly", project: "surgery-ai", duration: 12,
    title: "Inside the camera concept", caption: "An exploded animation reveals the camera’s component arrangement.",
    description: "Against a black background, a capsule-like camera separates into aligned components. Transparent outer pieces, a cylindrical body, a circuit-board-like component, rings, and end parts appear along the same axis. The viewpoint changes slightly while the assembly remains centered. This is an excerpt of the same concept animation used for the title’s actuator-and-camera view.",
    sourceFile: "assets/video/surgery_ai/video_1.mp4", sourceRange: "00:05–00:17", audioNote: "The source audio track is digitally silent; it is omitted from the web excerpt.",
  },
  {
    id: "instrument-motion", project: "surgery-ai", duration: 12,
    title: "Rendered instrument motion", caption: "Complementary rendered views show an instrument changing configuration.",
    description: "A split-screen animation shows a black articulated instrument within a rendered abdominal environment. The left panel offers a close view of its distal elements changing angle; the right panel shows the same motion within a wider anatomical scene. The instrument opens and changes configuration while the viewpoint remains largely fixed. These are rendered views, not a clinical procedure, and no performance metric is displayed.",
    sourceFile: "assets/video/surgery_ai/video_3.mp4", sourceRange: "00:07–00:19", audioNote: "The source audio track is digitally silent; it is omitted from the web excerpt.",
  },
];


export const immunologyPublications = [
  "Xu, Y., Chen, J., Cai, J., Li, S., & He, Q. (2023). Simulation-based trade-off modeling for indoor infection risk of airborne diseases, energy consumption, and thermal comfort. Journal of Building Engineering, 76, 107137.",
  "Xu, Y., Li, S., He, Q., Zhu, S., & Cai, J. (2022, December). Assessing Transmission Risks of SARS-COV-2 Omicron Variant In US School Facilities and Mitigation Measures. In 2022 Winter Simulation Conference (WSC) (pp. 629–640). IEEE.",
  "Cai, J., Li, S., Hu, D., Xu, Y., & He, Q. (2022). Nationwide assessment of energy costs and policies to limit airborne infection risks in US schools. Journal of Building Engineering, 45, 103533.",
  "Xu, Y., Cai, J., Li, S., He, Q., & Zhu, S. (2021). Airborne infection risks of SARS-CoV-2 in US schools and impacts of different intervention strategies. Sustainable Cities and Society, 74, 103188.",
  "Cao, L., Yang, L., Swanson, C. S., Li, S., & He, Q. (2021). Comparative analysis of impact of human occupancy on indoor microbiomes. Frontiers of Environmental Science & Engineering, 15(5), 89.",
  "Li, S., Yang, Z., Hu, D., Cao, L., & He, Q. (2021). Understanding building-occupant-microbiome interactions toward healthy built environments: A review. Frontiers of Environmental Science & Engineering, 15(4), 65.",
  "Li, S., Xu, Y., Cai, J., Hu, D., & He, Q. (2021). Integrated environment-occupant-pathogen information modeling to assess and communicate room-level outbreak risks of infectious diseases. Building and Environment, 187, 107394.",
];
