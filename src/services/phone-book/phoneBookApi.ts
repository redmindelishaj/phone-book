import { CreateToEntryMap, UpdateToEntryMap } from "./phoneBookMapping";
import {
	PhoneBookEntry,
	PhoneBookEntryCreateRequest,
	PhoneBookEntryUpdateRequest,
	PhoneBookEntryDeleteRequest,
} from "./phoneBookModels";

const ENTRIES_KEY = 'PHONE_BOOK_ENTRIES';

export const getEntries = (): PhoneBookEntry[] => {
	const entriesAsString = localStorage.getItem(ENTRIES_KEY);
	const entries: PhoneBookEntry[] = entriesAsString == null ? [] : JSON.parse(entriesAsString);
	return entries
}

export const addEntry = (createRequest: PhoneBookEntryCreateRequest) => {
	const entries: PhoneBookEntry[] = getEntries();
	const newEntry: PhoneBookEntry = CreateToEntryMap(createRequest);
	const newEntries = [newEntry];
	newEntries.push(...entries);
	localStorage.setItem(ENTRIES_KEY, JSON.stringify(newEntries));
}

export const updateEntry = (updateRequest: PhoneBookEntryUpdateRequest) => {
	const entries: PhoneBookEntry[] = getEntries();
	const index: number = entries.findIndex(entry => entry.id === updateRequest.id);
	if (index === -1) return;
	const updatedEntry = UpdateToEntryMap(updateRequest);
	entries[index] = updatedEntry;
	localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

export const deleteEntry = (deleteRequest: PhoneBookEntryDeleteRequest) => {
	const entries: PhoneBookEntry[] = getEntries();
	const filteredEntries = entries.filter(entry => entry.id !== deleteRequest.id);
	localStorage.setItem(ENTRIES_KEY, JSON.stringify(filteredEntries));
}
