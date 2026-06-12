import {
  actionItems,
  ambassadors,
  faqItems,
  heroNewsItems,
  teamMembers,
  testimonials,
  transparencyData
} from "../data/fallbackContent.js";

function sortPublished(items) {
  return [...items]
    .filter((item) => item.published !== false)
    .sort((left, right) => (left.order ?? 0) - (right.order ?? 0));
}

export async function getHeroNews() {
  return sortPublished(heroNewsItems);
}

export async function getActions() {
  return sortPublished(actionItems);
}

export async function getTestimonials() {
  return sortPublished(testimonials);
}

export async function getTransparencyData() {
  return { ...transparencyData };
}

export async function getTeamMembers() {
  return sortPublished(teamMembers);
}

export async function getAmbassadors() {
  return sortPublished(ambassadors);
}

export async function getFaqItems() {
  return [...faqItems];
}
