/// <reference types="astro/client" />

/// <reference types="lucia" />
declare namespace Lucia {
	// ...
}

/// <reference types="astro/client" />
declare namespace App {
	interface Locals {
		auth: import("lucia").AuthRequest;
	}
}
