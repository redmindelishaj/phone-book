export interface PhoneBookEntry {
	id: string
	name: string
	lastName: string
	type: EntryType
	number: string
}

export interface PhoneBookEntryCreateRequest {
	name: string
	lastName: string
	type: EntryType
	number: string
}

export interface PhoneBookEntryUpdateRequest {
	id: string
	name: string
	lastName: string
	type: EntryType
	number: string
}

export interface PhoneBookEntryDeleteRequest {
	id: string
}

export enum EntryType {
	Work = 1,
	Cellphone = 2,
	Home = 3,
}
