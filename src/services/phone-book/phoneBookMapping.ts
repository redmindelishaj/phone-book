import {
	PhoneBookEntry,
	PhoneBookEntryCreateRequest,
	PhoneBookEntryUpdateRequest,
} from "./phoneBookModels";

export const CreateToEntryMap = (createRequest: PhoneBookEntryCreateRequest): PhoneBookEntry => ({
	id: (Math.random() * 1000000).toString().substring(0, 6),
	name: createRequest.name,
	lastName: createRequest.lastName,
	type: createRequest.type,
	number: createRequest.number,
});

export const UpdateToEntryMap = (updateRequest: PhoneBookEntryUpdateRequest): PhoneBookEntry => ({
	id: updateRequest.id,
	name: updateRequest.name,
	lastName: updateRequest.lastName,
	type: updateRequest.type,
	number: updateRequest.number,
});

export const EntryToCreateMap = (entry: PhoneBookEntry): PhoneBookEntryCreateRequest => ({
	name: entry.name,
	lastName: entry.lastName,
	type: entry.type,
	number: entry.number,
});

export const EntryToUpdateMap = (entry: PhoneBookEntry): PhoneBookEntryUpdateRequest => ({
	id: entry.id,
	name: entry.name,
	lastName: entry.lastName,
	type: entry.type,
	number: entry.number,
});
