CREATE TABLE `organizations` (
	`id` integer PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `organizations_slug_unique` ON `organizations` (`slug`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `users_to_organizations` (
	`user_id` integer NOT NULL,
	`organization_id` integer NOT NULL,
	`role` text DEFAULT 'member' NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	PRIMARY KEY(`user_id`, `organization_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON UPDATE no action ON DELETE no action
);
