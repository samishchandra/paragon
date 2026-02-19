CREATE TABLE `itemTags` (
	`itemId` varchar(36) NOT NULL,
	`tagId` varchar(36) NOT NULL,
	CONSTRAINT `itemTags_itemId_tagId_pk` PRIMARY KEY(`itemId`,`tagId`)
);
--> statement-breakpoint
CREATE TABLE `items` (
	`id` varchar(36) NOT NULL,
	`userId` int NOT NULL,
	`type` enum('task','note') NOT NULL,
	`title` text,
	`content` mediumtext,
	`searchContent` mediumtext,
	`isPinned` boolean NOT NULL DEFAULT false,
	`isCompleted` boolean NOT NULL DEFAULT false,
	`section` enum('now','later','completed') NOT NULL DEFAULT 'now',
	`sortOrder` int NOT NULL DEFAULT 0,
	`dueDate` varchar(32),
	`listId` varchar(36),
	`hasUncompletedTodos` boolean NOT NULL DEFAULT false,
	`deletedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lists` (
	`id` varchar(36) NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`icon` varchar(64) NOT NULL DEFAULT 'folder',
	`color` varchar(32) NOT NULL DEFAULT '#3B82F6',
	`type` enum('task','note') NOT NULL DEFAULT 'task',
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lists_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` varchar(36) NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`color` varchar(32) NOT NULL,
	CONSTRAINT `tags_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`autoReorderChecklist` boolean NOT NULL DEFAULT true,
	`tasksEnabled` boolean NOT NULL DEFAULT true,
	`editorFontFamily` varchar(128) DEFAULT 'default',
	`editorFontSize` int DEFAULT 16,
	`editorLineHeight` varchar(16) DEFAULT '1.75',
	CONSTRAINT `userSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `userSettings_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `viewSortPreferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`viewKey` varchar(128) NOT NULL,
	`sortOrder` varchar(32) NOT NULL DEFAULT 'modified',
	`sortDirection` varchar(8) NOT NULL DEFAULT 'desc',
	CONSTRAINT `viewSortPreferences_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `itemTags_tagId_idx` ON `itemTags` (`tagId`);--> statement-breakpoint
CREATE INDEX `items_userId_idx` ON `items` (`userId`);--> statement-breakpoint
CREATE INDEX `items_userId_type_idx` ON `items` (`userId`,`type`);--> statement-breakpoint
CREATE INDEX `items_userId_listId_idx` ON `items` (`userId`,`listId`);--> statement-breakpoint
CREATE INDEX `items_userId_deletedAt_idx` ON `items` (`userId`,`deletedAt`);--> statement-breakpoint
CREATE INDEX `items_userId_isPinned_idx` ON `items` (`userId`,`isPinned`);--> statement-breakpoint
CREATE INDEX `items_userId_isCompleted_idx` ON `items` (`userId`,`isCompleted`);--> statement-breakpoint
CREATE INDEX `lists_userId_idx` ON `lists` (`userId`);--> statement-breakpoint
CREATE INDEX `tags_userId_idx` ON `tags` (`userId`);--> statement-breakpoint
CREATE INDEX `viewSortPrefs_userId_viewKey_idx` ON `viewSortPreferences` (`userId`,`viewKey`);