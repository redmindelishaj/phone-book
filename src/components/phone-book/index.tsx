import { Button, Input, Space, Table, Form, Select, Popconfirm, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { EntryToCreateMap, EntryToUpdateMap } from "../../services/phone-book/phoneBookMapping";
import { EMPTY_ID, getEmptyEntry, getFormValues, getTableData, numberExist, TableDataProps } from "./helpers";
import { SearchOutlined } from '@ant-design/icons';
import {
	PhoneBookEntry,
	PhoneBookEntryCreateRequest,
	PhoneBookEntryUpdateRequest,
	PhoneBookEntryDeleteRequest,
	EntryType,
} from "../../services/phone-book/phoneBookModels";

interface Props {
	entries?: PhoneBookEntry[]
	onAdd?: (entry: PhoneBookEntryCreateRequest) => void
	onUpdate?: (entry: PhoneBookEntryUpdateRequest) => void
	onDelete?: (entry: PhoneBookEntryDeleteRequest) => void
}

const PhoneBook = ({ entries, onAdd, onUpdate, onDelete }: Props) => {

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: '21%',
			onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
    		sorter: (a: any, b: any) => a.name.length - b.name.length,
			render: (text: any, record: any) => (
				record.isEdit
					?
						<Form.Item
							name='name'
							rules={[{ required: true, message: 'Please input entry name!' }]}
							style={{ marginBottom: '0px' }}
						>
							<Input />
						</Form.Item>
					:
						<>{text}</>
			),
		},
		{
			title: 'Last Name',
			dataIndex: 'lastName',
			key: 'lastName',
			width: '21%',
			render: (text: any, record: any) => (
				record.isEdit
					?
						<Form.Item
							name='lastName'
							rules={[{ required: true, message: 'Please input entry last name!' }]}
							style={{ marginBottom: '0px' }}
						>
							<Input />
						</Form.Item>
					:
						<>{text}</>
			),
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			width: '21%',
			render: (text: any, record: any) => (
				record.isEdit
					?
						<Form.Item
							name='type'
							rules={[{ required: true, message: 'Please input entry type!' }]}
							style={{ marginBottom: '0px' }}
						>
							<Select>
								{Object.values(EntryType).map((val: any) => (
									!isNaN(Number(val)) && (
										<Select.Option value={val}>
											{EntryType[val]}
										</Select.Option>
									)
								))}
							</Select>
						</Form.Item>
					:
						<>{EntryType[text]}</>
			),
		},
		{
			title: 'Number',
			dataIndex: 'number',
			key: 'number',
			width: '21%',
			render: (text: any, record: any) => (
				record.isEdit
					?
						<Form.Item
							name='number'
							rules={[
								{ required: true, message: 'Please input entry number!' },
								{ validator: (rule: any, value: string, cb: (msg?: string) => void) => {
									numberExist(value, entries ?? []) ? cb("Number already exists!") : cb();
								}}
							]}
							style={{ marginBottom: '0px' }}
						>
							<Input type='tel' />
						</Form.Item>
					:
						<>{text}</>
			),
		},
		{
			title: 'Action',
			key: 'action',
			width: '16%',
			render: (text: any, record: any) => (
				record.isEdit
					?
						<Space>
							<Button
								type='primary'
								onClick={() => saveEntry(record.key)}
								style={{ width: '80px' }}
							>
								Save
							</Button>
							<Button
								danger
								type='primary'
								onClick={() => cancelEdit(record.key)}
								style={{ width: '80px' }}
							>
								Cancel
							</Button>
						</Space>
					:
						<Space>
							<Button
								type='primary'
								onClick={() => editEntry(record)}
								style={{ width: '80px' }}
							>
								Edit
							</Button>
							<Popconfirm
								title="Are you sure to delete this entry?"
								onConfirm={() => deleteEntry(record.key)}
								okText="Yes"
								cancelText="No"
							>
								<Button
									danger
									type='primary'
									style={{ width: '80px' }}
								>
									Detete
								</Button>
							</Popconfirm>
						</Space>
			),
		},
	];

	const [form] = Form.useForm();
	const [tableEntries, setTableEntries] = useState<TableDataProps[]>([]);

	useEffect(() => {
		const newEntries: TableDataProps[] = getTableData(entries);
		setTableEntries(newEntries);
	}, [entries]);

	const addEntry = () => {
		form.resetFields();
		const newEntries: TableDataProps[] = getEmptyEntry();
		const restOfEntries = [...tableEntries];
		restOfEntries.forEach(entry => entry.isEdit = false);
		newEntries.push(...restOfEntries);
		setTableEntries(newEntries);
	}

	const editEntry = (record: any) => {
		setFormValues(record);
		let newEntries = [...tableEntries];
		newEntries.forEach((item, index) => {
			if (item.key === record.key) newEntries[index].isEdit = true;
			else newEntries[index].isEdit = false;
		});
		setTableEntries(newEntries);
	}

	const cancelEdit = (key: any) => {
		let newEntries = [...tableEntries];
		const index = newEntries.findIndex(entry => entry.key === key);
		if (key === EMPTY_ID) newEntries.splice(index, 1);
		else newEntries[index].isEdit = false;
		setTableEntries(newEntries);
	}

	const saveEntry = async (key: any) => {
		try { await form.validateFields() }
		catch (err) { return }
		const values = form.getFieldsValue();
		const data: PhoneBookEntry = getFormValues(key, values);
		if (key === EMPTY_ID) create(data);
		else update(data);
	}
	const create = (data: PhoneBookEntry) => {
		const createRequest: PhoneBookEntryCreateRequest = EntryToCreateMap(data);
		if (onAdd) onAdd(createRequest);
	}
	const update = (data: PhoneBookEntry) => {
		const updateRequest: PhoneBookEntryUpdateRequest = EntryToUpdateMap(data);
		if (onUpdate) onUpdate(updateRequest);
	}

	const deleteEntry = (key: any) => {
		const data: PhoneBookEntryDeleteRequest = { id: key };
		if (onDelete) onDelete(data);
	}

	const setFormValues = (record: any) => {
		form.setFieldsValue({
			name: record.name,
			lastName: record.lastName,
			type: record.type,
			number: record.number,
		});
	}

	const onSearch = (e: any) => {
		const value: string = e.target.value.toLowerCase();
		const newEntries: TableDataProps[] = getTableData(entries);
		if (value === '') {
			setTableEntries(newEntries);
			return;
		}
		const filteredData = newEntries.filter(entry =>
			entry.name?.toLowerCase().includes(value)
			|| entry.lastName?.toLowerCase().includes(value)
			|| entry.number?.toLowerCase().includes(value)
		);
		setTableEntries(filteredData);
	}

	return (
		<>
			<Row justify='space-between' style={{ marginBottom: '16px' }}>
				<Col>
					<Button
						onClick={addEntry}
						type='primary'
					>
						Add Entry
					</Button>
				</Col>
				<Col>
					<Input
						placeholder="Search"
						prefix={<SearchOutlined style={{ marginRight: '8px', color: '#aaa' }} />}
						onChange={onSearch}
						style={{ width: 200, float: 'right' }}
					/>
				</Col>
			</Row>
			<Form form={form}>
				<Table
					columns={columns}
					dataSource={tableEntries}
				/>
			</Form>
		</>
	);
}

export default PhoneBook;
