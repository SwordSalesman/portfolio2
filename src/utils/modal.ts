export function openModal(id: string) {
	const el = document.getElementById(id);
	if (!el) return;
	el.classList.add("open");
	el.setAttribute("aria-hidden", "false");
}

export function closeModal(id: string) {
	const el = document.getElementById(id);
	if (!el) return;
	el.classList.remove("open");
	el.setAttribute("aria-hidden", "true");
}
