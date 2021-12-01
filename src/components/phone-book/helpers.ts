import { EntryType, PhoneBookEntry } from "../../services/phone-book/phoneBookModels";

export interface TableDataProps {
	key: string
	name?: string
	lastName?: string
	type?: EntryType
	number?: string
	isEdit: boolean
}

export const EMPTY_ID = '';

export const getTableData = (entries?: PhoneBookEntry[]): TableDataProps[] => {
	const tableData: TableDataProps[] = [];
	entries?.forEach(item => {
		tableData.push({
			key: item.id,
			name: item.name,
			lastName: item.lastName,
			type: item.type,
			number: item.number,
			isEdit: false,
		});
	});
	return tableData;
};

export const getEmptyEntry = (): TableDataProps[] => [{
	key: EMPTY_ID,
	name: undefined,
	lastName: undefined,
	type: undefined,
	number: undefined,
	isEdit: true,
}];

export const getFormValues = (key: any, values: any): PhoneBookEntry => ({
	id: key,
	name: values.name,
	lastName: values.lastName,
	type: values.type,
	number: values.number,
});

export const numberExist = (number: string, entries: PhoneBookEntry[]): boolean => {
	const result = entries.find(entry => entry.number === number);
	return result != null;
}
