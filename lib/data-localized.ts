/**
 * Localized data functions - returns portfolio data in the appropriate language
 * Integrates contentTranslations with the existing data structure
 */

import type { Project } from './types';
import { contentTranslations, getLocalizedContent, type Locale } from './translations/content';
import * as originalData from './data';

// Get localized personal info
export function getPersonalInfo(locale?: Locale) {
  const safeLocale = (locale || 'en') as Locale;
  const translations = contentTranslations.personalInfo;
  
  return {
    ...originalData.personalInfo,
    title: getLocalizedContent(translations.title, safeLocale),
    summary: getLocalizedContent(translations.summary, safeLocale),
    workPermit: {
      hasPermit: originalData.personalInfo.workPermit.hasPermit,
      details: getLocalizedContent(translations.workPermitDetails, safeLocale),
    },
  };
}

// Get localized projects
export function getProjects(locale?: Locale): Project[] {
  const safeLocale = (locale || 'en') as Locale;
  const projects = originalData.projects;
  const translations = contentTranslations.projects;
  
  return projects.map((project) => {
    const translation = translations[project.id as keyof typeof translations];
    
    if (!translation) {
      // If no translation exists, return original
      return project;
    }
    
    return {
      ...project,
      title: getLocalizedContent(translation.title, safeLocale),
      description: getLocalizedContent(translation.description, safeLocale),
      course: translation.course ? getLocalizedContent(translation.course, safeLocale) : project.course,
      highlights: translation.highlights ? getLocalizedContent(translation.highlights, safeLocale) : project.highlights,
    };
  });
}

// Get localized timeline (experience + education combined and sorted)
export function getTimeline(locale?: Locale) {
  const safeLocale = (locale || 'en') as Locale;
  const timeline = originalData.timeline;
  const translations = contentTranslations.timeline;
  
  return timeline.map((item) => {
    const translation = translations[item.id as keyof typeof translations];
    
    if (!translation) {
      return item;
    }
    
    // Create base localized item
    const localizedItem: any = {
      ...item,
      title: getLocalizedContent(translation.title, safeLocale),
      description: getLocalizedContent(translation.description, safeLocale),
    };
    
    // Add achievements if they exist in translation
    if ('achievements' in translation && translation.achievements) {
      localizedItem.achievements = getLocalizedContent(translation.achievements, safeLocale);
    }
    
    return localizedItem;
  });
}

// Convenence functions if needed
export function getExperience(locale?: Locale) {
  return getTimeline(locale).filter(item => item.type === 'work');
}

export function getEducation(locale?: Locale) {
  return getTimeline(locale).filter(item => item.type === 'education');
}

// Get localized awards
export function getAwards(locale?: Locale) {
  const safeLocale = (locale || 'en') as Locale;
  const awards = originalData.awards;
  const translations = contentTranslations.awards;
  
  return awards.map((award) => {
    const translation = translations[award.id as keyof typeof translations];
    
    if (!translation || !translation.description) {
      return award;
    }
    
    return {
      ...award,
      description: getLocalizedContent(translation.description, safeLocale),
    };
  });
}

// Get localized recommendations
export function getRecommendations(locale?: Locale) {
  const safeLocale = (locale || 'en') as Locale;
  const recommendations = originalData.recommendations;
  const translations = contentTranslations.recommendations;
  
  return recommendations.map((rec) => {
    const translation = translations[rec.id as keyof typeof translations];
    
    if (!translation || !translation.text) {
      return rec;
    }
    
    return {
      ...rec,
      text: getLocalizedContent(translation.text, safeLocale),
    };
  });
}

// Get localized volunteering
export function getVolunteering(locale?: Locale) {
  const safeLocale = (locale || 'en') as Locale;
  const volunteering = originalData.volunteering;
  const translations = contentTranslations.volunteering;
  
  return volunteering.map((item) => {
    const translation = translations[item.id as keyof typeof translations];
    
    if (!translation) {
      return item;
    }
    
    return {
      ...item,
      role: getLocalizedContent(translation.role, safeLocale),
      description: getLocalizedContent(translation.description, safeLocale),
    };
  });
}

// Export non-translatable data as-is
export { skills, languages } from './data';

// Re-export types
export type { Project } from './types';
