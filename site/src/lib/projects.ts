import { type CollectionEntry, getCollection } from 'astro:content';
import type { Locale } from '../i18n/ui';

export type Project = CollectionEntry<'projects'>;
export type CaseStudy = CollectionEntry<'caseStudies'>;

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** Featured projects get a case study page; everything else links out. */
export async function getCaseStudies(locale: Locale): Promise<CaseStudy[]> {
  return getCollection('caseStudies', (entry) => entry.data.lang === locale);
}

export function caseStudyPath(project: Project): string {
  return `/work/${project.id}/`;
}

export function primaryLink(project: Project): string {
  const { try: tryIt, source } = project.data.links;
  return (project.data.tier === 'featured' ? undefined : (tryIt ?? source)) ?? caseStudyPath(project);
}
