import { useEffect, useState } from "react";
import PhoneBook from "../../components/phone-book";
import { addEntry, deleteEntry, getEntries, updateEntry } from "../../services/phone-book/phoneBookApi";
import {
	PhoneBookEntry,
	PhoneBookEntryCreateRequest,
	PhoneBookEntryUpdateRequest,
	PhoneBookEntryDeleteRequest,
} from "../../services/phone-book/phoneBookModels";

const Home = () => {

	const [entries, setEntries] = useState<PhoneBookEntry[]>([]);

	useEffect(() => {
		setEntries(getEntries())
	}, []);

	const onAdd = (entry: PhoneBookEntryCreateRequest) => {
		addEntry(entry);
		setEntries(getEntries());
	}

	const onUpdate = (entry: PhoneBookEntryUpdateRequest) => {
		updateEntry(entry);
		setEntries(getEntries());
	}

	const onDelete = (entry: PhoneBookEntryDeleteRequest) => {
		deleteEntry(entry);
		setEntries(getEntries());
	}

	return (
		<PhoneBook
			entries={entries}
			onAdd={onAdd}
			onUpdate={onUpdate}
			onDelete={onDelete}
		/>
	);
}

export default Home;
