'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { skills } from '@/lib/data';
import { 
  SiPython, SiJavascript, SiTypescript, SiCplusplus, SiC,
  SiReact, SiNextdotjs, SiFlutter, SiGraphql, SiSpringboot,
  SiPytorch, SiTensorflow, SiOpencv, SiNumpy, SiScikitlearn,
  SiMysql, SiPostgresql, SiMongodb, SiRedis, SiFirebase,
  SiDocker, SiKubernetes, SiGit, SiGithub, SiGitlab, SiJira, SiLinux,
  SiAmazon, SiGooglecloud
} from 'react-icons/si';

export default function Skills() {
  const t = useTranslations('skills');

  // Skill icons mapping
  const skillIcons: { [key: string]: any } = {
    'Python': SiPython,
    'JavaScript': SiJavascript,
    'TypeScript': SiTypescript,
    'C++': SiCplusplus,
    'C/C++': SiC,
    'React': SiReact,
    'Next.js': SiNextdotjs,
    'Flutter': SiFlutter,
    'GraphQL': SiGraphql,
    'Spring Boot': SiSpringboot,
    'PyTorch': SiPytorch,
    'TensorFlow': SiTensorflow,
    'OpenCV': SiOpencv,
    'NumPy': SiNumpy,
    'Scikit-learn': SiScikitlearn,
    'MySQL': SiMysql,
    'PostgreSQL': SiPostgresql,
    'MongoDB': SiMongodb,
    'Redis': SiRedis,
    'Firebase': SiFirebase,
    'Docker': SiDocker,
    'Kubernetes': SiKubernetes,
    'Git': SiGit,
    'GitHub': SiGithub,
    'GitLab': SiGitlab,
    'Jira': SiJira,
    'Linux': SiLinux,
    'AWS': SiAmazon,
    'GCP': SiGooglecloud,
  };

  const skillCategories = [
    { key: 'backend', data: skills.backend },
    { key: 'frontend', data: skills.frontend },
    { key: 'cloud', data: skills.cloud },
    { key: 'tools', data: skills.tools },
    { key: 'databases', data: skills.databases },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-white dark:bg-zinc-950">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center">{t('title')}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30 hover:border-2 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-4">{t(category.key)}</h3>
                <div className="space-y-4">
                  {category.data.map((skill) => {
                    const IconComponent = skillIcons[skill.name];
                    return (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            {IconComponent && (
                              <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            )}
                            <span className="text-sm font-medium">{skill.name}</span>
                          </div>
                          <span className="text-sm text-zinc-500 dark:text-zinc-400">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: catIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
