import { motion } from 'framer-motion'
import {
  MapPin,
  Mail,
  Globe,
  Linkedin,
  Calendar,
  Building2,
  GraduationCap,
  Award,
  ExternalLink,
  Briefcase,
  Cloud,
  Database,
  Brain,
  Shield,
  Code,
  BookOpen,
} from 'lucide-react'

const Profile = () => {
  const experience = [
    {
      role: 'Data & AI Platform Architect',
      company: 'Allianz Global Investors',
      type: 'Contract',
      period: 'Apr 2024 - Present',
      location: 'Frankfurt (Remote)',
      description: 'Architecting, provisioning & managing the Databricks AI & Data Platform that underpins all of Allianz Global Investors. Currently focusing on AI Agents & Compliance.',
      skills: ['Databricks', 'AI Agents', 'Data Platform', 'Compliance', 'Azure'],
    },
    {
      role: 'AI & Data Architect',
      company: 'Edge AI',
      type: 'Self-employed',
      period: 'Jul 2023 - Present',
      location: 'London (Hybrid)',
      description: 'Designed and built a cutting-edge financial analysis AI assistant leveraging GPT-4, Gemini, Claude, Mistral, and fine-tuned Llama 2. Implemented RAG, LlamaIndex, and Langchain. Deployed across GCP (Vertex AI), AWS (Bedrock), and Azure (AI Studio).',
      skills: ['GenAI', 'RAG', 'LangChain', 'Pinecone', 'GPT-4', 'Claude', 'Multi-Cloud'],
    },
    {
      role: 'Lead Cloud & Data Architect',
      company: 'Howden Group Holdings',
      type: 'Contract',
      period: 'Aug 2020 - Aug 2023',
      location: 'London (Hybrid)',
      description: 'Led AWS-to-Azure migration, modernised applications with serverless and Power Platform. Transformed data warehousing to Lakehouse architecture using Azure Synapse and Databricks. Integrated CRM systems and advanced security to Zero Trust architecture.',
      skills: ['Azure', 'Databricks', 'Power BI', 'Zero Trust', 'Lakehouse', 'CI/CD'],
    },
    {
      role: 'CCAI Chatbot Architect',
      company: 'International Fund for Agricultural Development (IFAD)',
      type: 'Contract',
      period: 'Jun 2020 - Oct 2020',
      location: 'Rome, Italy',
      description: 'Pioneered Contact Centre AI solution improving IT support response times for UN members worldwide through real-time analytics integration.',
      skills: ['Google CCAI', 'GCP', 'ElasticSearch', 'NLP'],
    },
    {
      role: 'Lead AI Architect',
      company: 'Capita',
      type: 'Contract',
      period: 'Aug 2018 - Jan 2020',
      location: 'London',
      description: 'Orchestrated digital transformation centralising 20+ AI companies onto a cohesive multi-cloud data platform. Designed central data pipelines with MLFlow, curation & governance for HR, Pensions, MOD & Government clients.',
      skills: ['Azure', 'Redshift', 'Databricks', 'MLFlow', 'Data Governance'],
    },
    {
      role: 'Senior Enterprise Architect',
      company: 'Home Office',
      type: 'Contract',
      period: 'Previous',
      location: 'London',
      description: 'Enterprise architecture and technology strategy for one of the UK\'s largest government departments.',
      skills: ['Enterprise Architecture', 'Government', 'Security'],
    },
    {
      role: 'Data Architect',
      company: 'PA Consulting (NHS Migration Project)',
      type: 'Contract',
      period: 'Jan - Jun',
      location: 'London',
      description: 'Data architecture for NHS migration project, ensuring seamless data transition and compliance with healthcare standards.',
      skills: ['Data Architecture', 'NHS', 'Healthcare', 'Migration'],
    },
    {
      role: 'Data Architect',
      company: 'Marlink',
      type: 'Contract',
      period: 'Jul - Dec',
      location: 'London',
      description: 'Data architecture solutions for maritime communications and IT services provider.',
      skills: ['Data Architecture', 'Maritime', 'Communications'],
    },
  ]

  const skillCategories = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      skills: ['GPT-4 / Claude / Gemini', 'RAG & LangChain', 'LlamaIndex', 'MLFlow', 'Fine-tuning', 'AI Agents', 'NLP / CCAI'],
    },
    {
      icon: Cloud,
      title: 'Cloud Platforms',
      skills: ['Azure (Synapse, AI Studio)', 'AWS (Bedrock, Redshift)', 'GCP (Vertex AI)', 'Multi-Cloud Architecture', 'Serverless / Power Platform'],
    },
    {
      icon: Database,
      title: 'Data Engineering',
      skills: ['Databricks', 'Lakehouse Architecture', 'Data Pipelines / ETL', 'Pinecone / Vector DBs', 'Power BI / Analytics', 'Data Governance'],
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      skills: ['Zero Trust Architecture', 'OAuth / Azure AD', 'FCA Compliance', 'Infrastructure as Code', 'CI/CD Automation'],
    },
  ]

  const education = [
    {
      institution: 'Ahmadu Bello University',
      degree: 'BSc, Geology',
      period: '1982 - 1985',
    },
    {
      institution: 'Paddington College',
      degree: 'Further Education',
      period: '',
    },
  ]

  const articles = [
    { title: 'Navigating the AI Tsunami: Moats for Enterprises and Personal Relevance', publication: 'Operations Research Bit' },
    { title: 'The Race for AGI: Navigating the Tides of Innovation and AI Safety', publication: 'Medium' },
    { title: 'Shadows and Algorithms: The Transformation of Espionage from James Bond to AI', publication: 'Medium' },
    { title: 'The Conversational Shift: How GenAI Transforms Our Digital Interactions', publication: 'Medium' },
    { title: 'Balancing Effective Altruism and Accelerationism in the Age of AI', publication: 'Operations Research Bit' },
  ]

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Profile Header */}
      <motion.div {...fadeIn} className="card rounded-2xl overflow-hidden">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-sky-500 via-sky-400 to-violet-500 relative">
          <div className="absolute inset-0 data-grid opacity-20" />
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-500 to-violet-600 flex items-center justify-center border-4 shadow-lg"
              style={{ borderColor: 'var(--bg-primary)' }}
            >
              <span className="text-white text-3xl font-bold">SA</span>
            </div>
            <div className="flex-1 py-2">
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Stephen Adebola
              </h1>
              <p className="text-base font-medium" style={{ color: 'var(--accent)' }}>
                Data & AI Platform Architect
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href="https://www.linkedin.com/in/stephenadebola/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://medium.com/@stephen.adebola"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
              >
                <BookOpen className="w-4 h-4" />
                Medium
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap gap-4 mt-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
              London, UK
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
              Allianz Global Investors
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
              stephen@haba.io
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
              haba.io
            </span>
          </div>
        </div>
      </motion.div>

      {/* About */}
      <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="card rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>About</h2>
        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Senior Data & AI Platform Architect with 15+ years of experience transforming enterprise data capabilities
          across financial services, government, healthcare, and maritime sectors. Specialising in Databricks, multi-cloud
          architectures (Azure, AWS, GCP), and Generative AI solutions. Founder of HABA - a Data & AI consultancy
          delivering intelligent systems for leading organisations including Allianz GI, Home Office, NHS, Capita, and
          Howden Group. Prolific thought leader writing on AI strategy, enterprise transformation, and the future of
          intelligent systems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Experience - Main Column */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Briefcase className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${exp.role}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  className="card rounded-xl p-5 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{exp.role}</h3>
                      <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--accent)' }}>
                        {exp.company}
                        <span className="font-normal" style={{ color: 'var(--text-tertiary)' }}> &middot; {exp.type}</span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-medium flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </p>
                      <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-xs rounded-md font-medium"
                        style={{
                          backgroundColor: 'var(--accent-light)',
                          color: 'var(--accent)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Skills */}
          <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Code className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              Skills
            </h2>
            <div className="space-y-4">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="card rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <cat.icon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs rounded-md"
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <GraduationCap className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.institution} className="card rounded-xl p-4">
                  <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{edu.institution}</h3>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{edu.degree}</p>
                  {edu.period && (
                    <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{edu.period}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Articles / Thought Leadership */}
          <motion.div {...fadeIn} transition={{ delay: 0.5 }}>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Award className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              Publications
            </h2>
            <div className="space-y-3">
              {articles.map((article) => (
                <div key={article.title} className="card rounded-xl p-4 group cursor-pointer">
                  <p className="text-sm font-medium leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {article.title}
                  </p>
                  <p className="text-xs mt-1.5" style={{ color: 'var(--text-tertiary)' }}>
                    {article.publication}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Profile
