import { db } from "./firebase";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";

export interface GuestbookEntry {
	id: string;
	name: string;
	message: string;
	date: Date;
}

export async function fetchGuestbookEntries(maxEntries?: number): Promise<GuestbookEntry[]> {
	const q = query(
		collection(db, "guestbook"),
		orderBy("timestamp", "desc"),
		limit(maxEntries ?? 100),
	);
	const snapshot = await getDocs(q);
	return snapshot.docs.map((doc) => {
		const d = doc.data();
		return {
			id: doc.id,
			name: d.name,
			message: d.message,
			date: d.timestamp?.toDate?.() ?? new Date(),
		};
	});
}
