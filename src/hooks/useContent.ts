import { useQuery } from '@tanstack/react-query';
import programsData from '../content/programs.json';
import testimonialsData from '../content/testimonials.json';

export type Program = (typeof programsData)[number];
export type Testimonial = (typeof testimonialsData)[number];

export const queryKeys = {
  programs: ['programs'] as const,
  program: (slug: string) => ['programs', slug] as const,
  testimonials: ['testimonials'] as const,
};

export function usePrograms(track?: 'corporate' | 'individual' | 'academic') {
  return useQuery({
    queryKey: queryKeys.programs,
    queryFn: async (): Promise<Program[]> => programsData,
    select: (data) => (track ? data.filter((p) => p.track === track) : data),
    staleTime: Infinity,
  });
}

export function useProgram(slug: string | undefined) {
  return useQuery({
    queryKey: queryKeys.program(slug ?? ''),
    queryFn: async (): Promise<Program | undefined> =>
      programsData.find((p) => p.slug === slug),
    enabled: Boolean(slug),
    staleTime: Infinity,
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: queryKeys.testimonials,
    queryFn: async (): Promise<Testimonial[]> => testimonialsData,
    staleTime: Infinity,
  });
}
