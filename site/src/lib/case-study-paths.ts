import type { Locale } from '../i18n/ui';
import { getCaseStudies, getProjects } from './projects';

/** Static paths for every featured project that has a case study in this locale. */
export async function caseStudyPaths(locale: Locale) {
  const featured = (await getProjects()).filter((p) => p.data.tier === 'featured');
  const studies = await getCaseStudies(locale);
  return featured.map((project, index) => {
    const study = studies.find((s) => s.data.project.id === project.id);
    if (!study) throw new Error(`Missing ${locale} case study for ${project.id}`);
    const next = featured[(index + 1) % featured.length];
    return { params: { slug: project.id }, props: { project, study, index, total: featured.length, next } };
  });
}
