export const profile = {
  name: "Songyang Liu",
  email: "liusongyang@ufl.edu",
  github: "https://github.com/cgchrfchscyrh",
  linkedin: "https://www.linkedin.com/in/songyang-liu-6195a41a0/",
  updated: "October 2026",
};

export const education = [
  {
    school: "University of Florida",
    degree: "Ph.D. student, Civil and Coastal Engineering",
    dates: "Jan. 2025 – present",
    location: "Gainesville, FL",
    courses: "Intelligent Transportation Systems",
  },
  {
    school: "University of Tennessee, Knoxville",
    degree: "M.S. in Civil Engineering; doctoral studies",
    dates: "Aug. 2021 – Dec. 2024",
    location: "Knoxville, TN",
    courses: "Deep Learning, Reinforcement Learning, Computer Vision",
  },
  {
    school: "University of Florida",
    degree: "M.S. in Electrical and Computer Engineering",
    dates: "Aug. 2019 – May 2021",
    location: "Gainesville, FL",
    courses:
      "Linux Systems Programming, Machine Learning, Internet of Things, Wireless Networks",
  },
  {
    school: "Beijing Institute of Technology",
    degree: "B.S. in Telecommunication Engineering",
    dates: "Sept. 2015 – July 2019",
    location: "Beijing, China",
    courses: "Computer Principles, Communication Networks, FPGA",
  },
];

export const research = [
  {
    id: "roofing",
    title:
      "Learning Slope-Adaptive Whole-Body Locomotion for Humanoid Robots in Roofing Construction",
    authors: ["Songyang Liu", "Shuai Li"],
    venue: "arXiv preprint, 2026",
    label: "Humanoid locomotion",
    description:
      "Learning coordinated slope traversal, working postures, and tool positioning from human roofing demonstrations.",
    image: "roofing.png",
    width: 1638,
    height: 917,
    alt: "Four sequences of a Unitree G1 stepping, bending, and reaching on a laboratory slope while attached to a safety hoist.",
    detail:
      "The physical experiments demonstrate four roofing-style motions on a laboratory slope. These are controlled experiments, not autonomous deployment on a construction roof.",
    project: "https://cgchrfchscyrh.github.io/humanoid_roofing_webpage/",
    paper: "https://arxiv.org/abs/2609.20558v1",
    code: "",
  },
  {
    id: "hoist",
    title:
      "HOIST: Humanoid Optimization with Imitation and Sample-Efficient Tuning for Manipulating Suspended Loads",
    authors: ["Songyang Liu", "Shunyu Yao", "Dingyuan Huang", "Shuai Li"],
    venue: "Research manuscript / arXiv preprint, 2026",
    label: "Whole-body manipulation",
    description:
      "Combining VR demonstrations, vision-language-action policies, and reinforcement learning to guide suspended loads with a humanoid robot.",
    image: "hoist-comparison.png",
    width: 1651,
    height: 842,
    alt: "Three physical humanoid trials, labeled VLA-50, VLA-80, and HOIST, guiding a suspended block toward a marked platform.",
    detail:
      "The comparison shows the placement task on a real humanoid platform. The robot guides a cable-suspended load; the crane supports its weight. Evaluation details and numerical results are available on the project page.",
    project: "https://cgchrfchscyrh.github.io/humanoid-hoisting/",
    paper: "https://arxiv.org/abs/2606.00252",
    code: "",
  },
  {
    id: "mixed-traffic",
    title:
      "Large-Scale Mixed-Traffic and Intersection Control using Multi-agent Reinforcement Learning",
    authors: ["Songyang Liu", "Muyang Fan", "Weizi Li", "Jing Du", "Shuai Li"],
    venue: "IEEE/RSJ IROS, 2025",
    label: "Multi-agent learning",
    description:
      "Coordinating human-driven and robot vehicles across a simulated urban network of 14 intersections.",
    image: "mixed-traffic.png",
    width: 735,
    height: 444,
    alt: "Map of the 14-intersection Colorado Springs study network, with numbered intersections and enlarged road layouts.",
    detail:
      "The network combines traffic-signal-controlled intersections with intersections regulated by reinforcement-learning-controlled vehicles. The experiments use SUMO simulation; the map identifies the road network rather than a real vehicle deployment.",
    project: "https://cgchrfchscyrh.github.io/mixed_traffic/",
    paper: "https://doi.org/10.1109/IROS60139.2025.11245805",
    code: "https://github.com/cgchrfchscyrh/MixedTrafficControl_IROS",
  },
  {
    id: "evtol",
    title:
      "Reinforcement learning based multi-perspective motion planning of manned electric vertical take-off and landing vehicle in urban environment with wind fields",
    authors: ["Songyang Liu", "Weizi Li", "Haochen Li", "Shuai Li"],
    venue:
      "Engineering Applications of Artificial Intelligence, 149:110392, 2025",
    label: "Learning for flight",
    description:
      "Planning urban eVTOL flight through wind fields while considering safety, travel time, passenger comfort, energy, and noise.",
    image: "evtol.png",
    width: 1571,
    height: 657,
    alt: "Reinforcement learning framework connecting the urban wind environment, aircraft state, policy, rewards, and actor–critic training.",
    detail:
      "The policy chooses an action from the aircraft state. The environment returns the next state and a reward. Training updates the policy using sampled experiences, with rewards that account for collision and boundary constraints, energy use, time, and reaching the target. Labeled objectives also include comfort and environmental noise.",
    project: "https://cgchrfchscyrh.github.io/eVTOL_webpage/",
    paper: "https://doi.org/10.1016/j.engappai.2025.110392",
    code: "",
  },
];

export const otherPapers = [
  {
    title:
      "Learning Spatial Awareness for Laparoscopic Surgery with AI Assisted Visual Feedback",
    authors: ["Songyang Liu", "Yunpeng Tan", "Shuai Li"],
    venue: "IEEE International Conference on Intelligent Reality (ICIR), 2025",
    url: "https://arxiv.org/abs/2511.02233",
    link: "Preprint",
    award: "Best Paper Award, ICIR 2025",
  },
  {
    title:
      "Origin-Destination Pattern Effects on Large-Scale Mixed Traffic Control via Multi-Agent Reinforcement Learning",
    authors: ["Muyang Fan", "Songyang Liu", "Shuai Li", "Weizi Li"],
    venue:
      "IEEE International Conference on Intelligent Transportation Systems (ITSC), 2025",
    url: "https://its.papercept.net/conferences/scripts/abstract.pl?ConfID=91&Number=294",
    link: "Conference abstract",
    award: "",
  },
  {
    title:
      "Teleoperation-Driven and Keyframe-Based Generalizable Imitation Learning for Construction Robots",
    authors: [
      "Yan Li",
      "Songyang Liu",
      "Mengjun Wang",
      "Shuai Li",
      "Jindong Tan",
    ],
    venue: "Journal of Computing in Civil Engineering, 38(6):04024031, 2024",
    url: "https://doi.org/10.1061/JCCEE5.CPENG-5884",
    link: "Paper",
    award: "Best Paper Award, Journal of Computing in Civil Engineering",
  },
];

export function asset(path: string) {
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
