/**
 * Catalog access layer. Pages and components import ONLY from here, never
 * from the data files directly — so the data source can move to a CMS or
 * Supabase later by changing these functions alone.
 */
import { capabilities } from "./capabilities";
import { categories } from "./categories";
import { offerings } from "./offerings";
import { serviceModels } from "./service-models";
import { fundingRoutes } from "./funding";
import type { Capability, CategoryId, Offering, ProductKey, Region, ServiceModelId } from "./types";

export * from "./types";
export { commitment } from "./commitment";
export { arabicModels, hostingOptions } from "./models";
export { fundingRoutes, siriCertified } from "./funding";
export { integrationGroups } from "./integrations";
export { partnerTracks, signedPartners } from "./partners";
export { complianceItems } from "./compliance";

/** Offerings visible on the public site (coming-soon items stay hidden). */
export function listOfferings(filter?: { category?: CategoryId; serviceModel?: ServiceModelId; region?: Region }) {
  return offerings.filter(
    (o) =>
      o.status !== "coming-soon" &&
      (!filter?.category || o.category === filter.category) &&
      (!filter?.serviceModel || o.serviceModels.includes(filter.serviceModel)) &&
      // No `regions` means the offering is sold everywhere.
      (!filter?.region || !o.regions || o.regions.includes(filter.region)),
  );
}

/** Offerings with fixed-price packages (drives /pricing). */
export function listPackagedOfferings() {
  return listOfferings().filter((o) => o.packages?.length);
}

/** Offerings specific to a market (explicit `regions` only) — drives region pages like /ksa. */
export function regionalOfferings(region: Region) {
  return listOfferings().filter((o) => o.regions?.includes(region) || o.fundingRoutes?.length);
}

export function getFundingRoute(id: string) {
  return fundingRoutes.find((f) => f.id === id);
}

export function getOffering(slug: string) {
  return offerings.find((o) => o.slug === slug && o.status !== "coming-soon");
}

export function listCapabilities() {
  return capabilities;
}

export function getCapability(slug: string) {
  return capabilities.find((c) => c.slug === slug);
}

export function listCategories() {
  return categories;
}

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}

export function listServiceModels() {
  return serviceModels;
}

export function getServiceModel(id: ServiceModelId) {
  return serviceModels.find((m) => m.id === id)!;
}

/** Offerings that solve a capability (reverse of offering.capabilities). */
export function offeringsForCapability(slug: string) {
  return listOfferings().filter((o) => o.capabilities.includes(slug));
}

export function capabilitiesForOffering(o: Offering): Capability[] {
  return o.capabilities.map(getCapability).filter((c): c is Capability => Boolean(c));
}

/** Offerings customers can open from the portal via scoped SSO. */
export function launchableOfferings() {
  return offerings.filter((o): o is Offering & { launch: ProductKey } => Boolean(o.launch));
}

export function offeringByLaunchKey(key: ProductKey) {
  return offerings.find((o) => o.launch === key);
}

export { accentClasses } from "./accents";

// ─── Integrity check ────────────────────────────────────────────────────
// Runs at build time (module load). A typo in a slug fails the build with a
// clear message instead of rendering a silently broken link.
(function validateCatalog() {
  const errors: string[] = [];
  const slugs = new Set<string>();
  const capSlugs = new Set(capabilities.map((c) => c.slug));
  const modelIds = new Set(serviceModels.map((m) => m.id));
  for (const o of offerings) {
    if (slugs.has(o.slug)) errors.push(`duplicate offering slug "${o.slug}"`);
    slugs.add(o.slug);
    o.capabilities.forEach((c) => !capSlugs.has(c) && errors.push(`offering "${o.slug}" → unknown capability "${c}"`));
    o.serviceModels.forEach((m) => !modelIds.has(m) && errors.push(`offering "${o.slug}" → unknown service model "${m}"`));
  }
  const fundingIds = new Set(fundingRoutes.map((f) => f.id));
  for (const o of offerings) {
    o.fundingRoutes?.forEach((f) => !fundingIds.has(f) && errors.push(`offering "${o.slug}" → unknown funding route "${f}"`));
    const pkgIds = o.packages?.map((p) => p.id) ?? [];
    if (new Set(pkgIds).size !== pkgIds.length) errors.push(`offering "${o.slug}" has duplicate package ids`);
  }
  const launchKeys = offerings.filter((o) => o.launch).map((o) => o.launch);
  if (new Set(launchKeys).size !== launchKeys.length) errors.push("two offerings share a portal launch key");
  if (errors.length) throw new Error(`Catalog is invalid:\n  - ${errors.join("\n  - ")}`);
})();
