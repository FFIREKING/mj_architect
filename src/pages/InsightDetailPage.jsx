import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import './InsightDetailPage.css';

const insightData = {
  'sustainable-architecture': {
    title: 'The Future of Sustainable Architecture in 2026',
    category: 'Design Trends',
    date: 'December 15, 2025',
    author: 'Sarah Johnson, AIA',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1920&q=80',
    content: [
      {
        type: 'intro',
        text: 'As we approach 2026, sustainable architecture has evolved from a niche consideration to a fundamental requirement in modern building design. The integration of eco-friendly practices, renewable materials, and energy-efficient systems is reshaping how we conceive and construct our built environment.'
      },
      {
        type: 'heading',
        text: 'Passive Cooling and Natural Ventilation'
      },
      {
        type: 'paragraph',
        text: 'One of the most significant trends is the resurgence of passive cooling strategies. Modern architects are drawing inspiration from traditional building techniques while incorporating cutting-edge technology to create structures that naturally regulate temperature without excessive energy consumption.'
      },
      {
        type: 'paragraph',
        text: 'Cross-ventilation, thermal mass, and strategic shading are being integrated into designs in innovative ways. Buildings are being oriented to maximize natural airflow, with operable windows and ventilation shafts that harness prevailing winds to cool interior spaces.'
      },
      {
        type: 'heading',
        text: 'Renewable and Recycled Materials'
      },
      {
        type: 'paragraph',
        text: 'The materials revolution is transforming construction. Timber is experiencing a renaissance with the advent of cross-laminated timber (CLT) and glulam beams, enabling the construction of tall wooden buildings that sequester carbon rather than producing it.'
      },
      {
        type: 'list',
        items: [
          'Recycled concrete aggregates reducing waste',
          'Bio-based insulation materials like hemp and mycelium',
          'Low-carbon cement alternatives',
          'Reclaimed materials for interior finishes',
          'Solar-integrated building materials'
        ]
      },
      {
        type: 'heading',
        text: 'Net-Zero Energy Buildings'
      },
      {
        type: 'paragraph',
        text: 'The push toward net-zero energy buildings is accelerating. These structures produce as much energy as they consume through a combination of highly efficient building envelopes, renewable energy generation, and intelligent energy management systems.'
      },
      {
        type: 'paragraph',
        text: 'Photovoltaic systems are being integrated seamlessly into building facades, roofs, and even windows. Geothermal heat pumps, combined with thermal storage systems, are providing efficient heating and cooling solutions.'
      },
      {
        type: 'heading',
        text: 'Looking Ahead'
      },
      {
        type: 'paragraph',
        text: 'The future of sustainable architecture lies in holistic design approaches that consider the entire lifecycle of buildings - from material sourcing and construction to operation and eventual deconstruction. As technology advances and awareness grows, we are moving toward a built environment that works in harmony with nature rather than against it.'
      }
    ]
  },
  'urban-transformation': {
    title: 'Transforming Urban Spaces: Mixed-Use Development Success',
    category: 'Case Study',
    date: 'December 10, 2025',
    author: 'Michael Chen, PE',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80',
    content: [
      {
        type: 'intro',
        text: 'Mixed-use developments are redefining urban living by creating vibrant, walkable neighborhoods that integrate residential, commercial, and recreational spaces. This case study explores the principles and practices behind successful urban transformation projects.'
      },
      {
        type: 'heading',
        text: 'The Vision: Creating Complete Communities'
      },
      {
        type: 'paragraph',
        text: 'The most successful mixed-use developments share a common vision: creating complete communities where people can live, work, shop, and socialize without needing to travel long distances. This approach reduces traffic congestion, promotes social interaction, and creates more sustainable urban environments.'
      },
      {
        type: 'heading',
        text: 'Design Principles'
      },
      {
        type: 'paragraph',
        text: 'Effective mixed-use developments are built on several key design principles that ensure functionality, accessibility, and community engagement.'
      },
      {
        type: 'list',
        items: [
          'Vertical integration of different uses',
          'Pedestrian-oriented street design',
          'Active ground-floor uses',
          'Public spaces and green areas',
          'Transit connectivity',
          'Diverse housing options'
        ]
      },
      {
        type: 'heading',
        text: 'Economic and Social Benefits'
      },
      {
        type: 'paragraph',
        text: 'Mixed-use developments generate significant economic benefits for communities. By concentrating diverse activities in one area, they create synergies that benefit residents, businesses, and the broader community. The constant foot traffic supports local businesses, while the variety of amenities enhances property values.'
      },
      {
        type: 'paragraph',
        text: 'Socially, these developments foster community connections. When people live, work, and play in the same neighborhood, they are more likely to form relationships and develop a sense of belonging. Public spaces become natural gathering points, hosting events and daily interactions that strengthen community bonds.'
      },
      {
        type: 'heading',
        text: 'Challenges and Solutions'
      },
      {
        type: 'paragraph',
        text: 'Developing successful mixed-use projects requires careful planning and coordination. Zoning regulations, parking requirements, and the need to balance different uses can present challenges. However, innovative planning approaches, community engagement, and flexible design solutions can address these obstacles.'
      },
      {
        type: 'paragraph',
        text: 'The key is maintaining flexibility while ensuring that all components work together harmoniously. This includes managing noise and activity levels, providing adequate infrastructure, and creating spaces that serve multiple purposes throughout the day.'
      }
    ]
  },
  'structural-innovation': {
    title: 'Innovative Structural Solutions for High-Rise Buildings',
    category: 'Architecture Insights',
    date: 'December 5, 2025',
    author: 'Dr. Emily Rodriguez, SE',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
    content: [
      {
        type: 'intro',
        text: 'The race to build taller and more efficient high-rise structures has driven remarkable innovations in structural architecture. From advanced materials to cutting-edge design techniques, architects and engineers are pushing the boundaries of what\'s possible in vertical construction.'
      },
      {
        type: 'heading',
        text: 'Advanced Structural Systems'
      },
      {
        type: 'paragraph',
        text: 'Modern high-rise buildings employ sophisticated structural systems that optimize strength while minimizing material use. Outrigger systems, diagrid structures, and tube-in-tube designs distribute loads efficiently, allowing for greater heights and more flexible interior spaces.'
      },
      {
        type: 'heading',
        text: 'Seismic Resilience'
      },
      {
        type: 'paragraph',
        text: 'Earthquake-resistant design has evolved significantly. Base isolation systems, dampers, and flexible joints allow buildings to absorb and dissipate seismic energy. Some structures incorporate tuned mass dampers - massive pendulums that counteract building movement during earthquakes and high winds.'
      },
      {
        type: 'list',
        items: [
          'Viscous fluid dampers for energy dissipation',
          'Base isolation bearings',
          'Buckling-restrained braces',
          'Self-centering systems',
          'Real-time structural monitoring'
        ]
      },
      {
        type: 'heading',
        text: 'High-Performance Materials'
      },
      {
        type: 'paragraph',
        text: 'The development of ultra-high-performance concrete, high-strength steel, and fiber-reinforced composites has revolutionized high-rise construction. These materials offer superior strength-to-weight ratios, enabling slender profiles and reduced foundation requirements.'
      },
      {
        type: 'heading',
        text: 'Digital Design and Analysis'
      },
      {
        type: 'paragraph',
        text: 'Computational tools and Building Information Modeling (BIM) have transformed how engineers design and analyze structures. Finite element analysis, wind tunnel simulations, and parametric design allow for optimization that would be impossible with traditional methods.'
      },
      {
        type: 'paragraph',
        text: 'These technologies enable engineers to test thousands of design variations, predict building behavior under extreme conditions, and identify the most efficient structural solutions before construction begins.'
      }
    ]
  },
  'adaptive-reuse': {
    title: 'Adaptive Reuse: Breathing New Life into Historic Structures',
    category: 'Project Spotlight',
    date: 'November 28, 2025',
    author: 'James Patterson, AIA, LEED AP',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=80',
    content: [
      {
        type: 'intro',
        text: 'Adaptive reuse projects represent the intersection of preservation, sustainability, and innovation. By transforming historic structures for modern uses, architects and engineers honor the past while building for the future.'
      },
      {
        type: 'heading',
        text: 'The Value of Historic Preservation'
      },
      {
        type: 'paragraph',
        text: 'Historic buildings embody cultural heritage and architectural craftsmanship that cannot be replicated. Adaptive reuse preserves this heritage while reducing the environmental impact of new construction. The embodied energy in existing structures represents decades of materials and labor - resources we cannot afford to waste.'
      },
      {
        type: 'heading',
        text: 'Technical Challenges'
      },
      {
        type: 'paragraph',
        text: 'Converting historic structures requires careful consideration of structural integrity, building codes, and modern requirements. Engineers must assess existing conditions, strengthen inadequate systems, and integrate new infrastructure while respecting historic character.'
      },
      {
        type: 'list',
        items: [
          'Structural evaluation and strengthening',
          'Seismic retrofitting',
          'MEP systems integration',
          'Accessibility improvements',
          'Energy efficiency upgrades',
          'Historic preservation compliance'
        ]
      },
      {
        type: 'heading',
        text: 'Successful Conversion Strategies'
      },
      {
        type: 'paragraph',
        text: 'The most successful adaptive reuse projects celebrate existing features while creatively addressing modern needs. Exposed structural elements, restored facades, and retained architectural details provide character and authenticity that new construction cannot match.'
      },
      {
        type: 'paragraph',
        text: 'Finding compatible new uses is crucial. Industrial buildings convert well to offices, apartments, or cultural spaces. Churches become community centers or event venues. Warehouses transform into vibrant mixed-use developments. The key is matching the building\'s characteristics to appropriate programs.'
      },
      {
        type: 'heading',
        text: 'Sustainability Benefits'
      },
      {
        type: 'paragraph',
        text: 'Adaptive reuse is inherently sustainable. It reduces demolition waste, preserves embodied carbon, and often requires less new material than ground-up construction. When combined with energy-efficient upgrades and renewable systems, historic buildings can meet modern sustainability standards while retaining their character.'
      }
    ]
  },
  'smart-buildings': {
    title: 'Smart Buildings: Integrating IoT and AI in Modern Architecture',
    category: 'Industry Report',
    date: 'November 20, 2025',
    author: 'Dr. Priya Sharma, PhD',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80',
    content: [
      {
        type: 'intro',
        text: 'The convergence of Internet of Things (IoT) technology and artificial intelligence is revolutionizing how buildings operate, respond to occupants, and manage resources. Smart buildings represent the future of architectural design and facility management.'
      },
      {
        type: 'heading',
        text: 'Intelligent Building Systems'
      },
      {
        type: 'paragraph',
        text: 'Modern smart buildings integrate thousands of sensors and connected devices that monitor and control virtually every aspect of building operation. From HVAC and lighting to security and space utilization, these systems work together to optimize performance and occupant comfort.'
      },
      {
        type: 'heading',
        text: 'AI-Driven Optimization'
      },
      {
        type: 'paragraph',
        text: 'Artificial intelligence analyzes data from building systems to identify patterns, predict needs, and make real-time adjustments. Machine learning algorithms continuously improve system performance, reducing energy consumption while enhancing comfort.'
      },
      {
        type: 'list',
        items: [
          'Predictive maintenance reducing downtime',
          'Occupancy-based HVAC and lighting control',
          'Energy consumption optimization',
          'Automated space allocation',
          'Indoor air quality management',
          'Integrated security and access control'
        ]
      },
      {
        type: 'heading',
        text: 'Occupant Experience'
      },
      {
        type: 'paragraph',
        text: 'Smart buildings put occupants in control through mobile apps and voice interfaces. Users can adjust lighting and temperature in their spaces, book meeting rooms, find colleagues, and receive personalized navigation assistance. This level of customization enhances satisfaction and productivity.'
      },
      {
        type: 'heading',
        text: 'Operational Efficiency'
      },
      {
        type: 'paragraph',
        text: 'Building operators benefit from comprehensive dashboards that provide real-time visibility into all systems. Predictive analytics identify potential issues before they become problems, while automated systems handle routine adjustments. This reduces operational costs and extends equipment lifespans.'
      },
      {
        type: 'heading',
        text: 'Sustainability Impact'
      },
      {
        type: 'paragraph',
        text: 'Smart building technology delivers measurable sustainability benefits. Energy consumption typically decreases by 20-30% through optimization and automated control. Water usage is monitored and managed to prevent waste. Real-time data enables continuous improvement in environmental performance.'
      },
      {
        type: 'heading',
        text: 'The Future of Smart Buildings'
      },
      {
        type: 'paragraph',
        text: 'As technology advances, buildings will become increasingly intelligent and responsive. Integration with smart city infrastructure, autonomous systems, and advanced analytics will create structures that adapt continuously to changing needs. The buildings of tomorrow will be living organisms that learn, evolve, and optimize themselves.'
      }
    ]
  }
  ,
  'seattles-office-to-residential-future': {
    title: 'Seattle’s Office-to-Residential Future: How Policy and Design Will Transform Downtown',
    category: 'Trends to Watch',
    author: 'JP Emery and Bruce Kinnan',
    image: 'https://static1.gensler.com/uploads/image/103937/1765905846632/Pearl_House_N69_1024.jpg',
    imageAlt: 'A person walking in a room.',
    content: [
      {
        type: 'intro',
        text: 'A combination of code changes, design expertise, and market conditions is proving that now is the time to start planning new housing in Downtown Seattle.',
      },
      { type: 'heading', text: 'What’s Changing' },
      {
        type: 'paragraph',
        text: 'Policy updates and new conversion pathways are opening doors for office-to-residential transformation—helping underused buildings find new purpose as housing.'
      },
      { type: 'heading', text: 'How Design Helps' },
      {
        type: 'list',
        items: [
          'Evaluate floorplate depth, core placement, and daylight potential',
          'Plan unit layouts that work with existing structural grids',
          'Upgrade building systems strategically for long-term performance',
          'Improve ground-floor experience to support neighborhood vitality',
        ],
      },
    ],
  },
  'trends-to-watch-airports-and-aviation': {
    title: 'Trends to Watch: What’s Next for Airports and Aviation',
    category: 'Airports + Aviation',
    author: 'William Jenkinson, Charles G. Morley, and Tim Sullivan',
    image: 'https://static1.gensler.com/uploads/image/103838/1764977164653/PIT_N19_1024.jpg',
    imageAlt: 'People walking in a large building.',
    content: [
      {
        type: 'intro',
        text: "Ardent's Aviation leaders take a closer look at the trends shaping the future of travel, and what’s next for the industry.",
      },
      { type: 'heading', text: 'Themes We’re Tracking' },
      {
        type: 'list',
        items: [
          'Passenger experience upgrades with clearer journeys and better dwell time',
          'Operational resilience and flexible planning for disruption',
          'Sustainability strategies that show up in both design and performance',
          'Digital + physical integration that reduces friction across the trip',
        ],
      },
    ],
  },
  'trends-to-watch-sports': {
    title: 'Trends to Watch Shaping the Future of Sports',
    category: 'Sports',
    author: 'Ardent Sports Leaders',
    image: 'https://static2.gensler.com/uploads/image/103848/1765228455459/Al-Ahly-Stadium_aerial_1024.jpg',
    imageAlt: 'A large crowd of people at a beach.',
    content: [
      {
        type: 'intro',
        text: 'Ardent’s Sports leaders explore the design trends redefining the next era of sports design, from fan-first districts to athlete-driven spaces.',
      },
      { type: 'heading', text: 'What’s Emerging' },
      {
        type: 'list',
        items: [
          'Fan-first mixed-use districts that extend the game-day experience',
          'Training + performance environments built around wellness',
          'Flexible venues that adapt to multiple event types',
          'Premium hospitality that still feels authentic and local',
        ],
      },
    ],
  },
  'workplace-trends-2026': {
    title: '10 Workplace Trends for 2026: What’s In and What’s Out?',
    category: 'Workplace',
    author: 'Janet Pogue McLaurin and Louis Schump',
    image: 'https://static1.gensler.com/uploads/image/103815/1764884329663/BioMed_Realty_1024x576.jpg',
    imageAlt: 'A group of people in a room.',
    content: [
      {
        type: 'intro',
        text: 'This is the year of bold moves, human-first thinking, and AI that doesn’t just answer questions but joins the team.',
      },
      { type: 'heading', text: 'What’s In' },
      {
        type: 'list',
        items: [
          'Experience-led space planning',
          'Flexibility with clear purpose (not chaos)',
          'Spaces that support mentorship and community',
          'Tools and policies that match the physical environment',
        ],
      },
    ],
  },
  'design-can-advance-diverse-nonprofit-missions': {
    title: 'How Design Can Advance Diverse Nonprofit Missions',
    category: 'Community',
    author: 'Jay Chokshi',
    image: 'https://static1.gensler.com/uploads/image/103658/1764197201241/Covenant-House-Texas_Gay_15_1024.jpg',
    imageAlt: 'A courtyard with a brick walkway and a building with a tree and people.',
    content: [
      {
        type: 'intro',
        text: 'Nonprofits can use architecture and design strategies in campus development to amplify their mission impact and operational excellence',
      },
      { type: 'heading', text: 'Design Strategies' },
      {
        type: 'list',
        items: [
          'Plan for program adjacencies and smooth service delivery',
          'Create welcoming spaces that build trust and dignity',
          'Use flexible rooms that can evolve with changing needs',
          'Align investment with measurable mission outcomes',
        ],
      },
    ],
  },
  'nokia-new-r-and-d-campus-canada-tech-ecosystem': {
    title: 'How Nokia’s New R&D Campus Raises the Bar for Canada’s Tech Ecosystem',
    category: 'Technology',
    author: 'Kevin Katigbak and Sarah Taylor',
    image: 'https://static2.gensler.com/uploads/image/103758/1764713397397/NOIC-StreetLevel-1024px.jpg',
    imageAlt: 'A building with a parking lot.',
    content: [
      {
        type: 'intro',
        text: 'The company’s new space in Ottawa replaces the traditional workplace model with one centered on employee experience.',
      },
      { type: 'heading', text: 'R&D Environments That Perform' },
      {
        type: 'list',
        items: [
          'Collaboration settings that reduce handoff friction',
          'Spaces that support focus work alongside team prototyping',
          'Amenities that keep talent engaged and supported',
        ],
      },
    ],
  },
  'trends-to-watch-global-events-build-magnetic-place-brands': {
    title: 'Trends to Watch: How Global Events Build Magnetic Place Brands',
    category: 'Trends to Watch',
    author: 'Amy Bixler and Janice Cavaliere',
    image: 'https://static2.gensler.com/uploads/image/103527/1763768035376/Seattle_Mariners_N6_1024.jpg',
    imageAlt: 'People crossing a street.',
    content: [
      {
        type: 'intro',
        text: 'From the Super Bowl to the FIFA World Cup, marquee events transform urban environments into platforms that amplify civic pride and create lasting impact.',
      },
      { type: 'heading', text: 'Why It Matters' },
      {
        type: 'paragraph',
        text: 'Global events can accelerate investment, sharpen identity, and create places that remain valuable long after the final whistle—when planning focuses on community legacy.'
      },
    ],
  },
  'transforming-pier-94': {
    title: 'Transforming Pier 94: A Collaborative Journey in Sustainable Design and Adaptive Reuse',
    category: 'Community',
    author: 'Keith Hanadel in conversation with Leslie Jabs, Stephen Newbold, and John Wiedner',
    image: 'https://static2.gensler.com/uploads/image/98947/Sunset-Pier-94_HERO-1024px_1752536098.jpg',
    imageAlt: 'A building with a sign on it.',
    content: [
      {
        type: 'intro',
        text: 'Pier 94 on Manhattan’s Hudson River waterfront will soon be home to New York City’s first purpose-built, state-of-the-art film and television production facility: Sunset Pier 94 Studios.',
      },
      { type: 'heading', text: 'Adaptive Reuse at Scale' },
      {
        type: 'paragraph',
        text: 'Transforming industrial waterfront assets into next-generation production environments demands close coordination across design, engineering, and operations—balancing sustainability, speed, and performance.'
      },
    ],
  },
};

