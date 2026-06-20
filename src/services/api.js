import { slides } from '../data/slides';
import { donationCategories } from '../data/donationCategories';
import { donationItems } from '../data/donationItems';
import { activities } from '../data/activities';
import { socialLinks } from '../data/socialLinks';
import { faqs } from '../data/faqs';
import { stats } from '../data/stats';

const delay = (ms = 200) => new Promise(r => setTimeout(r, ms));

export const getSlides = async () => {
  await delay();
  return slides;
};

export const getDonationCategories = async () => {
  await delay();
  return donationCategories;
};

export const getDonationItems = async () => {
  await delay();
  return donationItems;
};

export const getDonationItemBySlug = async (slug) => {
  await delay();
  return donationItems.find(item => item.slug === slug) || null;
};

export const getActivities = async () => {
  await delay();
  return activities;
};

export const getActivityBySlug = async (slug) => {
  await delay();
  return activities.find(a => a.slug === slug) || null;
};

export const getSocialLinks = async () => {
  await delay();
  return socialLinks;
};

export const getFaqs = async () => {
  await delay();
  return faqs;
};

export const getStats = async () => {
  await delay();
  return stats;
};

export const createDonation = async (payload) => {
  await delay(800);
  // TODO: POST /api/donations/ and verify payload.turnstileToken on the server with the Turnstile secret key.
  console.log('Donation payload:', payload);
  return {
    success: true,
    donationId: `DAV-${Date.now()}`,
    message: 'Bağışınız başarıyla alındı.',
  };
};
