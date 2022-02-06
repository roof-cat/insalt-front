import insaltApp from './module'

const STORED_KEYS = ['passLength', 'secret'];

const local = localStorage.getItem('store');
const store = local ? JSON.parse(local) : {};

const encryptor = async (params) => {
	const res = await fetch(process.env.API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(params)
	});

	return res.json()
};

const onChange = (key, value) => {
	if (STORED_KEYS.includes(key)) {
		localStorage.setItem('store', JSON.stringify({...store, [key]: value}));
	}
};

insaltApp({data: store, encryptor, onChange});