export default function InsightDetailPage() {
  const { slug } = useParams();
  const insight = insightData[slug];

  if (!insight) {
    return (
      <div className="insight-detail">
        <PageHero 
          title="Blog Not Found"
          subtitle="The post you're looking for doesn't exist"
        />
        <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <Link to="/insights" className="back-link">← Back to Blogs</Link>
        </div>
      </div>
    );
  }

  const meta = [insight.category, insight.date, insight.author ? `By ${insight.author}` : null].filter(Boolean);

  return (
    <div className="insight-detail">
      <PageHero 
        title={insight.title}
        subtitle={meta.join(' • ')}
        backgroundImage={insight.image}
        backgroundAlt={insight.imageAlt || insight.title}
      />

      <article className="insight-content">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="insight-header-image">
              <img src={insight.image} alt={insight.imageAlt || insight.title} />
            </div>

            <div className="insight-body">
              {insight.content.map((block, index) => {
                if (block.type === 'intro') {
                  return (
                    <p key={index} className="intro-text">{block.text}</p>
                  );
                }
                if (block.type === 'heading') {
                  return (
                    <h2 key={index} className="content-heading">{block.text}</h2>
                  );
                }
                if (block.type === 'paragraph') {
                  return (
                    <p key={index} className="content-paragraph">{block.text}</p>
                  );
                }
                if (block.type === 'list') {
                  return (
                    <ul key={index} className="content-list">
                      {block.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}

              <div className="insight-footer">
                <Link to="/insights" className="back-link">
                  ← Back to All Blogs
                </Link>
                <Link to="/contact" className="contact-link">
                  Discuss Your Project →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
}

