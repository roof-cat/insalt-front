import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Component = (props) => {
	const currentData = props.data || {};
	const [data, setData] = useState({
		value: '',
		domain: '',
		secret: '',
		newPassword: '',
		passLength: 16,
		...currentData
	});
	const [showSecret, setShowSecret] = useState(!currentData.secret);

	const onChange = (key) => ({target}) => {
		setData({...data, [key]: target.value});
		console.log(target.value);
		if (props.onChange) {
			props.onChange(key, target.value);
		}
	};

	const onSubmit = (evt) => {
		evt.preventDefault();

		props.encryptor(data).then(({password}) => {
			setData({...data, newPassword: password});
		});
	};

	return <main>
		<div className="img"></div>

		<form id="form" onSubmit={onSubmit}>
			<h1>iNsalt</h1>

			<label>
				Secret:
				<input type={showSecret ? 'text' : 'password'} min="5" max="16" required value={data['secret']}
						 onChange={onChange('secret')}/>
				<button className="icon" type="button" onClick={() => setShowSecret(!showSecret)}>👀</button>
			</label>
			<hr/>
			<h2>Regenerate password</h2>
			<label>
				Domain:
				<input type="text" value={data['domain']} required onChange={onChange('domain')}/>
			</label>
			<label>
				Short Password:
				<input type="text" value={data['password']} required onChange={onChange('password')}/>
			</label>
			<label>
				Password Length:
				<input type="number" min="6" value={data['passLength']} required onChange={onChange('passLength')}/>
			</label>
			<div className="flex m-y">
				<button id="generate" type="submit">Generate</button>
			</div>
			<label>
				iNsalted:
				<input type="text" autoComplete="off" value={data['newPassword']}/>
			</label>
		</form>
	</main>;
};

Component.propTypes = {
	encryptor: PropTypes.func.isRequired,
	secret: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	data: PropTypes.object
};

export default Component;