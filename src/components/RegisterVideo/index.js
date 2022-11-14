import React from 'react';
import { StyledRegisterVideo } from './styles';
import { createClient } from '@supabase/supabase-js';


function useForm(propsDoForm) {
	const [values, setValues] = React.useState(propsDoForm.initialValues);

	return {
		values,
		handleChange: (evento) => {
			const value = evento.target.value;
			const name = evento.target.name;
			setValues({
				...values,
				[name]: value,
			});
		},
		clearForm() {
			setValues({});
		},
	};
}

const PROJECT_URL = "https://uubrvyijyoqynuigneyv.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1YnJ2eWlqeW9xeW51aWduZXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NTYzNzEsImV4cCI6MTk4NDAzMjM3MX0.Cj7j2sOB9ZzHM5F4_AAlXofNX71V7fy5kDCcX6inagg";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}


export default function RegisterVideo() {
	const formCadastro = useForm({
		initialValues: { titulo: 'Frost punk', url: 'https://www.youtube.com/watch?v=QsqatJxAUtk' },
	});
	const [formVisivel, setFormVisivel] = React.useState(false);

	return (
		<StyledRegisterVideo>
			<button className='add-video' onClick={() => setFormVisivel(true)}>
				+
			</button>
			{/* Ternário */}
			{/* Operadores de Curto-circuito: EX: {formVisivel && (passa o componente)} */}
			{formVisivel ? (
				<form
					onSubmit={(evento) => {
						evento.preventDefault();
						console.log(formCadastro.values);

						supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "jogos",
                         })
                         .then((resultado) => {
                            console.log("Resultado: ",resultado);
                         })
                         .catch((err) => {
                            console.log(err);
                         })
						 
						setFormVisivel(false);
						formCadastro.clearForm();
					}}
				>
					<div>
						<button
							type='button'
							className='close-modal'
							onClick={() => setFormVisivel(false)}
						>
							X
						</button>
						<input
							placeholder='Titulo do vídeo'
							name='titulo'
							value={formCadastro.values.titulo}
							onChange={formCadastro.handleChange}
						/>
						<input
							placeholder='URL'
							name='url'
							value={formCadastro.values.url}
							onChange={formCadastro.handleChange}
						/>
						<button type='submit'>Cadastrar</button>
					</div>
				</form>
			) : (
				false
			)}
		</StyledRegisterVideo>
	);
}
