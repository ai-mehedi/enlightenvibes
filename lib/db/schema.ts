import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  role: text("role").notNull().default("admin"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const clients = sqliteTable("clients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  image: text("image").notNull(),
  order: integer("order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;

export const heroImages = sqliteTable("hero_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  image: text("image").notNull(),
  order: integer("order").notNull().default(0),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type HeroImage = typeof heroImages.$inferSelect;
export type NewHeroImage = typeof heroImages.$inferInsert;

export const teamMembers = sqliteTable("team_members", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  role: text("role").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  order: integer("order").notNull().default(0),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  image: text("image"),
  videoUrl: text("video_url"),
  clientName: text("client_name"),
  projectDate: text("project_date"),
  order: integer("order").notNull().default(0),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export const testimonials = sqliteTable("testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  clientName: text("client_name").notNull(),
  clientRole: text("client_role"),
  clientCompany: text("client_company"),
  clientImage: text("client_image"),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  order: integer("order").notNull().default(0),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;
